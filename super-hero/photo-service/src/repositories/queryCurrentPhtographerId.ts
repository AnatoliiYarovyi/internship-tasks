import mysql from 'mysql2/promise';

const queryCurrentPhtographerId = async (
  connection: mysql.Connection,
  nickname: string,
) => {
  const query = `SELECT photographerId 
      FROM photographers 
      WHERE nickname = '${nickname}'`;

  const [result, fields] = await connection.query(query);

  return result[0].photographerId;
};

export default queryCurrentPhtographerId;
