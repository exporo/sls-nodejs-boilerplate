# still working in progress
# Exporo sls node.js boilerplate
This boilerplate is being developed with Laravel in mind.

## Local development

```
$docker-compose up -d
$docker-compose exec node bash
docker$serverless invoke local -f {functionName}
```

Since typescript is quite slow in connection with serverless, it is very advisable in local development to work primarily against tests.
```
docker$mocha -r ts-node/register tests/**/*.spec.ts --fgrep 'MyTestName'
```

## Database
application/models/user.ts

```
User.q().where('column', '=', 'foo').first().then((column) => {}); 

User.updateOrCreate(['column', 'foo'], ['column2', 'newValue']);

User.find(1).then((item) => {});
```

### Migration commands 
```
$npm run migrate:make my_table_creation_description

$npm run migrate:make migrate:latest

$npm run migrate:make migrate:rollback
```
In the background knex is used.


## Storage
In the local development environment, the local ./storage folder is used and in an AWS environment the S3 the bucket, created in the Cloudformation script, is used.
[Flydrive](https://github.com/Slynova-Org/flydrive) is used as filesystem abstraction manager.


```
import {Storage} from '../../framework/storage/storage';

Storage.put('message.txt', 'Hello Node');

Storage.get('message.txt').then((content)=> {console.log(content.toString())});
```

## Cache
The docker container amazon/dynamodb-local is used locally. In an AWS environment the generated DynamoDB table is used.

```
import {Cache} from '../../framework/cache/cache';

const ttlInSeconds = 60;

Cachce.remember('cache-key', ttlInSeconds, () => { return 'cache-valuee'});
```

## Queue
The docker container vsouza/sqs-local is used locally. In an AWS environment the generated SQS queue together with a dead letter queue is used.

```
import {Queue} from "../../framework/queue/queue";
import {myJOb} from "../../application/jobs/myJob";

return Queue.dispatch((new myJOb({email: 'test'})));
```