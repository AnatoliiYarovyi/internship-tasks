import mysql from 'mysql2/promise';

const updateAlbumData = async (
  connection: mysql.Connection,
  albumId: string,
  dataSmallPhoto: string,
) => {
  const writeData =
    'UPDATE `albums` SET albums.albumCoverLink  = ? WHERE albums.albumId = ?;';

  const [rows, fields] = await connection.execute(writeData, [
    dataSmallPhoto,
    albumId,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updateAlbumData;
