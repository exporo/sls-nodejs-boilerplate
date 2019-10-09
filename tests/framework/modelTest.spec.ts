import { expect } from 'chai';
import 'mocha';
import { User, UserInterface } from "../../application/domain/users/models/userModel";

describe('Model tests', () => {
    it('should create a new model', () => {
        return User.q().insert(<UserInterface>{ name: 'h.lippke@exporo.com' })
            .catch((error) => {
                console.log(error);
            });
    });

    it('should get the first entry', () => {
        return User.q().orderBy([{ column: 'id', order: 'desc' }]).first().then((user: UserInterface) => {
            expect(user.name).to.eql('h.lippke@exporo.com');
        });
    });

    it('should update an item', () => {
        return User.updateOrCreate({ name: 'h.lippke@exporo.com' }, { name: 'h.lippke+test@exporo.com' })
            .then(() => {
                return User.q().where({ name: 'h.lippke+test@exporo.com' }).first()
                    .then((user: UserInterface) => {
                        expect(user.name).to.eql('h.lippke+test@exporo.com');
                    });
            });
    });

    it('should create an item', () => {
        return User.updateOrCreate({ name: 'h.lippke+4@exporo.com' }, { name: 'h.lippke+4@exporo.com' })
            .then(() => {
                return User.q().where({ name: 'h.lippke+4@exporo.com' }).first()
                    .then((user: UserInterface) => {
                        expect(user.name).to.eql('h.lippke+4@exporo.com');
                    });
            });
    });
});