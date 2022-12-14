import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { PgDatabase } from 'drizzle-orm-pg/db';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';

import { Photographer } from '../../repositories/Photographer';

const { CLIENT_ID } = process.env;
const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (
  event: EventBody<{
    connection: PgDatabase;
    nickname: string;
    password: string;
    fullName?: string;
    email?: string;
    phone?: string;
    permission: string;
  }>,
) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { connection, nickname, password, fullName, email, phone, permission } =
    event.body;
  const photographer = new Photographer(connection)

  const params = {
    ClientId: CLIENT_ID,
    Password: password,
    Username: nickname,
    UserAttributes: [
      {
        Name: 'nickname',
        Value: nickname,
      },
    ],
  };

  const response = await cognito
    .signUp(params)
    .promise()
    .catch(error => {
      throw Boom.unauthorized(error);
    });

  // console.log('*** response ***: ', response);
  // console.log('*** response ***: ', JSON.stringify(response));

  const newUser = {
    id: v4(),
    nickname: nickname,
    fullName,
    email,
    permission,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  await dynamodb
    .put({ TableName: TABLE_NAME, Item: newUser })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  // writing data about a client or photographer in a SQL database
  switch (permission) {
    case 'client':
      break;

    case 'photographer':
      await photographer.writePhotographer(nickname, fullName, email, phone);
      break;

    default:
      console.log('Invalid permission type');
  }

  return {
    status: 'success',
    message: 'User registration successful',
  };
};

export const signUp = middyfy(handler, validateSchemas);
