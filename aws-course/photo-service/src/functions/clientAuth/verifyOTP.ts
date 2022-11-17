import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

const verifyOTP = async (phone: string, otp: string) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let verify: boolean = false;
  let message: string = '';

  const dataOTP = await dynamodb
    .get({ TableName: 'ClientsOTP', Key: { phone } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  if (dataOTP.Item.otp !== otp) {
    message = 'One time password failed verification.';
    return { verify, message };
  }

  const currentTime = new Date().getTime();
  const timeOfCreatedOTP: number = dataOTP.Item.created;
  const lifetimeOTP = currentTime - timeOfCreatedOTP;

  if (lifetimeOTP > 180000) {
    message = 'One time password has expired';
  } else if (dataOTP.Item.otp === otp) {
    verify = true;
    message = 'otp verification passed';
  }

  return { verify, message };
};

export default verifyOTP;
