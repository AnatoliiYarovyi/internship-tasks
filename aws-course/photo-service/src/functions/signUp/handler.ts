import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';
import writePhotographerToDB from '../../repositories/writePhotographerToDB';

const handler = async (
  event: EventBody<{
    connection: mysql.Connection;
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
  const { client_id } = process.env;

  const params = {
    ClientId: client_id,
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
  console.log('*** response ***: ', JSON.stringify(response));

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
    .put({ TableName: 'UsersPhotoService', Item: newUser })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  // writing data about a client or photographer in a SQL database
  switch (permission) {
    case 'client':
      break;

    case 'photographer':
      await writePhotographerToDB(connection, nickname, fullName, email, phone);
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
