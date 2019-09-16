var AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
    TableName: 'EPISODES_TABLE',
    Key: {'KEY_NAME': 'asd'}
};

docClient.get(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Item);
    }
});


export class Cache {

    private static tabelName = 'cache';
    private static keyPrefix = 'cache-';

    public static remember(name, ttl, callback) {
        const data = this.get(name);

        if (data) {
            return data;
        }

        const newData = callback();

        this.put(name, ttl, name);

        return newData;
    }

    public static get(name): string {
        const params = {
            TableName: this.tabelName,
            Key: {'KEY_NAME': this.generateKey(name)}
        };

        docClient.get(params, function (err, data) {
            return data.Item;
        });

        return '';
    }

    public static put(name, ttl, value): boolean {
        const params = {
            TableName: this.tabelName,
            Key: {'KEY_NAME': this.generateKey(name)}
        };

        docClient.put(params, value, function (err) {
            if (!err) {
                return true;
            }
        });

        return false;
    }

    public static remove(name) {
    }


    private static generateKey(name: string) {
        return this.tabelName + name;
    }
}

