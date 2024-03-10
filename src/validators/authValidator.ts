import Joi from "joi"

export const signUpValidator = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const signInValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });