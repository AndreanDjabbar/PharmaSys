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

export const createStaffSchema = Joi.object({
    restaurantId: Joi.string().uuid().required()
    .messages({
        'string.base': 'Restaurant ID must be a string',
        'string.empty': 'Restaurant ID is required',
        'string.guid': 'Restaurant ID must be a valid UUID',
        'any.required': 'Restaurant ID is required',
    }),
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
    password: Joi.string().min(6).max(100).required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.max': 'Password should have a maximum length of {#limit}',
        'any.required': 'Password is required',
    }),
    role: Joi.string().valid("CASHIER", "KITCHEN").required()
    .messages({
        'string.base': 'Role must be a string',
        'string.empty': 'Role is required',
        'any.only': 'Role must be either CASHIER or KITCHEN',
        'any.required': 'Role is required',
    }),
}); 

export const createTenantAdminSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required',
    }),
    adminEmail: Joi.string().email().required()
    .messages({
        'string.base': 'Admin Email must be a string',
        'string.empty': 'Admin Email is required',
        'string.email': 'Admin Email must be a valid email address',
        'any.required': 'Admin Email is required',
    }),
    adminName: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': 'Admin Name must be a string',
        'string.empty': 'Admin Name is required',
        'string.min': 'Admin Name should have a minimum length of {#limit}',
        'string.max': 'Admin Name should have a maximum length of {#limit}',
        'any.required': 'Admin Name is required',
    }),
    adminPassword: Joi.string().min(6).max(100).required()
    .messages({
        'string.base': 'Admin Password must be a string',
        'string.empty': 'Admin Password is required',
        'string.min': 'Admin Password should have a minimum length of {#limit}',
        'string.max': 'Admin Password should have a maximum length of {#limit}',
        'any.required': 'Admin Password is required',
    }),
    slug: Joi.string().min(3).max(100).pattern(/^[a-z0-9-]+$/).required()
    .messages({
        'string.base': 'Slug must be a string',
        'string.empty': 'Slug is required',
        'string.min': 'Slug should have a minimum length of {#limit}',
        'string.max': 'Slug should have a maximum length of {#limit}',
        'string.pattern.base': 'Slug must contain only lowercase letters, numbers, and hyphens',
        'any.required': 'Slug is required',
    }),
    address: Joi.string().min(5).max(255).required()
    .messages({
        'string.base': 'Address must be a string',
        'string.empty': 'Address is required',
        'string.min': 'Address should have a minimum length of {#limit}',
        'string.max': 'Address should have a maximum length of {#limit}',
        'any.required': 'Address is required',
    }),
})

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
})

export const registerSchema = Joi.object({
    name: Joi
    .string()
    .min(3)
    .required()
    .messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required()
    .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'string.base': 'Confirm Password must be a string',
        'string.empty': 'Confirm Password is required',
        'any.only': 'Confirm Password does not match',
        'any.required': 'Confirm Password is required',
    }),
}) 

export const registerOTPCodeSchema = Joi.object({
    otpCode: Joi.string().length(6).required()
    .messages({
        'string.base': 'OTP Code must be a string',
        'string.empty': 'OTP Code is required',
        'string.length': 'OTP Code must be exactly {#limit} characters',
        'any.required': 'OTP Code is required',
    }),
})

export const forgotPasswordEmailSchema = Joi.object({
    email: Joi.string().email().required()
    .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
})

export const forgotPasswordResetSchema = Joi.object({
    newPassword: Joi.string().min(6).required()
    .messages({
        'string.base': 'New Password must be a string',
        'string.empty': 'New Password is required',
        'string.min': 'New Password should have a minimum length of {#limit}',
        'any.required': 'New Password is required',
    }),
})