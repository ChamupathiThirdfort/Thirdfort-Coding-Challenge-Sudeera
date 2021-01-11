import Joi from "joi";

export const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const SignUpValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
