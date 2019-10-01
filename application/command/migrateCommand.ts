import {exec} from 'child_process';

exports.handler = (event, context, callback) => {
    exec('npm run migrate:latest',(err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
};