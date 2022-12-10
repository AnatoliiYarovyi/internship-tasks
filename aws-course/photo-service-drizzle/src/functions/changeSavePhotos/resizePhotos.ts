import AWS from 'aws-sdk';
import sharp from 'sharp';

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

const resizePhotos = async (buff: Buffer, key: string) => {
  const s3 = new AWS.S3();
  let path: string = '';

  if (key.includes('Demo')) {
    path = key.replace('Demo.jpeg', 'DemoSmall.jpeg');
  } else {
    path = key.replace('.jpeg', 'Small.jpeg');
  }

  const sharpBuffer = await sharp(buff).resize(150, 150).toBuffer();

  const params = {
    ACL: 'public-read',
    Body: sharpBuffer,
    ContentType: 'image/jpeg',
    Bucket: BUCKET_NAME,
    Key: path,
  };
  const dataPhoto = await s3.upload(params).promise();

  return dataPhoto;
};

export default resizePhotos;
