import mysql from 'mysql2/promise';

const queryCurrentAlbumId = async (
  connection: mysql.Connection,
  albumName: string,
) => {
  const query = `SELECT albumId 
      FROM albums 
      WHERE albumName = '${albumName}'`;

  const [result, fields] = await connection.query(query);

  return result[0].albumId;
};

export default queryCurrentAlbumId;
