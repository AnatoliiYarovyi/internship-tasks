import mysql from 'mysql2/promise';

const updateUnlockedPhoto = async (
  connection: mysql.Connection,
  photoId: number,
  nickName: string,
) => {
  const writeData =
    'UPDATE `clients_photos` AS cp JOIN `clients` AS c ON cp.clientId = c.clientId SET cp.unlockedPhoto = 1 WHERE cp.photoId = ? AND c.phone = ?;';

  const [rows, fields] = await connection.execute(writeData, [
    photoId,
    nickName,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updateUnlockedPhoto;
