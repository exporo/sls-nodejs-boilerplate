import * as ESSerializer from 'esserializer';
import * as fs from 'fs';
import * as path from 'path';
const AWS = require('aws-sdk');

import config from '../../application/config/queue';

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

    private static handleMessage(message) {

        const job = ESSerializer.deserialize(message.Body, this.getAllJobClasses());

        job.handle();

        const deleteParams = {
            QueueUrl: currentConf.endpoint,
            ReceiptHandle: message.ReceiptHandle
        };

        return sqs.deleteMessage(deleteParams).promise()
            .catch((err) => {
                console.log("Delete Error", err);
            });
    }

    private static getAllJobClasses() {
        let classes = Array();

        //TODO path looks weird
        const files = fs.readdirSync('./application/jobs/');

        files.forEach(file => {
            //TODO path looks weird
            const module = require('../../application/jobs/' + path.basename(file));
            classes.push(module[Object.keys(module)[0]]);
        });

        return classes;
    }

    //only used for local env
    //in an AWS env the sqs queue should trigger lambda functions automatically
    public static fetchJobs() {
        var params = {
            QueueUrl: currentConf.endpoint,
            VisibilityTimeout: 40,
            WaitTimeSeconds: 0
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
