import * as Joi from "@hapi/joi";

const userSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
});

const editUserSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30),
});

export { userSchema, editUserSchema };
