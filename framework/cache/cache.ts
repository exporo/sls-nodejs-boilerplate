const config = require('../../application/config/cache.ts');
var AWS = require('aws-sdk');

const currentConf = config[process.env.AWS_LAMBDA_FUNCTION_NAME ? 'aws' : 'docker'];

AWS.config.update({
    region: currentConf.region,
    endpoint: currentConf.endpoint
});

const docClient = new AWS.DynamoDB.DocumentClient();

export class Cache {

    private static tableName = currentConf.tableName;
    private static keyPrefix = 'cache-';

    public static remember(name, ttlInSeconds, callback) {
        return this.get(name)
            .then((data) => {
                if (data) {
                    return data;
                }

                const newData = callback();

                return this.put(name, ttlInSeconds, newData)
                    .then(() => {
                        return newData;
                    });
            })
            .catch((err) => {
                console.log('DynamoDB error', err);
            });
    }

    public static get(name) {
        const params = {
            TableName: this.tableName,
            Key: {'key': this.generateKey(name)}
        };

        return docClient.get(params).promise()
            .then((data) => {
                if (data.Item && data.Item.value &&
                    data.Item.ttl > this.getUnixTime(0)) {
                    return data.Item.value;
                }
            });
    }

    public static put(name, ttlInSeconds, value) {
        const params = {
            TableName: this.tableName,
            Item: {
                'key': this.generateKey(name),
                'value': value,
                'ttl': this.getUnixTime(ttlInSeconds)
            }
        };

        return docClient.put(params, value)
            .promise();
    }

    public static remove(name) {
        const params = {
            TableName: this.tableName,
            Key: {'key': this.generateKey(name)}
        };

        return docClient.delete(params).promise();
    }

    protected static getUnixTime(seconds: number) {
        return Math.floor(Date.now() / 1000) + seconds;
    }

    private static generateKey(name: string) {
        return this.keyPrefix + name;
    }
}