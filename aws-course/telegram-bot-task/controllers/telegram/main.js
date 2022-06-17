const { getSymbolCoin } = require('../coin');
const startCommand = require('./startCommand');
const helpCommand = require('./helpCommand');
const listRecentCommand = require('./listRecentCommand');
const currencySymbolCommand = require('./currencySymbolCommand');
const listFavouriteCommand = require('./listFavouriteCommand');
const updateDataCoin = require('./updateDataCoin');

const main = async (req, res, next) => {
  if (!req.body.callback_query) {
    const { id: chatId, username } = req.body.message.chat;
    const { text } = req.body.message;

    switch (text) {
      case '/start':
        startCommand(res, chatId, username);
        break;

      case '/help':
        helpCommand(res, chatId);
        break;

      case '/listRecent':
        listRecentCommand(res, chatId);
        break;

      case `/listFavourite`:
        listFavouriteCommand(res, chatId, text);
        break;

      case `/${await getSymbolCoin(text)}`:
        currencySymbolCommand(res, chatId, text);
        break;

      default:
        console.log('Invalid command');
        helpCommand(res, chatId);
    }
  } else if (req.body.callback_query) {
    const { id: chatId, username } = req.body.callback_query.from;
    const symbolCoin = req.body.callback_query.data;
    const callback_query_id = req.body.callback_query.id;
    const message_id = req.body.callback_query.message.message_id;

    updateDataCoin(res, chatId, symbolCoin, callback_query_id, message_id);
  }
};

module.exports = main;
