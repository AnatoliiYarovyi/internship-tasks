import mysql from 'mysql2/promise';

const updatePhotosLoaded = async (
  connection: mysql.Connection,
  photoId: number,
) => {
  const writeData =
    'UPDATE `photos` SET photos.loaded = 1 WHERE photos.photoId = ?;';

  const [rows, fields] = await connection.execute(writeData, [photoId]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updatePhotosLoaded;
