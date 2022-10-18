import { middyfy } from '../../libs/lambda';
import { Event } from '../../interface/interface';
import queryPhotosClient from '../../repositories/queryPhotosClient';
import queryAlbumsClient from '../../repositories/queryAlbumsClient';

const handler = async (event: Event) => {
  const nickname = event.requestContext.authorizer.claims.nickname;
  const { connection } = event.body;

  const albums = await queryAlbumsClient(connection, nickname);
  const photos = await queryPhotosClient(connection, nickname);

  return {
    status: 'success',
    data: { albums, photos },
  };
};

export const getAlbumsAndPhotos = middyfy(handler);
