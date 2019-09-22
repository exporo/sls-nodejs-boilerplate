import {expect} from 'chai';
import 'mocha';
import {Storage, storage_path} from '../../framework/storage/storage';


describe('Storage tests', () => {
    it('storage write', () => {
        return Storage.writeFile(storage_path('message.txt'), 'Hello Node')
            .catch((error) => {
                console.log(error);
            });
    });

    it('storage read', () => {
        return Storage.readFile(storage_path('message.txt'))
            .catch((error) => {
                console.log(error);
            });
    });
});