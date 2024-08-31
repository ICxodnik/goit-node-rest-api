import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(6).max(20).required(),
});

export const verifySchema = Joi.object({
    email: Joi.string().email().max(100).required(),
}).messages({
    "string.empty": `missing required field email`,
    "string.min": `missing required field email`,
    "any.required": `missing required field email`,
});

export const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});
