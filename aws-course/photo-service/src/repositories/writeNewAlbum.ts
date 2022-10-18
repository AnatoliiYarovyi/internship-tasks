import mysql from 'mysql2/promise';
import queryCurrentPhtographerId from './queryCurrentPhtographerId';

const writeNewAlbum = async (
  connection: mysql.Connection,
  nickname: string,
  albumName: string,
  location: string,
  specifiedTimestamp: any,
) => {
  const photographerId: number = await queryCurrentPhtographerId(
    connection,
    nickname,
  );

  const writeData =
    'INSERT INTO `albums` (albumName, location, specifiedTimestamp, photographerId) VALUES (?, ?, ?, ?)';

  const [rows, fields] = await connection.execute(writeData, [
    albumName,
    location,
    +specifiedTimestamp,
    photographerId,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
  return rows['insertId'];
};

export default writeNewAlbum;
