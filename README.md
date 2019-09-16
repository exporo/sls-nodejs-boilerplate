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
docker$mocha -r ts-node/register tests/**/*.spec.ts --exit --fgrep '{MyTestName}'
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
In the local development environment, the classic [node.js FS](https://nodejs.org/api/fs.html#fs_fs_promises_api) library is used using promises.
In an AWS environment an [S3 library](https://www.npmjs.com/package/s3fs) is used so that the syntax does not change.
In S3 the bucket created in the Cloudformation script is used.


```
import {Storage, storage_path} from '../../framework/storage/storage';

Storage.writeFile(storage_path('message.txt'), 'Hello Node');

Storage.readFile(storage_path('message.txt')).then((content)=> {console.log(content.toString())});
```

## Cache
coming soon