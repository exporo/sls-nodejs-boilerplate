import * as Joi from "@hapi/joi";

const userItemSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
});

const editUserItemSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30),
});

export { userItemSchema, editUserItemSchema };
