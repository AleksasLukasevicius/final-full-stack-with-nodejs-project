import Joi from "joi";

export const adminSchema = Joi.object({
  admin_name: Joi.string().trim().required(),
  password: Joi.string().required(),
});
