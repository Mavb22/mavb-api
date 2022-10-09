import Joi from '@hapi/joi';

export const registerSchema = Joi.object({ 
    name: Joi.string().min(5).max(60).required(),
    surname: Joi.string().min(5).max(60).required(),
    username: Joi.string().min(5).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
    confirm_password: Joi.string().min(5).max(255).required()
});
export const loginSchema = Joi.object({
    email: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(8).max(255).required()
});
export const changePasswordSchema = Joi.object({
    new_password: Joi.string().min(8).max(255).required(),
    confirm_password: Joi.string().min(8).max(255).required()
});