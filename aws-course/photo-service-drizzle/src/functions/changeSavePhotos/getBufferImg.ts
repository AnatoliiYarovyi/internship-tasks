import axios from 'axios';

const getBufferImg = async (url: string) => {
  const getPhoto = await axios({
    method: 'get',
    url,
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(getPhoto.data, 'base64');

  return buffer;
};

export default getBufferImg;
