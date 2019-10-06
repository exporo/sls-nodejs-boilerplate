import {jwtAuth} from "../middlewares/auth/jwtAuth";

export class baseController {

    middleware: [middlewareInterface] = [new jwtAuth()];
    authenticatedUser: object;

    public authorizeer = (req) => {
        const response = this.authProvider.handle();

        if (response.authenticatedUser) {
            this.authenticatedUser = response.authenticatedUser;
        }
    };

    public checkMiddleware = (req) => {
        if (!this.middleware) {
            return true;
        }

        return this.middleware.every((middleware) => {
            const response = middleware.allow(req);
            return true;
        })
    };

    public validate = (data, schema) => {
        if (!schema) {
            return data;
        }

        const {error} = schema.validate(data, {abortEarly: false});

        if (error) {
            throw {
                status: 422,
                error: error.details
            };
        } else {
            return data;
        }
    };
}