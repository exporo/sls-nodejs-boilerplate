# still working in progress
# Exporo sls node.js boilerplate
This boilerplate is being developed with Laravel in mind.

## Local development

```
$docker-compose up -d
$docker-compose exec node bash
docker$serverless invoke local -f {functionName}
```
Or use serverless offline and open http://0.0.0.0:3000 in your browser:
```
docker$serverless offline 
```

Since typescript is quite slow in connection with serverless, it is very advisable in local development to work primarily against tests.
```
docker$mocha -r ts-node/register tests/**/*.spec.ts --fgrep 'MyTestName'
```

## Database
application/domain/users/models/user.model.ts

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
TODO create a failed_jobs table and use it as dead letter queue


## CRUD Controller
The crud controller automatically performs crud operations on the provided model.

serverless.yml:
```
functions:
  userRestEndpoint:
    handler: application/domain/users/controllers/user.controller.restHandler
    events:
    - http:
        path: /users/{proxy+}
        method: ANY
```

application/domain/users/controllers/user.controller.ts:
```
export class UserController extends CrudController {
    constructor() {
        super("users", User);
    }
```

By default the following routes will be created:
framework/http/controllers/crud.controller.ts@setupAPIHandler:
```
app.get(`/${route}/`, this.index);
app.get(`/${route}/:id`, this.show);
app.post(`/${route}/`, this.store);
app.put(`/${route}/:id`, this.update);
app.delete(`/${route}/:id`, this.remove);
```


Validation can be done like this:
application/domain/users/controllers/user.controller.ts:
```
onStoreValidation = data => {
        const { error } = userSchema.validate({
            name: data.name
        });

        if (error) {
            throw Error(`422::${error.details[0].message}`);
        } else {
            return data;
        }
    }

onUpdateValidation = (id, data) => {
    const { error } = editUserSchema.validate({
        name: data.first_name,
    });

    if (error) {
        throw Error(`422::${error.details[0].message}`);
    } else {
        return data;
    }
}
```

