import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import { v4 } from 'uuid';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';
import botSendOTP from '../botSendOTP/botSendOTP';

const TABLE_NAME = process.env.CLIENTS_OTP_TABLE_NAME;

const handler = async (
  event: EventBody<{
    phone: string;
  }>,
) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { phone } = event.body;

  const dataOTP = await dynamodb
    .get({ TableName: TABLE_NAME, Key: { phone } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  if (dataOTP.Item.numberOfResend === 1) {
    return {
      status: 'success',
      message: 'error resendOTP > 1',
    };
  } else {
    // Generate a new secret login code write to DB and send it to the user
    // const secretLoginCode = Date.now().toString().slice(-4); // this is temporary for ease of development

    const newOTP = {
      id: v4(),
      phone,
      // OTP: secretLoginCode, // this is temporary for ease of development
      otp: 111111, // this is temporary for ease of development
      numberOfResend: dataOTP.Item.numberOfResend + 1,
      created: dataOTP.Item.created,
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
      message: 'resendOTP successful',
      resendOTP: newOTP.otp,
    };
  }
};

export const resendOTP = middyfy(handler, validateSchemas);
