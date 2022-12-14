import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import { PgDatabase } from 'drizzle-orm-pg/db';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import verifyOTP from './verifyOTP';
import signUpClients from './signUpClients';
import signInClients from './signInClients';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (
  event: EventBody<{
    connection: PgDatabase;
    phone: string;
    otp: string;
  }>,
) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { connection, phone, otp } = event.body;

  const verifyData = await verifyOTP(phone, otp);

  if (verifyData.verify === false) {
    return {
      status: 'success',
      message: verifyData.message,
    };
  } else {
    const currentUserDb = await dynamodb
      .get({ TableName: TABLE_NAME, Key: { nickname: phone } })
      .promise()
      .catch(error => {
        throw Boom.badImplementation(error);
      });

    let token = '';
    if (currentUserDb.Item === undefined) {
      // signUn new User
      console.log('currentUserDb.Item === undefined');
      const password = await signUpClients(connection, phone);
      token = await signInClients(phone, password);
    } else {
      const password = currentUserDb.Item.password;
      token = await signInClients(phone, password);
      console.log('currentUserDb.Item !== undefined');
    }

    return {
      status: 'success',
      message: 'AuthClient successful',
      token,
    };
  }
};

export const clientAuth = middyfy(handler);
