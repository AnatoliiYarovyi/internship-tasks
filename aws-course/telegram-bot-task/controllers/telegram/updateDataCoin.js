const axios = require('axios');
const { TELEGRAM_URL } = process.env;
const User = require('../../models/user');

const updateDataCoin = async (
  res,
  chat_id,
  symbol,
  callback_query_id,
  message_id,
) => {
  const { coin: userCoin } = await User.findOne({ chat_id });
  userCoin.includes(symbol)
    ? userCoin.splice(userCoin.indexOf(symbol), 1)
    : userCoin.push(symbol);

  await User.findOneAndUpdate({ chat_id }, { $set: { coin: userCoin } });

  let text = userCoin.includes(symbol)
    ? `/${symbol} add to favorite`
    : `/${symbol} remove from favorite`;

  axios.post(`${TELEGRAM_URL}/answerCallbackQuery`, {
    callback_query_id,
    text,
  });

  axios
    .post(`${TELEGRAM_URL}/editMessageText`, {
      chat_id,
      message_id,
      text,
    })
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => res.send(err));
};

module.exports = updateDataCoin;
