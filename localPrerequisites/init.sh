
##DynamoDB

aws dynamodb --endpoint-url http://dynamodb:8000 create-table --cli-input-json file://dynamoDbCacheTable.json --region eu-central-1
aws dynamodb --endpoint-url http://dynamodb:8000 update-time-to-live --table-name cache --time-to-live-specification "Enabled=true, AttributeName=ttl" --region eu-central-1
aws dynamodb --endpoint-url http://dynamodb:8000