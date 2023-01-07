import Joi from 'joi';

const validateSchema = Joi.object({
	name: Joi.string().required(),
	price: Joi.string().required(),
});

export default validateSchema;
