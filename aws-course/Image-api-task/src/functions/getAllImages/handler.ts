import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

const handler = async (event: Event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const email = event.requestContext.authorizer.claims.email;

  const currentUserDb = await dynamodb
    .get({ TableName: 'Users', Key: { email: email } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });
  const userId = currentUserDb.Item.id;
  const queryScan = {
    TableName: 'Images',
    FilterExpression: 'idUser = :this_idUser',
    ExpressionAttributeValues: { ':this_idUser': userId },
  };
  const images = {
    imagesLink: {},
  };
  await dynamodb
    .scan(queryScan, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const { Items } = data;
        const imagesArr = Items.reduce((acc, el) => {
          acc.push({
            id: el.id,
            imageLink: el.imageLink,
          });
          return acc;
        }, []);

        return (images.imagesLink = imagesArr);
      }
    })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return {
    status: 'success',
    message: 'Get all images successful',
    userId,
    imageLinkArray: images.imagesLink,
  };
};

export const getAllImages = middyfy(handler);
