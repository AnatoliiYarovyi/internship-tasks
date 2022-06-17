const User = require('../../models/user');

const addUser = async (chatId, userName) => {
  try {
    const user = await User.findOne({ chatId });
    if (user) {
      console.log('This chat data is in the database!');
    } else {
      await User.create({
        chatId,
        user: userName,
        coin: [],
      });
      console.log('data ok');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = addUser;
