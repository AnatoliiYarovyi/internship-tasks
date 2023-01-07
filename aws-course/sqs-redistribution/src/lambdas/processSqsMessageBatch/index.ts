import Boom from '@hapi/boom';
import AWS from 'aws-sdk';
import { DateTime } from 'luxon';
import middy from 'middy';
import { v4 } from 'uuid';

import { APIGatewayEvent } from '@/aws/types';
import { APIGatewayResponse } from '@/aws/utils';

import { apiGatewayResponse } from '@/middlewares/apiGateWayResponse';
import { customJsonBodyParser } from '@/middlewares/customJsonBodyParser';

async function processSqsMessageBatch(
	event: APIGatewayEvent<null>,
): Promise<APIGatewayResponse<string>> {
	const dynamodb = new AWS.DynamoDB.DocumentClient();

	const message = event.Records.reduce((acc: {}[], el) => {
		const body: {} = JSON.parse(el.body);
		acc.push(body);
		return acc;
	}, []);

	const newMessage = {
		id: v4(),
		message,
		created: DateTime.utc().toISO(),
		updated: DateTime.utc().toISO(),
	};
	await dynamodb
		.put({ TableName: 'MessagesSqs', Item: newMessage })
		.promise()
		.catch((err) => {
			throw Boom.badImplementation(err);
		});

	return 'Messages were written to the database successfully!';
}

export const handler = middy(processSqsMessageBatch)
	.use(customJsonBodyParser())
	.use(
		apiGatewayResponse<APIGatewayEvent<null>, APIGatewayResponse<string>>(),
	);

export default processSqsMessageBatch;
