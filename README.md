#still working in progress
#Exporo sls node.js boilerplate
This boilerplate is being developed with Laravel in mind.



##Local development

```
$docker-compose up -d
$docker-compose exec node bash
docker$serverless  invoke local -f {functionName}
```

Since typescript is quite slow in connection with serverless, it is very advisable in local development to work primarily against tests.
```
docker$mocha -r ts-node/register tests/**/*.spec.ts --exit --fgrep '{MyTestName}'
```

##Database
application/models/user.ts

```
new User().q().where('column', '=', 'foo').first().then((column) => {}); 
new User().updateOrCreate(['column', 'foo'], ['column2', 'newValue']);
new User().find(1).then((item) => {});
```
TODO Use model as static classes

###Migration commands 
```
$npm run migrate:make my_table_creation_description
$npm run migrate:make migrate:latest
$npm run migrate:make migrate:rollback
```
In the background knex is used.


##Storage
coming soon

##Cache
coming soon