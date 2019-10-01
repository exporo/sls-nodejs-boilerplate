import 'mocha';
import {Storage} from '../../framework/storage/storage';


describe('Storage tests', () => {
    it('storage write', () => {
        return Storage.put('message.txt', 'Hello Node')
            .catch((error) => {
                console.log(error);
            });
    });

    it('storage read', () => {
        return Storage.get('message.txt')
            .catch((error) => {
                console.log(error);
            });
    });
});