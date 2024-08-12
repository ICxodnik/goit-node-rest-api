import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(100).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
})

export const updateContactSchema = Joi.object({
    id: Joi.string().min(20).required(),
    name: Joi.string().min(3).max(100),
    email: Joi.string().email().max(100),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/),
})