import Joi from 'joi';

const validateSchema = Joi.object({
  nickname: Joi.string().pattern(new RegExp('^[A-Za-z_]+$')).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export default validateSchema;
