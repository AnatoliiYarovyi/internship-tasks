import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import writeNewAlbum from '../../repositories/writeNewAlbum';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection, albumName, location, specifiedTimestamp } = event.body;

  const albumId = await writeNewAlbum(
    connection,
    nickname,
    albumName,
    location,
    specifiedTimestamp,
  );

  return {
    status: 'success',
    data: { albumId },
  };
};

export const createNewAlbum = middyfy(handler);
