import Joi from "joi";

export const weatherPostBody = Joi.object({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
}).required();
