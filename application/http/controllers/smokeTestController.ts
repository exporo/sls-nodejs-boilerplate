import {exec} from 'child_process';

exports.handler = (event, context, callback) => {

    exec('npm run mocha -r ts-node/register tests/**/*.spec.ts --exit --reporter mocha-simple-html-reporter', (err, stdout, stderr) => {
        if (err) {
            callback({
                statusCode: 500,
                headers: {
                    "Content-Type": "text/html"
                },
                body: stdout
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