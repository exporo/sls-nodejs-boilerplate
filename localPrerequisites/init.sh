# AWS Credentials
mkdir ~/.aws
printf "[default]\naws_access_key_id = DEFAULT_ACCESS_KEY\naws_secret_access_key = DEFAULT_SECRET_KEY" >> ~/.aws/credentials
printf "[default]\nregion = eu-central-1" >> ~/.aws/config

# DynamoDB
aws dynamodb --endpoint-url http://dynamodb:8000 create-table --cli-input-json file://dynamoDbCacheTable.json --region eu-central-1
aws dynamodb --endpoint-url http://dynamodb:8000 update-time-to-live --table-name cache --time-to-live-specification "Enabled=true, AttributeName=ttl" --region eu-central-1
