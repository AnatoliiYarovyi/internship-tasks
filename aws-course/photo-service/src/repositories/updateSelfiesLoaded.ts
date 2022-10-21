import mysql from 'mysql2/promise';

const updateSelfiesLoaded = async (
  connection: mysql.Connection,
  name: string,
) => {
  const writeData =
    'UPDATE `selfies` SET selfies.loaded = 1 WHERE selfies.name = ?;';

  const [rows, fields] = await connection.execute(writeData, [name]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updateSelfiesLoaded;
