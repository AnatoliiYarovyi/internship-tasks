import mysql from 'mysql2/promise';

const updateClientsData = async (
  connection: mysql.Connection,
  phone: string,
  fullName: string,
  email: string,
) => {
  const writeData =
    'UPDATE `clients` SET clients.fullName = ?, clients.email = ? WHERE clients.phone = ?;';

  const [rows, fields] = await connection.execute(writeData, [
    fullName,
    email,
    phone,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updateClientsData;
