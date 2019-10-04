import { User } from "../models/user.model";
import { CrudController } from "../../../../framework/http/controllers/crud.controller";
import { userSchema, editUserSchema } from "../schemas/user.schema";

export class UserController extends CrudController {
    constructor() {
        super("users", User);
    }

    onStoreValidationSchema = userSchema;
    onUpdateValidationSchema = editUserSchema;
}

exports.restHandler = new UserController().setupRestHandler();