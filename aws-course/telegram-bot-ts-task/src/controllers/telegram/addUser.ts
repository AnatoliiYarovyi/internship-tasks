import User from '../../models/user';

const addUser = async (chatId: number, userName: string = 'User') => {
  try {
    const userData = await User.findOne({ chatId });
    if (userData) {
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

export default addUser;
