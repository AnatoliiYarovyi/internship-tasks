import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

const handler = async (event: Event) => {
  const s3 = new AWS.S3();
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const email = event.requestContext.authorizer.claims.email;

  const params = {
    Bucket: BUCKET_NAME,
    Fields: {
      key: `images/${v4()}.jpeg`,
      acl: 'public-read',
    },
    Conditions: [
      ['content-length-range', 0, 10000000], // content length restrictions: 0-10MB
      ['starts-with', '$key', 'images/'],
      ['starts-with', '$Content-Type', 'image/'], // content type restriction
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
  const imageS3Link = `https://s3.amazonaws.com/image.s3.bucket/${params.Fields.key}`;

  const currentUserDb = await dynamodb
    .get({ TableName: 'Users', Key: { email: email } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  const newImage = {
    id: v4(),
    idUser: currentUserDb.Item.id,
    imageLink: imageS3Link,
    created: new Date().toISOString(),
  };
  await dynamodb
    .put({ TableName: 'Images', Item: newImage })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return {
    status: 'success',
    message: `Email ${email} has been authorized`,
    s3Data: presignedPostData.data,
  };
};

export const getPresignedUrl = middyfy(handler);
