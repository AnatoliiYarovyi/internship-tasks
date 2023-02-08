import mysql from 'mysql2/promise';

const queryCurrentClientId = async (
  connection: mysql.Connection,
  phone: string,
) => {
  const query = `SELECT clientId 
      FROM clients 
      WHERE phone = '${phone}'`;

  const [result, fields] = await connection.query(query);

  return result[0].clientId;
};

export default queryCurrentClientId;
