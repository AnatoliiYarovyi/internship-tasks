const axios = require('axios');
const { TELEGRAM_URL } = process.env;

const { getAllCoins } = require('../coin');

const listRecentCommand = async (res, chat_id) => {
  const data = await getAllCoins();
  let text = `These are 20 popular crypto coins and their average price per hour.`;
  await data.forEach(({ symbol, price_average }) => {
    let price = Number(price_average).toFixed(2);
    text += `\n/${symbol} = ${price}$`;
  });
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

module.exports = listRecentCommand;
