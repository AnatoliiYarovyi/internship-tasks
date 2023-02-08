import mysql from 'mysql2/promise';

const writePhotographerToDB = async (
  connection: mysql.Connection,
  nickname: string,
  fullName: string = null,
  email: string = null,
  phone: string = null,
) => {
  const writeData =
    'INSERT INTO `photographers` (nickname, fullName, email, phone) VALUES (?, ?, ?, ?)';

  const [rows, fields] = await connection.execute(writeData, [
    nickname,
    fullName,
    email,
    phone,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default writePhotographerToDB;
