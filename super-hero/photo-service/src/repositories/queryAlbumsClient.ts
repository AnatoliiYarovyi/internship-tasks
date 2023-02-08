import mysql from 'mysql2/promise';

const queryAlbumsClient = async (
  connection: mysql.Connection,
  phone: string,
) => {
  const query = `SELECT a.albumId, a.albumName, a.location, a.specifiedTimestamp, a.albumCoverLink
FROM clients_photos AS cp
JOIN clients AS c ON cp.clientId = c.clientId 
JOIN photos AS p ON cp.photoId = p.photoId
JOIN albums AS a ON p.albumId = a.albumId 
WHERE c.phone = '${phone}' 
GROUP BY a.albumId;`;

  const [result, fields] = await connection.query(query);
  console.log('\n**** result ***', result, '\n**** fields ***', fields);

  return result;
};

export default queryAlbumsClient;
