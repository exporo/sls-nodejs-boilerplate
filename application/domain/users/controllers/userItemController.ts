import {CrudController} from "../../../../framework/http/controllers/crudController";
import {userItemSchema, editUserItemSchema} from "../schemas/userItemSchema";
import {UserItemRepository} from "../repositories/userItemRepository";
import {ControllerException} from "../../../../framework/http/controllers/baseController";
import {MiddlewareInterface} from "../../../../framework/http/middlewares/middlewareInterface";
import {JwtAuth} from "../../../../framework/auth/jwtAuth";

class UserItemControllerMiddleware implements MiddlewareInterface{
    public next = () => (req, user) => {
        if (req.params.parentId !== user.id) {
            throw <ControllerException>{
                status: 401,
                error: {'error-mgs': 'Not authorized'}
            };
        }
    }
}

export class UserItemController extends CrudController {
    constructor() {
        super("users/:parentId/item", new UserItemRepository());
    }

    authProvider = new JwtAuth();
    middlewares = [UserItemControllerMiddleware];

    onStoreValidationSchema = userItemSchema;
    onUpdateValidationSchema = editUserItemSchema;
}

exports.restHandler = new UserItemController().setupRestHandler();