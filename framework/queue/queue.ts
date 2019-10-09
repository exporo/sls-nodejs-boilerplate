import * as ESSerializer from 'esserializer';
import * as fs from 'fs';
import * as path from 'path';
const AWS = require('aws-sdk');

import config from '../../application/config/queue';
import { FailedJob } from '../model/failedJob';

const currentConf = config[config.default];

AWS.config.update({
    region: currentConf.region,
    endpoint: currentConf.endpoint
});
const sqs = new AWS.SQS();

export class Queue {

    public static dispatch(jobClass) {

        const serializeClass = ESSerializer.serialize(jobClass);
        const params = {
            MessageBody: serializeClass,
            QueueUrl: currentConf.endpoint
        };

        return sqs.sendMessage(params).promise()
            .catch((err) => {
                console.log("Error", err);
            });
    }

    public static handleMessages(messages) {
        let promises = Array();

        messages.forEach((message) => {
            promises.push(
                this.handleMessage(message)
            );
        });

        return Promise.all(promises);
    }

    private static async handleMessage(message) {
        const classes = await this.getAllJobClasses();
        const job = ESSerializer.deserialize(message.Body, classes);

        try {
            await job.handle();

            const deleteParams = {
                QueueUrl: currentConf.endpoint,
                ReceiptHandle: message.ReceiptHandle
            };
            const result = await sqs.deleteMessage(deleteParams).promise();

            return result
        } catch (err) {
            // saves to failed_jobs table
            const payload = {
                name: JSON.parse(message.Body)['className'],
                payload: message.Body,
                error: err.stack
            };

            if (!message.Attributes) {
                return await FailedJob.create(payload);
            }

            const receiveCount = +message.Attributes.ApproximateReceiveCount;
            if (receiveCount === undefined || receiveCount > currentConf.DLQ_MAX_TRY_COUNTS) {
                return await FailedJob.create(payload);
            }
        }
    }

    private static async getAllJobClasses() {
        let classes = Array();

        //TODO path looks weird
        const files = fs.readdirSync('./application/jobs/');

        const actions = files.map(async file => {
            //TODO path looks weird
            const filePath = `../../application/jobs/${path.basename(file).split('.')[0]}`;
            const module = await import(filePath);
            classes.push(module[Object.keys(module)[0]]);
        });

        await Promise.all(actions);

        return classes;
    }

    //only used for local env
    //in an AWS env the sqs queue should trigger lambda functions automatically
    public static fetchJobs() {
        var params = {
            QueueUrl: currentConf.endpoint,
            VisibilityTimeout: 40,
            WaitTimeSeconds: 0,
            AttributeNames: ['All']
        };

        return sqs.receiveMessage(params).promise()
            .then((data) => {
                if (data.Messages) {
                    return this.handleMessages(data.Messages);
                }
            })
            .catch((error) => {
                console.log('Error', error);
            });
    }
}
