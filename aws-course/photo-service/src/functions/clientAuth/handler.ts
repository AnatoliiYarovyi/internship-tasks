import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import verifyOTP from './verifyOTP';
import signUpClients from './signUpClients';
import signInClients from './signInClients';

const handler = async (
  event: EventBody<{
    connection: mysql.Connection;
    phone: string;
    otp: string;
  }>,
) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { connection, phone, otp } = event.body;

  console.log('\n*** clientAuth start ***');

  const verifyData = await verifyOTP(phone, otp);

  if (verifyData !== undefined && verifyData.verify === false) {
    return {
      status: 'success',
      message: verifyData.message,
    };
  } else {
    const currentUserDb = await dynamodb
      .get({ TableName: 'UsersPhotoService', Key: { nickname: phone } })
      .promise()
      .catch(error => {
        throw Boom.badImplementation(error);
      });

    // console.log('\n*** currentUserDb: ***', currentUserDb);

    let token: string | undefined = '';
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

export const clientAuth = middyfy(handler)