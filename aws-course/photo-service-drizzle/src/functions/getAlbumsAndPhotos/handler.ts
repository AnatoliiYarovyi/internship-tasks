import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Client } from '../../repositories/Client';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;
  const client = new Client(connection);

  const data = await client.getAlbumsAndClients(nickname);

  return {
    status: 'success',
    data: {
      albums: data.albumsWithCover,
      photos: data.sortPhotos,
    },
  };
};

export const getAlbumsAndPhotos = middyfy(handler);
