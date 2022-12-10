import mysql from 'mysql2/promise';

const queryCurrentPhotoId = async (
  connection: mysql.Connection,
  photoName: string,
) => {
  const query = `SELECT photoId 
      FROM photos 
      WHERE name = '${photoName}'`;

  const [result, fields] = await connection.query(query);

  return result[0].photoId;
};

export default queryCurrentPhotoId;
