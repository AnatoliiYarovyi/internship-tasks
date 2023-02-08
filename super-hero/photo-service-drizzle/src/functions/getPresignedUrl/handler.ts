import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Album, Event } from '../../interface/interface';

import { Selfies } from '../../data/repositories/client/Selfies';
import { Photos } from '../../data/repositories/photographer/Photos';
import { Clients_Photos } from '../../data/repositories/client/Clients_Photos';
import { Clients_Albums } from '../../data/repositories/client/Clients_Albums';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const { STAGE } = process.env;

const handler = async (event: Event) => {
  const s3 = new AWS.S3();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { permission } = event.queryStringParameters;
  const { connection } = event.body;

  const selfies = new Selfies(connection);
  const photos = new Photos(connection);
  const clients_photos = new Clients_Photos(connection);
  const clients_albums = new Clients_Albums(connection);

  const newImageName = v4();

  let keyPath: string = '';
  switch (permission) {
    case 'client':
      keyPath = `clients/selfie/${nickname}/${newImageName}.jpeg`;
      break;

    case 'photographer':
      const { albumId } = event.queryStringParameters;
      keyPath = `photographers/${nickname}/${albumId}/${newImageName}.jpeg`;
      break;

    default:
      console.log('Invalid permission type');
  }

  const params = {
    Bucket: BUCKET_NAME,
    Fields: {
      key: keyPath,
      acl: 'public-read',
    },
    Conditions: [
      ['content-length-range', 100, 10000000], // content length restrictions: 100kB-10MB
      ['starts-with', '$Content-Type', ''], // content type restriction
      { acl: 'public-read' },
    ],
  };

  const presignedPostData: any = {
    data: {},
  };
  s3.createPresignedPost(params, function (err, data) {
    if (err) {
      console.error('Presigning post data encountered an error: ', err);
    } else {
      console.log('The post data is: ', data);
      presignedPostData.data = data;
      return;
    }
  });
  const imageLink = `https://photos-from-photo-service-${STAGE}.s3.amazonaws.com/${params.Fields.key}`;

  switch (permission) {
    case 'client':
      await selfies
        .writeClientsSelfieLink(nickname, newImageName, imageLink)
        .catch(error => {
          throw Boom.badImplementation(error);
        });
      break;

    case 'photographer':
      const { clientId, albumId } = event.queryStringParameters;
      await photos
        .writeNewPhoto(newImageName, imageLink, albumId)
        .catch(error => {
          throw Boom.badImplementation(error);
        });
      const photoId = await photos
        .getCurrentPhotoId(newImageName)
        .catch(error => {
          throw Boom.badImplementation(error);
        });

      if (clientId) {
        const arrClientId = clientId.split(', ');

        for (let i = 0; i < arrClientId.length; i += 1) {
          const clientId = +arrClientId[i];

          /* write data to table client_photo */
          await clients_photos
            .writeClientPhotoById(clientId, photoId, albumId)
            .catch(error => {
              throw Boom.badImplementation(error);
            });

          /* write data to table client_album */
          const allAlbums: Album[] = await clients_albums.getAlbumsClientById(
            clientId,
          );
          allAlbums.map(async el => {
            if (el.id !== albumId) {
              await clients_albums.writeClientsAlbums(clientId, albumId);
            }
          });
        }
      }
      break;

    default:
      console.log('Invalid permission type');
  }

  return {
    status: 'success',
    s3Data: presignedPostData.data,
  };
};

export const getPresignedUrl = middyfy(handler);
