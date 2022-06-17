import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';

const handler = async (
  event: EventBody<{ email: string; password: string }>,
) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { email, password } = event.body;
  const { client_id } = process.env;

  const params = {
    ClientId: client_id,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  const response = await cognito
    .signUp(params)
    .promise()
    .catch(error => {
      throw Boom.unauthorized(error);
    });

  console.log('*** response ***: ', response);

  const newUser = {
    id: v4(),
    email: email,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  await dynamodb
    .put({ TableName: 'Users', Item: newUser })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return {
    status: 'success',
    message: 'User registration successful',
  };
};

export const signup = middyfy(handler, validateSchemas);
