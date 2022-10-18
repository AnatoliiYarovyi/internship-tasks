import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import queryAlbumsPhotographer from '../../repositories/queryAlbumsPhotographer';

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;

  const currentUserDb = await dynamodb
    .get({ TableName: 'UsersPhotoService', Key: { nickname: nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  // console.log('\n*** currentUserDb: ***', currentUserDb);

  const { permission } = currentUserDb.Item;
  let dataDB = null;
  switch (permission) {
    case 'client':
      break;

    case 'photographer':
      dataDB = await queryAlbumsPhotographer(connection, nickname);
      console.log('\n*** allAlbumsName: ****', dataDB);
      break;

    default:
      throw Boom.badData('Invalid permission type');
  }

  // if (dataDB[0] !== undefined) {
  //   const uniqueAlbums: string[] = dataDB.reduce(
  //     (
  //       acc: string[],
  //       el: {
  //         photoId: number;
  //         albumId: number;
  //         albumName: string;
  //         location: string;
  //       },
  //       i,
  //       arr,
  //     ) => {
  //       acc.push(el.albumName);
  //       if (i === arr.length - 1) {
  //         acc = [...new Set(acc)];
  //       }
  //       return acc;
  //     },
  //     [],
  //   );

  //   const albumsAndLocations = uniqueAlbums.reduce((acc, el: string) => {
  //     const local = dataDB.find(elem => elem.albumName === el);
  //     acc.push({
  //       albumId: local.albumId,
  //       albumName: local.albumName,
  //       location: local.location,
  //     });

  //     return acc;
  //   }, []);

  //   dataDB = albumsAndLocations;
  // }

  return {
    status: 'success',
    data: {
      albums: dataDB,
    },
  };
};

export const getAlbumsData = middyfy(handler);
