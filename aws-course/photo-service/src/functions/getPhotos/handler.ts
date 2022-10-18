import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import queryPhotosClientByAlbum from '../../repositories/queryPhotosClientByAlbum';
import queryPhotosPhotographer from '../../repositories/queryPhotosPhotographer';

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { albumId } = event.queryStringParameters;
  const { connection } = event.body;

  const currentUserDb = await dynamodb
    .get({ TableName: 'UsersPhotoService', Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  const { permission } = currentUserDb.Item;
  let dataDB = null;
  switch (permission) {
    case 'client':
      dataDB = await queryPhotosClientByAlbum(connection, nickname, albumId);
      break;

    case 'photographer':
      dataDB = await queryPhotosPhotographer(connection, nickname, albumId);
      break;

    default:
      console.log('Invalid permission type');
  }

  return {
    status: 'success',
    data: dataDB,
  };
};

export const getPhotos = middyfy(handler);
