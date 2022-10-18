import mysql from 'mysql2/promise';

const queryPhotosPhotographer = async (
  connection: mysql.Connection,
  nickname: string,
  albumId: number,
) => {
  const query = `SELECT p.photoId, p.imageLink, a.albumName  
      FROM photos AS p
      JOIN albums AS a ON p.albumId = a.albumId 
      JOIN photographers AS p2 ON a.photographerId = p2.photographerId
      WHERE a.albumId = '${albumId}' AND p2.nickname = '${nickname}'`;

  const [result, fields] = await connection.query(query);
  console.log('\n**** result ***', result, '\n**** fields ***', fields);

  return result;
};

export default queryPhotosPhotographer;
