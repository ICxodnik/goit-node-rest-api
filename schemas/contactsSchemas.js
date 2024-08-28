import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(100).required(),
    ownerId: Joi.number().required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
});

export const toggleFavSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email().max(100),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/),
})
    .or("name", "email", "phone")
    .messages({
        "object.missing": "Body must have at least one field"
    });