import { drizzle } from 'drizzle-orm-pg/node';
import pg from 'pg';
const { Client: ClientDb } = pg;

import getBufferImg from './getBufferImg';
import resizePhotos from './resizePhotos';
import saveCurrentSelfie from './saveCurrentSelfie';
import addWatermarkToPhotos from './addWatermarkToPhotos';
import saveAlbumCover from './saveAlbumCover';

import { Photographer } from '../../repositories/Photographer';
import { Client } from '../../repositories/Client';

const { STAGE, DATABASE_URL } = process.env;

const handler = async (event: any) => {
  const clientDb = new ClientDb({
    connectionString: DATABASE_URL,
    ssl: true,
  });
  await clientDb.connect();
  const connection = drizzle(clientDb);

  const photographer = new Photographer(connection);
  const client = new Client(connection);

  // console.log('\n*** This is Event after save S3 ***', JSON.stringify(event));
  // console.log('\nimage path: ', event.Records[0].s3.object.key);

  const key: string = event.Records[0].s3.object.key;

  if (key.includes('Demo') || key.includes('Small')) {
    console.log('Stoped function saveChangePhotos');
    return;
  }
  const photoLink = `https://photos-from-photo-service-${STAGE}.s3.amazonaws.com/${key}`;
  const arrKeyData = key.split('/');
  const permission = arrKeyData[0];
  const photoName = arrKeyData.slice(-1)[0].replace('.jpeg', '');

  switch (permission) {
    case 'clients':
      await client.updateSelfiesLoaded(photoName);
      const nickname = arrKeyData[2];
      await saveCurrentSelfie(nickname, photoLink);
      break;

    case 'photographers':
      const photoId = await photographer.getCurrentPhotoId(photoName);

      await photographer.updatePhotosLoaded(photoId);

      const bufferPhoto = await getBufferImg(photoLink);

      const dataSmallPhoto = await resizePhotos(bufferPhoto, key);

      const dataDemoPhoto = await addWatermarkToPhotos(bufferPhoto, key);
      const bufferDemoPhoto = await getBufferImg(dataDemoPhoto.Location);
      const dataSmallDemoPhoto = await resizePhotos(
        bufferDemoPhoto,
        dataDemoPhoto.Key,
      );

      await photographer.updatePhotoLinks(
        photoId,
        dataSmallPhoto.Location,
        dataDemoPhoto.Location,
        dataSmallDemoPhoto.Location,
      );

      await saveAlbumCover(photographer, photoId, dataSmallPhoto.Location);

      break;

    default:
      console.log('Invalid permission type');
  }
};

export const changeSavePhotos = handler;
