import mysql from 'mysql2/promise';

const writeClientsToDB = async (
  connection: mysql.Connection,
  phone: string,
) => {
  const writeData = 'INSERT INTO `clients` (phone) VALUES (?)';

  const [rows, fields] = await connection.execute(writeData, [phone]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default writeClientsToDB;
