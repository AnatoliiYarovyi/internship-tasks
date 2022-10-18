import AWS from 'aws-sdk';
import Boom from '@hapi/boom';
import mysql from 'mysql2/promise';
import sharp from 'sharp';
import axios from 'axios';

import getBufferImg from './getBufferImg';
import updatePhotosLoaded from '../../repositories/updatePhotosLoaded';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

const handler = async (event: any) => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  console.log('\n*** This is Event after save S3 ***', JSON.stringify(event));
  // console.log('\nimage path: ', event.Records[0].s3.object.key);

  const key: string = event.Records[0].s3.object.key;
  const imageLink = `https://photos-from-photo-service.s3.amazonaws.com/${key}`;
  const logoLink =
    'https://photos-from-photo-service.s3.amazonaws.com/watermarks/photoDrop.png';
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
      const s3 = new AWS.S3();
      await updatePhotosLoaded(connection, imageName);
      try {
        const bufferPhoto = await getBufferImg(imageLink);
        const bufferLogo = await getBufferImg(logoLink);
        // const getPhoto = await axios({
        //   method: 'get',
        //   url: imageLink,
        //   responseType: 'arraybuffer',
        // });
        // const bufferPhoto = Buffer.from(getPhoto.data, 'base64');

        // const getLogo = await axios({
        //   method: 'get',
        //   url: imageLink,
        //   responseType: 'arraybuffer',
        // });
        // const bufferLogo = Buffer.from(getLogo.data, 'base64');

        const sharpBuffer = await sharp(bufferPhoto)
          .composite([{ input: bufferLogo }])
          .toBuffer();

        const keyDemo = key.replace('.jpeg', 'Demo.jpeg');
        const params = {
          Bucket: BUCKET_NAME,
          Key: keyDemo,
          Body: sharpBuffer,
        };

        s3.upload(params, function (err, data) {
          console.log('\n*** err ***', err, '\n*** data ***', data);
        }).promise();
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      console.log('Invalid permission type');
  }

  await connection.end(err => {
    if (err) {
      console.log('\n*** endConnect --> err: ***', err);
      return err;
    } else {
      console.log('\n*** connect --> END ***');
    }
  });
};

export const saveChangePhotos = handler;
