/* eslint-disable no-param-reassign */
import { ObjectSchema } from 'joi';
import { MiddlewareObject } from 'middy';

export const joiValidate = (
	validateSchema?: ObjectSchema,
): MiddlewareObject<any, any> => ({
	before: async (handler, next) => {
		if (handler.event.body && validateSchema) {
			try {
				const value = await validateSchema.validateAsync(
					handler.event.body,
				);
				console.log('value: ', value);
			} catch (error) {
				// Initialize response
				handler.response = handler.response ?? {};
				// Add (.error) to response
				handler.response.error = `${error}`;
				// Override an error
				handler.error = new Error(`Error joi validate ${error}`);
				// handle the error
				return handler.response;
			}
		}
		return next();
	},
});
