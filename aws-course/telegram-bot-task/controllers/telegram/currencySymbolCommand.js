const axios = require('axios');
const { TELEGRAM_URL } = process.env;

const User = require('../../models/user');
const { getCurrencyCoins } = require('../coin');

const currencySymbolCommand = async (res, chat_id, symbol) => {
  const userData = await User.findOne({ chat_id });
  const symbolCoin = symbol.slice(1);
  const timeInMinutes = [30, 60, 180, 360, 720, 1440];
  let textMessage = `/${symbolCoin} average price per: `;

  timeInMinutes.forEach(async (time, i, arr) => {
    const data = await getCurrencyCoins(symbolCoin, time);
    const price = Number(data.price).toFixed(2);
    textMessage += `\n${time / 60} hours = ${price}$`;

    if (i === arr.length - 1) {
      axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: textMessage,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: userData.coin.includes(symbolCoin)
                    ? 'Remove from favorite'
                    : 'Add to favorite',
                  callback_data: symbolCoin,
                },
              ],
            ],
          },
        })
        .then(response => {
          res.status(201).json({
            status: 'success',
            code: 201,
          });
        })
        .catch(err => res.send(err));
    }
  });
};

module.exports = currencySymbolCommand;
