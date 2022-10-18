import mysql from 'mysql2/promise';

const writeClientPhoto = async (
  connection: mysql.Connection,
  clientId: number,
  photoId: number,
) => {
  const writeData =
    'INSERT INTO `clients_photos` (clientId, photoId) VALUES (?, ?)';

  const [rows, fields] = await connection.execute(writeData, [
    clientId,
    photoId,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default writeClientPhoto;
