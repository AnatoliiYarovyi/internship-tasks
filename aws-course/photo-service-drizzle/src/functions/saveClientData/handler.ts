import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Client } from '../../repositories/Client';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection, fullName, email } = event.body;
  const client = new Client(connection);

  const currentUserDb = await dynamodb
    .get({ TableName: TABLE_NAME, Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  currentUserDb.Item.fullName = fullName;
  currentUserDb.Item.email = email;

  await dynamodb
    .put({ TableName: TABLE_NAME, Item: currentUserDb.Item })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  // write data to client table in SQL database
  await client.updateClientsData(nickname, fullName, email).catch(error => {
    throw Boom.badImplementation(error);
  });

  return {
    status: 'success',
    message: 'saveClientData successful',
  };
};

export const saveClientData = middyfy(handler);
