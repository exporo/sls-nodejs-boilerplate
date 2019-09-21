
##DynamoDB


    const params = {
        AttributeDefinitions: [
            {
                AttributeName: 'key',
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'key',
                KeyType: 'HASH'
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: 'cache',
        StreamSpecification: {
            StreamEnabled: false
        }
    };


            ddb.createTable(params);


                ddb.describeTimeToLive(     {
                                                           TableName: 'cache',
                                                           TimeToLiveSpecification: {
                                                               AttributeName: 'ttl',
                                                               Enabled: true
                                                           }
                                                       });



##SQS