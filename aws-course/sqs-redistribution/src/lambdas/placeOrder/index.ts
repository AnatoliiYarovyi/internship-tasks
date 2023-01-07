import Boom from '@hapi/boom';
import AWS from 'aws-sdk';
import middy from 'middy';

import { APIGatewayEvent } from '@/aws/types';
import { APIGatewayResponse } from '@/aws/utils';

import { apiGatewayResponse } from '@/middlewares/apiGateWayResponse';
import { customJsonBodyParser } from '@/middlewares/customJsonBodyParser';

async function placeOrder(
	event: APIGatewayEvent<null>,
): Promise<APIGatewayResponse<string>> {
	const sqs = new AWS.SQS();
	const { QUEUE_URL } = process.env;

	const message = {
		message: event.body,
		apiKey: event.headers['x-api-key'],
	};
	if (event.body && QUEUE_URL) {
		const params = {
			MessageBody: JSON.stringify(message),
			QueueUrl: QUEUE_URL,
		};
		sqs.sendMessage(params, (err: Error, data: Object) => {
			if (err) {
				throw Boom.internal(`${err}`);
			} else {
				// eslint-disable-next-line no-console
				console.log(`data: ${JSON.stringify(data)}`);
			}
		});
	}
	return 'Message sent successfully!';
}

export const handler = middy(placeOrder)
	.use(customJsonBodyParser())
	.use(
		apiGatewayResponse<APIGatewayEvent<null>, APIGatewayResponse<string>>(),
	);

export default placeOrder;
