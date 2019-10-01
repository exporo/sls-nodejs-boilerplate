import {exec} from 'child_process';

exports.handler = (event, context, callback) => {
    exec('npm run migrate:latest', (err, stdout, stderr) => {
        console.log(stdout);
    }).on('exit', (code) => {
        if (code === 0) {
            callback(null, 'success');
        }
        callback('failed');
    });
};