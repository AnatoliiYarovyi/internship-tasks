import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { EventBody } from '../../interface/interface';
import validateSchemas from './validateSchema';

const handler = async (
  event: EventBody<{ nickname: string; password: string }>,
) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const { nickname, password } = event.body;
  const { user_pool_id, client_id } = process.env;

  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    UserPoolId: user_pool_id,
    ClientId: client_id,
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
