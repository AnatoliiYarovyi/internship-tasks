import { Request, Response, NextFunction } from 'express';

import getSymbolCoin from '../coin/getSymbolCoin';
import startCommand from './startCommand';
import helpCommand from './helpCommand';
import listRecentCommand from './listRecentCommand';
import currencySymbolCommand from './currencySymbolCommand';
import listFavouriteCommand from './listFavouriteCommand';
import updateDataCoin from './updateDataCoin';
import addToFavoriteCommand from './addToFavoriteCommand';
import deleteFavoriteCommand from './deleteFavoriteCommand';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.callback_query) {
      const { id: chatId, username } = req.body.message.chat;
      const { text } = req.body.message;
      const textArr: string = text.replace(/\s+/g, ' ').trim().split(' ');
      const command: string = textArr[0];
      const symbolCoin: string = textArr[1];

      switch (command) {
        case '/start':
          await startCommand(res, chatId, username);
          break;

        case '/help':
          await helpCommand(res, chatId);
          break;

        case '/listRecent':
          await listRecentCommand(res, chatId);
          break;

        case `/listFavorite`:
          await listFavouriteCommand(res, chatId);
          break;

        case `/addToFavorite`:
          await addToFavoriteCommand(res, chatId, symbolCoin);
          break;

        case `/deleteFavorite`:
          await deleteFavoriteCommand(res, chatId, symbolCoin);
          break;

        case `/${await getSymbolCoin(text)}`:
          await currencySymbolCommand(res, chatId, text);
          break;

        default:
          console.log('Invalid command');
          await helpCommand(res, chatId);
      }
    } else if (req.body.callback_query) {
      const { id: chatId } = req.body.callback_query.from;
      const symbolCoin: string = req.body.callback_query.data;
      const callback_query_id: string = req.body.callback_query.id;
      const message_id: number = req.body.callback_query.message.message_id;

      await updateDataCoin(
        res,
        chatId,
        symbolCoin,
        message_id,
        callback_query_id,
      );
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export default main;
