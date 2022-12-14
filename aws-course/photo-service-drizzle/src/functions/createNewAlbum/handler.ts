import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';

import { Photographer } from '../../repositories/Photographer';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection, albumName, location, specifiedTimestamp } = event.body;
  const photographer = new Photographer(connection);

  await photographer.writeNewAlbum(
    nickname,
    albumName,
    location,
    specifiedTimestamp,
  );

  const albumId = await photographer.getAlbumId(
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
