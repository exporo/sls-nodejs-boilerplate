import { StorageManager } from'@slynova/flydrive';

const config = require('../../application/config/storage.ts');

// AWS_LAMBDA_FUNCTION_NAME
//storage.disk('awsCloud');
export const Storage = new StorageManager(config);


