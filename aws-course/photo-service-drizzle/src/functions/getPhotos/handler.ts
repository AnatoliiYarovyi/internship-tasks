import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Client } from '../../repositories/Client';
import { Photographer } from '../../repositories/Photographer';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { albumId } = event.queryStringParameters;
  const { connection } = event.body;
  const photographer = new Photographer(connection);
  const client = new Client(connection);

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
      dataDB = await client.getPhotosByAlbumId(nickname, albumId);
      break;

    case 'photographer':
      dataDB = await photographer.getPhotosByAlbumId(nickname, albumId);
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
