import Joi from 'joi';

const validateSchema = Joi.object({
  nickname: Joi.string().pattern(new RegExp('^[A-Za-z_]+$')).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  fullName: Joi.string().empty('').default('null'),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .empty('')
    .default('null'),
  permission: Joi.string().allow('photographer', 'client'),
});

export default validateSchema;
