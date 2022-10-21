import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const nickname = event.requestContext.authorizer.claims.nickname;

  const currentUserDb = await dynamodb
    .get({ TableName: 'UsersPhotoService', Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return {
    status: 'success',
    message: 'getClientsData successful',
    data: {
      id: currentUserDb.Item.id,
      nickname: currentUserDb.Item.nickname,
      fullName: currentUserDb.Item.fullName,
      email: currentUserDb.Item.email,
      selfieLink: currentUserDb.Item.selfieLink,
    },
  };
};

export const getClientsData = middyfy(handler);
