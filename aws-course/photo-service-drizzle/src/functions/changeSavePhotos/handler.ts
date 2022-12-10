import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';

import getBufferImg from './getBufferImg';
import resizePhotos from './resizePhotos';
import saveCurrentSelfie from './saveCurrentSelfie';
import addWatermarkToPhotos from './addWatermarkToPhotos';

import updatePhotoLinks from '../../repositories/updatePhotoLinks';
import updatePhotosLoaded from '../../repositories/updatePhotosLoaded';
import updateSelfiesLoaded from '../../repositories/updateSelfiesLoaded';
import saveAlbumCover from './saveAlbumCover';
import queryCurrentPhotoId from '../../repositories/queryCurrentPhotoId';

const { STAGE, DATABASE_URL } = process.env;

const handler = async (event: any) => {
  const connection = await mysql.createConnection(DATABASE_URL);

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
      await updateSelfiesLoaded(connection, photoName);
      const nickname = arrKeyData[2];
      await saveCurrentSelfie(nickname, photoLink);
      break;

    case 'photographers':
      const photoId = await queryCurrentPhotoId(connection, photoName);

      await updatePhotosLoaded(connection, photoId);

      const bufferPhoto = await getBufferImg(photoLink);

      const dataSmallPhoto = await resizePhotos(bufferPhoto, key);

      const dataDemoPhoto = await addWatermarkToPhotos(bufferPhoto, key);
      const bufferDemoPhoto = await getBufferImg(dataDemoPhoto.Location);
      const dataSmallDemoPhoto = await resizePhotos(
        bufferDemoPhoto,
        dataDemoPhoto.Key,
      );

      await updatePhotoLinks(
        connection,
        photoId,
        dataSmallPhoto.Location,
        dataDemoPhoto.Location,
        dataSmallDemoPhoto.Location,
      );

      await saveAlbumCover(connection, photoId, dataSmallPhoto.Location);

      break;

    default:
      console.log('Invalid permission type');
  }

  await connection.end(err => {
    if (err) {
      throw Boom.badImplementation(err);
    } else {
      console.log('\n*** connect --> END ***');
    }
  });
};

export const changeSavePhotos = handler;
