import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import { v4 } from 'uuid';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
// import validateSchemas from './validateSchema';
import botSendOTP from '../botSendOTP/botSendOTP';

const handler = async (event: EventBody<{ phone: string }>) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { phone } = event.body;
  // Generate a new secret login code write to DB and send it to the user
  // const secretLoginCode = Date.now().toString().slice(-4);

  const newOTP = {
    id: v4(),
    phone,
    // otp: +secretLoginCode,
    otp: 111111, // this is temporary for ease of development
    numberOfResend: 0,
    created: new Date().getTime(),
  };
  await dynamodb
    .put({ TableName: 'ClientsOTP', Item: newOTP })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  await botSendOTP(phone, newOTP.otp);

  return {
    status: 'success',
    message: 'generateOTP successful',
  };
};

// export const generateOTP = middyfy(handler, validateSchemas);
export const generateOTP = middyfy(handler);
