import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';

const { USER_POOL_ID, CLIENT_ID } = process.env;

const handler = async (
  event: EventBody<{ nickname: string; password: string }>,
) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const { nickname, password } = event.body;

  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: nickname,
      PASSWORD: password,
    },
  };
  const response = await cognito
    .adminInitiateAuth(params)
    .promise()
    .catch(error => {
      throw Boom.unauthorized(error);
    });

  return {
    status: 'success',
    message: 'SignIn successful',
    token: response.AuthenticationResult.IdToken,
  };
};

export const signIn = middyfy(handler, validateSchemas);
