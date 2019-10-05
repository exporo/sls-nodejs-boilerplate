import {UserController} from "../../application/domain/users/controllers/userController";
import "mocha";
import {User} from "../../application/domain/users/models/userModel";

const request = require("supertest");
const chai = require("chai");
const should = chai.should();
const userCtr = new UserController();
const app = userCtr.setupAPIHandler();

const user = {
    initData: {
        name: 'Henrik'
    },
    correctData: {
        id: 1,
        name: 'Henrik'
    },
    inCorrectData: {
        last_name: 'Henrik'
    },
    updateCorrectData: {
        name: 'HenrikLippke'
    },
    updateIncorrectData: {
        first_name: 'HenrikMustermann'
    }
};

describe("user controller tests", () => {


    describe("CRUD operation with correct data", () => {
        it("Truncate DB", done => {
            User.q()
                .truncate()
                .then(() => {
                    done();
                });
        });

        it("#POST sould add a user, return 200 code", done => {
            request(app)
                .post("/users")
                .send(user.initData)
                .expect(201)
                .end((err, res) => {
                    const data = JSON.parse(res.text);
                    console.log('data', data);
                    data.should.eql(user.initData);
                    done();
                });
        });

        it("#PUT should edit a user by id, return 202 code", done => {
            request(app)
                .put(`/users/${user.correctData.id}`)
                .send(user.updateCorrectData)
                .expect(202, done);
        });

        it("#GET user should have been edited, return 200 code", done => {
            request(app)
                .get(`/users/${user.correctData.id}`)
                .expect(200)
                .end((err, res) => {
                    const response = JSON.parse(res.text);
                    response.name.should.eql(user.updateCorrectData.name);
                    done();
                });
        });

        it("#DELETE should delete a user, return 204 code", done => {
            request(app)
                .delete(`/users/${user.correctData.id}`)
                .expect(204, done);
        });

        it("#GET shoud no longer have that user, return 201 code", done => {
            request(app)
                .get(`/users/${user.correctData.id}`)
                .expect(201)
                .end((err, res) => {
                    let data: object;

                    if (!res.text.length) {
                        data = {};
                    } else {
                        data = JSON.parse(res.text);
                    }
                    data.should.eql({});
                    done();
                });
        });
    });

    describe("CRUD operation with incorrect data", () => {
        before(done => {
            request(app)
                .post("/users")
                .send(user.initData)
                .expect(201, done);
        });

        after(done => {
            request(app)
                .delete(`/users/${user.correctData.id}`)
                .expect(204, done);
        });

        it("#POST user don`t added, return 400 code", done => {
            request(app)
                .post("/users")
                .send(user.inCorrectData)
                .expect(422)
                .end((err, res) => {
                    const data = JSON.parse(res.text);
                    data[0].message.should.eql("\"name\" is required");
                    done();
                });


        });

        it("#PUT user don`t edited, return 400 code", done => {
            request(app)
                .put(`/users/${user.correctData.id}`)
                .send(user.updateIncorrectData)
                .expect(422)
                .end((err, res) => {
                    const data = JSON.parse(res.text);
                    data[0].message.should.eql("\"first_name\" is not allowed");
                    done();
                });
        });
    });
});