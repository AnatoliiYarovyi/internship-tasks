import mysql from 'mysql2/promise';

const queryPhotosClientByAlbum = async (
  connection: mysql.Connection,
  phone: string,
  albumId: number,
) => {
  const query = `SELECT p.photoId, a.albumName, p.name AS photoName, p.photoLink
FROM clients_photos AS cp
JOIN clients AS c ON cp.clientId = c.clientId 
JOIN photos AS p ON cp.photoId = p.photoId
JOIN albums AS a ON p.albumId = a.albumId 
WHERE c.phone = ${phone} AND a.albumId = '${albumId}';`;

  const [result, fields] = await connection.query(query);

  return result;
};

export default queryPhotosClientByAlbum;
