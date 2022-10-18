import mysql from 'mysql2/promise';

const updatePhotosLoaded = async (
  connection: mysql.Connection,
  name: string,
) => {
  const writeData =
    'UPDATE `photos` SET photos.loaded = 1 WHERE photos.name = ?;';

  const [rows, fields] = await connection.execute(writeData, [name]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updatePhotosLoaded;
