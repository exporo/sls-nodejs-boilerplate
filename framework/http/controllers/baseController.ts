import {jwtAuth} from "../../auth/jwtAuth";
import {AuthProviderInterface} from "../../auth/authProviderInterface";
import {MiddlewareInterface} from "../middlewares/middlewareInterface";

export interface ControllerException {
    status: number,
    error: object
}

export class baseController {

    middlewares = array();
    authProvider: AuthProviderInterface;
    authenticatedUser: object;

    public prerequisites = (req) => {
        this.authenticate(req);
        this.checkMiddlewares(req, this.authenticatedUser)

    };

    public authenticate = (req) => {
        if (this.authProvider) {
            //this.authenticatedUser = this.authProvider.authenticate(req);
        }
    };

    public checkMiddlewares = (req, authenticatedUser) => {
        if (this.middlewares) {
            this.middlewares.each((middleware) => {
                middleware.next(req, authenticatedUser);
            });
        }
    };

    public validate = (data, schema) => {
        if (!schema) {
            return data;
        }

        const {error} = schema.validate(data, {abortEarly: false});

        if (error) {
            throw <ControllerException>{
                status: 422,
                error: error.details
            };
        } else {
            return data;
        }
    };
}