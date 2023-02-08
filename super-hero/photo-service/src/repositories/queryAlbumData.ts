import mysql from 'mysql2/promise';

const queryAlbumsData = async (
  connection: mysql.Connection,
  photoId: number,
) => {
  const query = `SELECT a.albumId, a.albumName, a.albumCoverLink 
 FROM photos AS p
 JOIN albums AS a ON p.albumId = a.albumId 
 WHERE p.photoId = '${photoId}';`;

  const [result, fields] = await connection.query(query);
  console.log('\n**** result ***', result, '\n**** fields ***', fields);

  return result;
};

export default queryAlbumsData;
