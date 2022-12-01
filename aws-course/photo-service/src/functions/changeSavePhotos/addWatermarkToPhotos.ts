import AWS from 'aws-sdk';
import sharp from 'sharp';

import getBufferImg from './getBufferImg';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const { STAGE } = process.env;
const logoLink =
  `https://photos-from-photo-service-${STAGE}.s3.amazonaws.com/watermarks/photoDrop.png`;

const addWatermarkToPhotos = async (bufferPhoto: Buffer, key: string) => {
  const s3 = new AWS.S3();

  const bufferLogo = await getBufferImg(logoLink);

  const sharpBuffer = await sharp(bufferPhoto)
    .composite([{ input: bufferLogo }])
    .toBuffer();

  const path = key.replace('.jpeg', 'Demo.jpeg');
  const params = {
    ACL: 'public-read',
    Body: sharpBuffer,
    ContentType: 'image/jpeg',
    Bucket: BUCKET_NAME,
    Key: path,
  };
  const dataDemoPhoto = await s3.upload(params).promise();

  return dataDemoPhoto;
};

export default addWatermarkToPhotos;
