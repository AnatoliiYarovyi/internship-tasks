import type { Callback } from 'aws-lambda';

exports.handler = async (event: any, __, callback: Callback) => {
  // Confirm the user
  event.response.autoConfirmUser = true;
  console.log('\n*** This is PreSineUP ***', event);

  // Return to Amazon Cognito
  callback(null, event);
};
