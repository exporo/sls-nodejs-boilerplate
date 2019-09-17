import * as ESSerializer from 'esserializer';

//TODO start
import {myJOb} from "../../application/jobs/myJob";

let classes = [myJOb];
//TODO end

const config = require('../../application/config/queue.ts');

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

export class Queue {

    public static dispatch(jobClass) {

        const serializeClass = ESSerializer.serialize(jobClass);
        const params = {
            MessageBody: serializeClass,
            QueueUrl: config.local.url
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

        const job = ESSerializer.deserialize(message.Body, classes);

        job.handle();

        const deleteParams = {
            QueueUrl: config.local.url,
            ReceiptHandle: message.ReceiptHandle
        };

        return sqs.deleteMessage(deleteParams).promise()
            .catch((err) => {
                console.log("Delete Error", err);
            });
    }


    //only used for local env
    //in an AWS env the sqs queue should trigger lambda functions automatically
    public static fetchJobs() {
        var params = {
            QueueUrl: config.local.url,
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


//TODO move this into a Prerequisites bash script ?
function localPrerequisites() {
    // aws sqs create-queue --queue-name sqs --endpoint-url http://localhost:9324 --profile  aws_workshop --region eu-central-1
}