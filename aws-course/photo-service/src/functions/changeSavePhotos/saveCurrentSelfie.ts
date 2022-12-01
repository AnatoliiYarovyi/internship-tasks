import AWS from 'aws-sdk';
import Boom from '@hapi/boom';

const TABLE_NAME = process.env.USERS_TABLE_NAME;

const saveCurrentSelfie = async (nickname: string, selfieLink: string) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const currentUserDb = await dynamodb
    .get({ TableName: TABLE_NAME, Key: { nickname } })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  currentUserDb.Item.selfieLink = selfieLink;

  await dynamodb
    .put({ TableName: TABLE_NAME, Item: currentUserDb.Item })
    .promise()
    .catch(error => {
      throw Boom.badImplementation(error);
    });

  return;
};

export default saveCurrentSelfie;
