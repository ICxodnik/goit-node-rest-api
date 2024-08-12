import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.email().max(100).required(),
    phone: Joi.number().length(10).required(),
})

export const updateContactSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().max(100),
    email: Joi.email().max(100),
    phone: Joi.number().length(10),
})