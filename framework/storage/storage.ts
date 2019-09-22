import S3FS from 's3fs';
import * as fs from 'fs';
const config = require('../../application/config/storage.ts');
let storageProvider;

switch (config.provider) {
    case 'local': {
        storageProvider = fs.promises;
        break;
    }
    case 's3': {
        storageProvider = new S3FS('test-bucket', config.s3);
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