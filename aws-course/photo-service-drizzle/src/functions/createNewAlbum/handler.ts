import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Albums } from '../../data/repositories/photographer/Albums';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection, albumName, location, specifiedTimestamp } = event.body;
  const albums = new Albums(connection);

  await albums.writeNewAlbum(nickname, albumName, location, specifiedTimestamp);

  const albumId = await albums.getAlbumId(
    nickname,
    albumName,
    specifiedTimestamp,
  );

  return {
    status: 'success',
    data: { albumId },
  };
};

export const createNewAlbum = middyfy(handler);
