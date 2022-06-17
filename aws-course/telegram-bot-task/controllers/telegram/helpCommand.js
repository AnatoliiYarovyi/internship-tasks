const axios = require('axios');
const { TELEGRAM_URL } = process.env;

const helpCommand = async (res, chat_id) => {
  const text = `I am a cryptocurrency bot!\nI display the price of cryptocurrency! You can use commands like this:\n/listRecent --> get a list of popular cryptocurrencies;\n/{currency_symbol} --> get detailed information about cryptocurrency;\n/listFavourite --> returns a list of Favourite crypts;
  \nand you can adds or remove a crypt to the "favorites" section`;

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

module.exports = helpCommand;
