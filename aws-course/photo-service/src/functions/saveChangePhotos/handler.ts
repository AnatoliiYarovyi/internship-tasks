import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';

import updatePhotosLoaded from '../../repositories/updatePhotosLoaded';
import addWatermarkToPhotos from './addWatermarkToPhotos';
import getBufferImg from './getBufferImg';
import resizePhotos from './resizePhotos';

const handler = async (event: any) => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  console.log('\n*** This is Event after save S3 ***', JSON.stringify(event));
  // console.log('\nimage path: ', event.Records[0].s3.object.key);

  const key: string = event.Records[0].s3.object.key;
  if (key.includes('Demo') || key.includes('Resize')) {
    console.log('Stoped function saveChangePhotos');
    return;
  }
  const imageLink = `https://photos-from-photo-service.s3.amazonaws.com/${key}`;
  const arrKeyData = key.split('/');
  const permission = arrKeyData[0];
  const imageName = arrKeyData.slice(-1)[0].replace('.jpeg', '');

  console.log(
    '\npermission',
    permission,
    '\nimageName',
    imageName,
    '\nimageLink',
    imageLink,
  );

  switch (permission) {
    case 'clients':
      // await writeClientsSelfieLink(
      //   connection,
      //   imageName,
      // );
      break;

    case 'photographers':
      await updatePhotosLoaded(connection, imageName);

      const bufferPhoto = await getBufferImg(imageLink);

      const dataSmallPhoto = await resizePhotos(bufferPhoto, key);

      const dataDemoPhoto = await addWatermarkToPhotos(bufferPhoto, key);
      const bufferDemoPhoto = await getBufferImg(dataDemoPhoto.Location);
      const dataSmallDemoPhoto = await resizePhotos(
        bufferDemoPhoto,
        dataDemoPhoto.Key,
      );

      console.log('\n*** dataSmallPhoto ***', JSON.stringify(dataSmallPhoto));
      console.log('\n*** dataDemoPhoto ***', JSON.stringify(dataDemoPhoto));
      console.log(
        '\n*** dataSmallDemoPhoto ***',
        JSON.stringify(dataSmallDemoPhoto),
      );

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

export const saveChangePhotos = handler;
