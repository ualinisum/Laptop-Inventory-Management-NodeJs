import Joi from "joi";

export const laptopValidator = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  specs: Joi.object({
    screenSize: Joi.string().required(),
    processor: Joi.string().required(),
    ram: Joi.string().required(),
    storage: Joi.string().required()
  }).required()
});