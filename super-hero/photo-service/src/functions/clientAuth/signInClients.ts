import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import {
  AdminInitiateAuthRequest,
  AdminInitiateAuthResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';

const { USER_POOL_ID, CLIENT_ID } = process.env;

const signInClients = async (phone: string, password: string) => {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  if (!USER_POOL_ID && !CLIENT_ID) {
    throw Boom.badImplementation('Error with UserPoolId or ClientId');
  } else if (USER_POOL_ID && CLIENT_ID) {
    const params: AdminInitiateAuthRequest = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
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
