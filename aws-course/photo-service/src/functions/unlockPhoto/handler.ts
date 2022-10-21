import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import updateUnlockedPhoto from '../../repositories/updateUnlockedPhoto';

const handler = async (event: Event) => {
  const { connection } = event.body;
  const { photoId } = event.queryStringParameters;
  const nickname = event.requestContext.authorizer.claims.nickname;

  await updateUnlockedPhoto(connection, photoId, nickname);

  return {
    status: 'success',
  };
};

export const unlockPhoto = middyfy(handler);
