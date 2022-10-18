import mysql from 'mysql2/promise';

const queryAlbumsPhotographer = async (
  connection: mysql.Connection,
  nickname: string,
) => {
  const query = `SELECT a.albumId, a.albumName, a.location, a.specifiedTimestamp 
FROM albums AS a 
JOIN photographers AS p ON a.photographerId = p.photographerId  
WHERE p.nickname = '${nickname}'`;

  const [result, fields] = await connection.query(query);
  console.log('\n**** result ***', result, '\n**** fields ***', fields);

  return result;
};

export default queryAlbumsPhotographer;
