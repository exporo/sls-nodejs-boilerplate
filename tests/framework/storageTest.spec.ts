import {expect} from 'chai';
import 'mocha';
import {Storage, storage_path} from '../../framework/storage/storage';


describe('Storage tests', () => {
    it('storage write', () => {
        return Storage.writeFile(storage_path('message.txt'), 'Hello Node')
            .then(() => {
                console.log('written');
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it('storage read', () => {
        return Storage.readFile(storage_path('message.txt'))
            .then((data) => {
                console.log('read', data.toString());
            })
            .catch((error) => {
                console.log(error);
            });
    });
});