import * as S3FS from 's3fs';
import * as fs from 'fs';

const config = require('../../application/config/storage.ts');
let storageProvider;

switch (process.env.AWS_LAMBDA_FUNCTION_NAME ? 'aws' : 'docker') {
    case 'docker': {
        storageProvider = fs.promises;
        break;
    }
    case 'aws': {
        storageProvider = fs.promises;
        //replace with https://github.com/Slynova-Org/flydrive
        break;
    }
}

export const Storage = storageProvider;

export const storage_path = function (fileName) {
    if (config.provider === 'local') {
        return config.local.prefix + fileName;
    }

    return fileName;
};