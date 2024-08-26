import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(6).max(20).required(),
});
