import type { Callback } from 'aws-lambda';

exports.handler = async (event: any, __, callback: Callback) => {
  // Confirm the user
  event.response.autoConfirmUser = true;

  // Set the email as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('email')) {
    event.response.autoVerifyEmail = true;
  }

  // Return to Amazon Cognito
  callback(null, event);
};
