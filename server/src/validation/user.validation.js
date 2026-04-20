import Joi from "joi";

export const loginSchema = Joi.object({
    emailOrUsername: Joi.string().min(3).required()
    .messages({
        'string.base': 'Email or Username must be a string',
        'string.empty': 'Email or Username is required',
        'string.min': 'Email or Username should have a minimum length of {#limit}',
        'any.required': 'Email or Username is required',
    }),
    password: Joi.string().min(6).required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is required',
    }),
})

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required',
    }),
    username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username is required',
        'string.alphanum': 'Username must only contain alphanumeric characters',
        'string.min': 'Username should have a minimum length of {#limit}',
        'string.max': 'Username should have a maximum length of {#limit}',
        'any.required': 'Username is required',
    }),
    email: Joi.string().email().required()
    .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(100).required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.max': 'Password should have a maximum length of {#limit}',
        'any.required': 'Password is required',
    }),
    role: Joi.string().valid("ADMIN", "STAFF").required()
    .messages({
        'string.base': 'Role must be a string',
        'string.empty': 'Role is required',
        'any.only': 'Role must be either ADMIN or STAFF',
        'any.required': 'Role is required',
    }),
}); 

export const updateStaffSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required()
    .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
});