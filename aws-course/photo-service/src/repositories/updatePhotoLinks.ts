import mysql from 'mysql2/promise';

const updatePhotoLinks = async (
  connection: mysql.Connection,
  photoName: string,
  smallPhotoLink: string,
  demoPhotoLink: string,
  smallDemoPhotoLink: string,
) => {
  const writeData =
    'UPDATE `photos` AS p SET p.smallPhotoLink = ?, p.demoPhotoLink = ?, p.smallDemoPhotoLink = ? WHERE p.name = ?;';

  const [rows, fields] = await connection.execute(writeData, [
    smallPhotoLink,
    demoPhotoLink,
    smallDemoPhotoLink,
    photoName,
  ]);
  console.log('\n**** rows ***', rows, '\n**** fields ***', fields);
};

export default updatePhotoLinks;
