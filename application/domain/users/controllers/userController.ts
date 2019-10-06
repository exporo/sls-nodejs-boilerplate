import { CrudController } from "../../../../framework/http/controllers/crudController";
import { userSchema, editUserSchema } from "../schemas/userSchema";
import {UserRepository} from "../repositories/userRepository";

export class UserController extends CrudController {
    constructor() {
        super("users", new UserRepository());
    }

    onStoreValidationSchema = userSchema;
    onUpdateValidationSchema = editUserSchema;
}

exports.restHandler = new UserController().setupRestHandler();