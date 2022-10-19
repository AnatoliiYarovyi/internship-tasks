import AWS from 'aws-sdk';
import sharp from 'sharp';

import getBufferImg from './getBufferImg';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const logoLink =
  'https://photos-from-photo-service.s3.amazonaws.com/watermarks/photoDrop.png';

const addWatermarkToPhoto = async (imageLink: string, key: string) => {
  const s3 = new AWS.S3();

  const bufferPhoto = await getBufferImg(imageLink);
  const bufferLogo = await getBufferImg(logoLink);

  const sharpBuffer = await sharp(bufferPhoto)
    .composite([{ input: bufferLogo }])
    .toBuffer();

  const keyDemo = key.replace('.jpeg', 'Demo.jpeg');
  const params = {
    ACL: 'public-read',
    Body: sharpBuffer,
    ContentType: 'image/jpeg',
    Bucket: BUCKET_NAME,
    Key: keyDemo,
  };
  const dataDemoPhoto = await s3.upload(params).promise();

  return dataDemoPhoto;
};

export default addWatermarkToPhoto;
