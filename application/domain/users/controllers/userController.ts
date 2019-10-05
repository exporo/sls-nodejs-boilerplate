import { User } from "../models/userModel";
import { CrudController } from "../../../../framework/http/controllers/crudController";
import { userSchema, editUserSchema } from "../schemas/userSchema";

export class UserController extends CrudController {
    constructor() {
        super("users", User);
    }

    onStoreValidationSchema = userSchema;
    onUpdateValidationSchema = editUserSchema;
}

exports.restHandler = new UserController().setupRestHandler();