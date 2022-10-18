import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import {
  AdminInitiateAuthRequest,
  AdminInitiateAuthResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';

const signInClients = async (phone: string, password: string) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const { user_pool_id, client_id } = process.env;

  if (!user_pool_id && !client_id) {
    throw Boom.badImplementation('Error with UserPoolId or ClientId');
  } else if (user_pool_id && client_id) {
    const params: AdminInitiateAuthRequest = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: user_pool_id,
      ClientId: client_id,
      AuthParameters: {
        USERNAME: phone,
        PASSWORD: password,
      },
    };

    const response: AdminInitiateAuthResponse = await cognito
      .adminInitiateAuth(params)
      .promise()
      .catch(error => {
        throw Boom.unauthorized(error);
      });

    if (response.AuthenticationResult !== undefined) {
      const token = response.AuthenticationResult.IdToken;
      return token;
    }
  }
};

export default signInClients;
