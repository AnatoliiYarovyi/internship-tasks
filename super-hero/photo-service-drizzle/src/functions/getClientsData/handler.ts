import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Clients } from '../../data/repositories/client/Clients';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;
  const client = new Clients(connection);

  const currentUserDb = await dynamodb
    .get({ TableName: TABLE_NAME, Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  const userId = await client.getCurrentClientId(nickname);

  return {
    status: 'success',
    message: 'getClientsData successful',
    data: {
      id: userId,
      nickname: currentUserDb.Item.nickname,
      fullName: currentUserDb.Item.fullName,
      email: currentUserDb.Item.email,
      selfieLink: currentUserDb.Item.selfieLink,
    },
  };
};

export const getClientsData = middyfy(handler);
