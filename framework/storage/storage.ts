import * as StorageManager from '@slynova/flydrive';

const config = require('../../application/config/storage.ts');

const storage = new StorageManager(config);

export const Storage = storage.disk();


