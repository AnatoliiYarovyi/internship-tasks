import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import sortClientPhotos from './sortClientPhotos';

import queryPhotosClientByAlbum from '../../repositories/queryPhotosClientByAlbum';
import queryPhotosPhotographer from '../../repositories/queryPhotosPhotographer';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { albumId } = event.queryStringParameters;
  const { connection } = event.body;

  const currentUserDb = await dynamodb
    .get({ TableName: TABLE_NAME, Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  const { permission } = currentUserDb.Item;
  let dataDB = null;
  switch (permission) {
    case 'client':
      const dataPhotos = await queryPhotosClientByAlbum(
        connection,
        nickname,
        albumId,
      );

      dataDB = sortClientPhotos(dataPhotos);
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
