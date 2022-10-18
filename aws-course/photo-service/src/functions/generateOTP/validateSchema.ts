import Joi from 'joi';

const validateSchema = Joi.object({
  phone: Joi.string()
    .pattern(
      // prettier-ignore
      /^((38|8)[- ]?)?\(?(039|044|050|063|066|067|068|073|091|092|093|094|095|096|097|098|099)\)?([- ]?)?[\d\- ]{7,10}$/,
    )
    .required(),
});

export default validateSchema;
