import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Photos } from '../../data/repositories/photographer/Photos';
import { Clients_Photos } from '../../data/repositories/client/Clients_Photos';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { albumId } = event.queryStringParameters;
  const { connection } = event.body;
  const photos = new Photos(connection);
  const clients_photos = new Clients_Photos(connection);

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
      dataDB = await clients_photos.getPhotosByAlbumId(nickname, albumId);
      break;

    case 'photographer':
      dataDB = await photos.getPhotosByAlbumId(nickname, albumId);
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
