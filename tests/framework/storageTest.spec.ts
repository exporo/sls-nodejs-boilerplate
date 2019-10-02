import 'mocha';
import {Storage} from '../../framework/storage/storage';
import {expect} from "chai";


describe('Storage tests', () => {
    it('storage write', () => {
        return Storage.put('message.txt', 'Hello Node')
            .catch((error) => {
                console.log(error);
            });
    });

    it('storage read', () => {
        return Storage.get('message.txt')
            .then((value) => {
                expect(value.toString()).to.eql('Hello Node');
            })
            .catch((error) => {
                console.log(error);
            });
    });
});