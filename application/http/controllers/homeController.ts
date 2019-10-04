import {User} from "../../models/user";


exports.index = async (event, context, callback) => {

    console.log(User.q().first());


    callback(null,
        {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html"
            },
            body: 'db4'
        });
};



