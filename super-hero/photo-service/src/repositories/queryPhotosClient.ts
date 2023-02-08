import mysql from 'mysql2/promise';

const queryPhotosClient = async (
  connection: mysql.Connection,
  phone: string,
) => {
  const query = `SELECT p.photoId, a.albumName, p.name AS photoName, cp.unlockedPhoto, p.photoLink, p.smallPhotoLink, p.demoPhotoLink, p.smallDemoPhotoLink
FROM clients_photos AS cp
JOIN clients AS c ON cp.clientId = c.clientId 
JOIN photos AS p ON cp.photoId = p.photoId
JOIN albums AS a ON p.albumId = a.albumId 
WHERE c.phone = ${phone} AND p.loaded  = 1`;

  const [result, fields] = await connection.query(query);

  return result;
};

export default queryPhotosClient;
