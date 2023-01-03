import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Album, Event } from '../../interface/interface';

import { Client } from '../../repositories/Client';
import { Photographer } from '../../repositories/Photographer';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const { STAGE } = process.env;

const handler = async (event: Event) => {
  const s3 = new AWS.S3();
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { permission } = event.queryStringParameters;
  const { connection } = event.body;
  const client = new Client(connection);
  const photographer = new Photographer(connection);

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
      await client
        .writeClientsSelfieLink(nickname, newImageName, imageLink)
        .catch(error => {
          throw Boom.badImplementation(error);
        });
      break;

    case 'photographer':
      const { clientId, albumId } = event.queryStringParameters;
      await photographer
        .writeNewPhoto(newImageName, imageLink, albumId)
        .catch(error => {
          throw Boom.badImplementation(error);
        });
      const photoId = await photographer
        .getCurrentPhotoId(newImageName)
        .catch(error => {
          throw Boom.badImplementation(error);
        });

      if (clientId) {
        const arrClientId = clientId.split(', ');

        for (let i = 0; i < arrClientId.length; i += 1) {
          const clientId = +arrClientId[i];

          /* write data to table client_photo */
          await photographer
            .writeClientPhotoById(clientId, photoId, albumId)
            .catch(error => {
              throw Boom.badImplementation(error);
            });

          /* write data to table client_album */
          const allAlbums: Album[] = await client.getAlbumsClientById(clientId);
          allAlbums.map(async el => {
            if (el.id !== albumId) {
              await client.writeClientsAlbums(clientId, albumId);
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
