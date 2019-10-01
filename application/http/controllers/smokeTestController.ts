import {exec} from 'child_process';

exports.handler = (event, context, callback) => {

    exec('npm run migrate:latest');

    exec('./node_modules/mocha/bin/mocha -r ts-node/register ./tests/**/*.spec.ts --exit', (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
            callback({
                statusCode: 500,
                headers: {
                    "Content-Type": "text/html"
                },
                body: err + stderr
            });
            return;
        }

        callback({
            statusCode: 200,
            headers: {
                "Content-Type": "text/html"
            },
            body: stdout
        });
    });
};