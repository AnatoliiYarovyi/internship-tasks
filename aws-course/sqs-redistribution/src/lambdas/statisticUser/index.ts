import Boom from '@hapi/boom';
import AWS from 'aws-sdk';
import { DateTime } from 'luxon';
import middy from 'middy';

import { APIGatewayEvent } from '@/aws/types';
import { APIGatewayResponse } from '@/aws/utils';

import { apiGatewayResponse } from '@/middlewares/apiGateWayResponse';
import { customJsonBodyParser } from '@/middlewares/customJsonBodyParser';

async function statisticUser(
	event: APIGatewayEvent<null>,
): Promise<APIGatewayResponse<string>> {
	const dynamodb = new AWS.DynamoDB.DocumentClient();

	const { userId, start, end } = event.queryStringParameters;

	const timeStart = `${DateTime.fromISO(start, { zone: 'utc' })}`;
	const timeEnd = `${DateTime.fromISO(end, { zone: 'utc' })}`;

	const queryScan = {
		TableName: 'MessagesSqs',
		FilterExpression: 'created BETWEEN :this_timeStart AND :this_timeEnd',
		ExpressionAttributeValues: {
			':this_timeStart': timeStart,
			':this_timeEnd': timeEnd,
		},
	};
	const allData = await dynamodb
		.scan(queryScan, (err, data) => {
			if (err) {
				throw Boom.badImplementation(err.message);
			} else {
				return data;
			}
		})
		.promise()
		.catch((error) => {
			throw Boom.badImplementation(error);
		});

	let num = 0;
	if (allData.Items) {
		num = allData.Items.reduce((acc, el) => {
			el.message.map(
				(elem: {
					message: { name: string; price: number; userId: string };
					apiKey: string;
				}) => {
					if (elem.message.userId === userId) {
						// eslint-disable-next-line no-param-reassign
						acc += 1;
					}
					return '';
				},
			);
			return acc;
		}, 0);
	}

	return `Number of user requests: ${num}`;
}

export const handler = middy(statisticUser)
	.use(customJsonBodyParser())
	.use(
		apiGatewayResponse<APIGatewayEvent<null>, APIGatewayResponse<string>>(),
	);

export default statisticUser;
