import AWS from 'aws-sdk';
import { v4 } from 'uuid';
// import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import writeClientsSelfieLink from '../../repositories/writeClientsSelfieLink';
import writeNewPhoto from '../../repositories/writeNewPhoto';
import writeClientPhoto from '../../repositories/writeClientPhoto';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

const handler = async (event: Event) => {
  const s3 = new AWS.S3();

  const nickname = event.requestContext.authorizer.claims.nickname;
  const { permission } = event.queryStringParameters;
  const { connection } = event.body;

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
      ['content-length-range', 0, 10000000], // content length restrictions: 0-10MB
      ['starts-with', '$Content-Type', ''], // content type restriction
      { acl: 'public-read' },
    ],
  };

  const presignedPostData = {
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
  const imageLink = `https://photos-from-photo-service.s3.amazonaws.com/${params.Fields.key}`;

  switch (permission) {
    case 'client':
      await writeClientsSelfieLink(
        connection,
        nickname,
        newImageName,
        imageLink,
      );
      break;

    case 'photographer':
      const { clientId, albumId } = event.queryStringParameters;
      const rows = await writeNewPhoto(
        connection,
        newImageName,
        imageLink,
        albumId,
      );
      const photoId = rows['insertId'];

      if (clientId) {
        const arrClientId = clientId.split(', ');

        for (let i = 0; i < arrClientId.length; i += 1) {
          console.log(arrClientId[i]);
          const clientId = +arrClientId[i];
          await writeClientPhoto(connection, clientId, photoId);
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
