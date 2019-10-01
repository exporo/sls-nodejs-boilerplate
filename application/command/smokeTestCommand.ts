import {exec} from 'child_process';

exports.handler = (event, context, callback) => {
    exec('./node_modules/mocha/bin/mocha -r ts-node/register ./tests/**/*.spec.ts --exit', (err, stdout, stderr) => {
        console.log('stdout', stdout);
    }).on('exit', (code) => {
        if (code === 0) {
            callback(null, 'success');
        }
        callback('failed');
    });
};