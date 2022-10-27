import mysql from 'mysql2/promise';

import queryAlbumData from '../../repositories/queryAlbumData';
import updateAlbumData from '../../repositories/updateAlbumData';

const saveAlbumCover = async (
  connection: mysql.Connection,
  photoId: number,
  smallPhotoLink: string,
) => {
  const getAlbumData = await queryAlbumData(connection, photoId);

  const { albumId, albumCoverLink } = getAlbumData[0];
  if (albumCoverLink) {
    return console.log('album cover was not saved');
  } else {
    await updateAlbumData(connection, albumId, smallPhotoLink);
  }
  return;
};

export default saveAlbumCover;
