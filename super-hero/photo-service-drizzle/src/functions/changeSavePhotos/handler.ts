import { drizzle } from 'drizzle-orm-pg/node';
import pg from 'pg';
const { Client: ClientDb } = pg;

import getBufferImg from './getBufferImg';
import resizePhotos from './resizePhotos';
import saveCurrentSelfie from './saveCurrentSelfie';
import addWatermarkToPhotos from './addWatermarkToPhotos';

import { Photos } from '../../data/repositories/photographer/Photos';
import { Selfies } from '../../data/repositories/client/Selfies';

const { STAGE, DATABASE_URL } = process.env;

const handler = async (event: any) => {
  const clientDb = new ClientDb({
    connectionString: DATABASE_URL,
    ssl: true,
  });
  await clientDb.connect();
  const connection = drizzle(clientDb);

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
      const selfies = new Selfies(connection);
      await selfies.updateSelfiesLoaded(photoName);
      const nickname = arrKeyData[2];
      await saveCurrentSelfie(nickname, photoLink);
      break;

    case 'photographers':
      const photos = new Photos(connection);
      const photoId = await photos.getCurrentPhotoId(photoName);
      await photos.updatePhotosLoaded(photoId);

      const bufferPhoto = await getBufferImg(photoLink);

      const dataSmallPhoto = await resizePhotos(bufferPhoto, key);
      const dataDemoPhoto = await addWatermarkToPhotos(bufferPhoto, key);
      const bufferDemoPhoto = await getBufferImg(dataDemoPhoto.Location);
      const dataSmallDemoPhoto = await resizePhotos(
        bufferDemoPhoto,
        dataDemoPhoto.Key,
      );

      await photos.updatePhotoLinks(
        photoId,
        dataSmallPhoto.Location,
        dataDemoPhoto.Location,
        dataSmallDemoPhoto.Location,
      );

      break;

    default:
      console.log('Invalid permission type');
  }
};

export const changeSavePhotos = handler;
