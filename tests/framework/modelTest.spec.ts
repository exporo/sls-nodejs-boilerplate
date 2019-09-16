import {expect} from 'chai';
import 'mocha';
import {User, UserInterface} from "../../application/models/user";

describe('Basic Model tests', () => {
    it('should create a new model', () => {
        return User.q().insert(<UserInterface>{name: 'h.lippke@exporo.com'})
            .catch((error) => {
                console.log(error);
            });
    });

    it('should get the first entry', () => {
        return User.find(1).then((user: UserInterface) => {
            expect(user.name).to.eql('h.lippke@exporo.com');
        });
    });
});