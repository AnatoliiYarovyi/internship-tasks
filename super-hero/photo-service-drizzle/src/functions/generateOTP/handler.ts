import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import { v4 } from 'uuid';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
// import validateSchemas from './validateSchema'; // this is temporary for ease of development
import botSendOTP from '../botSendOTP/botSendOTP';

const TABLE_NAME = process.env.CLIENTS_OTP_TABLE_NAME;

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
    .put({ TableName: TABLE_NAME, Item: newOTP })
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

// export const generateOTP = middyfy(handler, validateSchemas); // this is temporary for ease of development
export const generateOTP = middyfy(handler);