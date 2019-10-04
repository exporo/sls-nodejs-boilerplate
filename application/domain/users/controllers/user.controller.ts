import { User } from "../models/user.model";
import { CrudController } from "../../../../framework/http/controllers/crud.controller";
import { userSchema, editUserSchema } from "../schemas/user.schema";

export class UserController extends CrudController {
    constructor() {
        super("users", User);
    }

    onStoreValidation = data => {
        const { error } = userSchema.validate({
            name: data.name
        });

        if (error) {
            throw Error(`422::${error.details[0].message}`);
        } else {
            return data;
        }
    }

    onUpdateValidation = (id, data) => {
        const { error } = editUserSchema.validate({
            name: data.first_name,
        });

        if (error) {
            throw Error(`422::${error.details[0].message}`);
        } else {
            return data;
        }
    }
}

exports.restHandler = new UserController().setupRestHandler();