import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Client } from '../../repositories/Client';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;
  const client = new Client(connection);

  const albums = await client.getAlbumsClient(nickname);
  const photos = await client.getPhotosClient(nickname);

  return {
    status: 'success',
    data: { albums, photos },
  };
};

export const getAlbumsAndPhotos = middyfy(handler);
