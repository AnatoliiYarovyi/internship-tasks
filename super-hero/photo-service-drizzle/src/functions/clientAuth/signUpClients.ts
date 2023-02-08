import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { PgDatabase } from 'drizzle-orm-pg/db';

import {
  SignUpRequest,
  SignUpResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Clients } from '../../data/repositories/client/Clients';

const { CLIENT_ID } = process.env;
const TABLE_NAME = process.env.USERS_TABLE_NAME;

const signUpClients = async (connection: PgDatabase, phone: string) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const client = new Clients(connection);

  const password = `${new Date().getTime()}`;

  if (!CLIENT_ID) {
    throw Boom.badImplementation('Error with CLIENT_ID');
  } else if (CLIENT_ID) {
    const params: SignUpRequest = {
      ClientId: CLIENT_ID,
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
      .put({ TableName: TABLE_NAME, Item: newUser })
      .promise()
      .catch(error => {
        throw Boom.badImplementation(error);
      });

    // write data to client table in SQL database
    await client.writeClients(phone);
  }
  return password;
};

export default signUpClients;
