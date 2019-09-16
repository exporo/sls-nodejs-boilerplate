import S3FS from 'S3FS';
import * as fs from 'fs';

const config = require('../config/storage.ts');
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