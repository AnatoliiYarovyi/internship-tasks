import mysql from 'mysql2/promise';
import queryCurrentClientId from './queryCurrentClientId';

const writeClientsSelfieLink = async (
  connection: mysql.Connection,
  phone: string,
  imageName: string,
  selfieLink: string,
) => {
  const clientId = await queryCurrentClientId(connection, phone);

  const writeData =
    'INSERT INTO `selfies` (name, selfieLink, clientId ) VALUES (?, ?, ?)';

  const [rows, fields] = await connection.execute(writeData, [
    imageName,
    selfieLink,
    clientId,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default writeClientsSelfieLink;
