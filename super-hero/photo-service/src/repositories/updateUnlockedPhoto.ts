import mysql from 'mysql2/promise';

const updateUnlockedPhoto = async (
  connection: mysql.Connection,
  albumId: number,
  nickName: string,
) => {
  const writeData =
    'UPDATE `clients_photos` AS cp JOIN `clients` AS c ON cp.clientId = c.clientId SET cp.unlockedPhoto = 1 WHERE cp.albumId = ? AND c.phone = ?;';

  const [rows, fields] = await connection.execute(writeData, [
    albumId,
    nickName,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updateUnlockedPhoto;
