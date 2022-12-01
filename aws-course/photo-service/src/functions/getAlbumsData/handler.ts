import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import queryAlbumsPhotographer from '../../repositories/queryAlbumsPhotographer';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
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
      break;

    case 'photographer':
      dataDB = await queryAlbumsPhotographer(connection, nickname);
      // console.log('\n*** allAlbumsName: ****', dataDB);
      break;

    default:
      throw Boom.badData('Invalid permission type');
  }

  return {
    status: 'success',
    data: {
      albums: dataDB,
    },
  };
};

export const getAlbumsData = middyfy(handler);
