import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Clients_Albums } from '../../data/repositories/client/Clients_Albums';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;
  const clients_albums = new Clients_Albums(connection);

  const data = await clients_albums.getAlbumsAndPhotos(nickname);

  return {
    status: 'success',
    data: {
      albums: data.albumsWithCover,
      photos: data.sortPhotos,
    },
  };
};

export const getAlbumsAndPhotos = middyfy(handler);
