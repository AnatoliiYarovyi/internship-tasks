import mysql from 'mysql2/promise';

const queryPhotographersData = async (connection: mysql.Connection) => {
  const query = `SELECT p.photographerId AS id, p.nickname, p.fullName, p.email
                FROM photographers AS p;`;

  const [result, fields] = await connection.query(query);

  return result;
};

export default queryPhotographersData;
