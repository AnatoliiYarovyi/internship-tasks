/* eslint-disable no-param-reassign */
import Boom from '@hapi/boom';
import contentTypeLib from 'content-type';
import { MiddlewareObject } from 'middy';
import { IJsonBodyParserOptions } from 'middy/middlewares';

export const customJsonBodyParser = (
	opts?: IJsonBodyParserOptions,
): MiddlewareObject<any, any> => ({
	before: (handler, next) => {
		opts = opts || {};
		const { headers } = handler.event;
		if (!headers) {
			return next();
		}
		const contentType = headers['Content-Type'] || headers['content-type'];
		if (contentType) {
			const { type } = contentTypeLib.parse(contentType);
			if (type === 'application/json') {
				try {
					handler.event.body = JSON.parse(
						handler.event.body,
						opts.reviver,
					);
				} catch (err) {
					if (typeof handler.event.body === 'object') return next();
					throw Boom.internal(
						'Content type defined as JSON but an invalid JSON was provided',
					);
				}
			}
		}
		return next();
	},
});
