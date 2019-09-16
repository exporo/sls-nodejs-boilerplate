import {User} from "../../models/user";


exports.index = async (event) => {

    console.log(User.find(1));

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: 'hello world'
    };
};