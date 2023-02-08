import mysql from 'mysql2/promise';

const writeClientPhoto = async (
  connection: mysql.Connection,
  clientId: number,
  photoId: number,
  albumId: number,
) => {
  const writeData =
    'INSERT INTO `clients_photos` (clientId, photoId, albumId) VALUES (?, ?, ?)';

  const [rows, fields] = await connection.execute(writeData, [
    clientId,
    photoId,
    albumId,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default writeClientPhoto;
