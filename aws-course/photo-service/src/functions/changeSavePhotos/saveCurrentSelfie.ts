import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

const saveCurrentSelfie = async (nickname: string, selfieLink: string) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const currentUserDb = await dynamodb
    .get({ TableName: 'UsersPhotoService', Key: { nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  currentUserDb.Item.selfieLink = selfieLink;

  await dynamodb
    .put({ TableName: 'UsersPhotoService', Item: currentUserDb.Item })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return;
};

export default saveCurrentSelfie;
