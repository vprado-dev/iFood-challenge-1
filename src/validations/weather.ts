import Joi from "joi";

export const weatherPostBody = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lon: Joi.number().min(-180).max(180).required(),
}).required();

export const weatherGetOneParams = Joi.object({
  cityName: Joi.string().required(),
}).required();
