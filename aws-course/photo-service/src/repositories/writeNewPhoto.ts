import mysql from 'mysql2/promise';

const writeNewPhoto = async (
  connection: mysql.Connection,
  name: string,
  imageLink: string,
  albumId: number,
) => {
  const writePhotoData =
    'INSERT INTO `photos` (name, imageLink, albumId) VALUES (?, ?, ?)';

  const [rows, fields] = await connection.execute(writePhotoData, [
    name,
    imageLink,
    albumId,
  ]);
  // console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
  return rows;
};

export default writeNewPhoto;
