const axios = require('axios');
const { TELEGRAM_URL } = process.env;

const addUser = require('./addUser');

const startCommand = async (res, chat_id, userName) => {
  await addUser(chat_id, userName);
  const text = `Hi, ${userName || 'my friend'}! Type /help to see what I can!`;
  axios
    .post(`${TELEGRAM_URL}/sendMessage`, {
      chat_id,
      text,
    })
    .then(response => {
      res.status(201).json({
        status: 'success',
        code: 201,
      });
    })
    .catch(err => res.send(err));
};

module.exports = startCommand;
