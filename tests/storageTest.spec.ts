import {expect} from 'chai';
import 'mocha';
import {Storage} from "../application/resources/storage";

describe('Storage tests', () => {
    it('storage write', () => {
        return Storage.writeFile('message2.txt', 'Hello Node')
            .then(() => {
                console.log('written');
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it('storage read', () => {
        return Storage.readFile('message.txt')
            .then((data) => {
                console.log('read', data.toString());
            })
            .catch((error) => {
                console.log(error);
            });
    });
});