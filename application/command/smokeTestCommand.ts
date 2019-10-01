import {exec} from 'child_process';

exports.handler = (event, context, callback) => {
    exec('./node_modules/mocha/bin/mocha -r ts-node/register ./tests/**/*.spec.ts --exit', (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
};