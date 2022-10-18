import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';

import {
  SignUpRequest,
  SignUpResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';

import writeClientsToDB from '../../repositories/writeClientsToDB';

const signUpClients = async (connection: mysql.Connection, phone: string) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { client_id } = process.env;
  const password = `${new Date().getTime()}`;

  if (!client_id) {
    throw Boom.badImplementation('Error with client_id');
  } else if (client_id) {
    const params: SignUpRequest = {
      ClientId: client_id,
      Password: password,
      Username: phone,
      UserAttributes: [
        {
          Name: 'nickname',
          Value: phone,
        },
      ],
    };

    const response: SignUpResponse = await cognito
      .signUp(params)
      .promise()
      .catch(error => {
        throw Boom.unauthorized(error);
      });

    console.log('*** response ***: ', JSON.stringify(response));

    const newUser = {
      id: v4(),
      nickname: phone,
      permission: 'client',
      password,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    await dynamodb
      .put({ TableName: 'UsersPhotoService', Item: newUser })
      .promise()
      .catch(error => {
        throw Boom.badImplementation(error);
      });

    // write data to client table in SQL database
    await writeClientsToDB(connection, phone);
  }
  return password;
};

export default signUpClients;
