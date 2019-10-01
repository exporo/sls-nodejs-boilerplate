import {exec} from 'child_process';

exports.handler = (event, context, callback) => {
    let out;

    exec('npm run migrate:latest', (err, stdout, stderr) => {
        out = stdout;
    }).on('exit', (code) => {
        if (code === 0) {
            callback(null, out);
        }
        callback(out);
    });
};