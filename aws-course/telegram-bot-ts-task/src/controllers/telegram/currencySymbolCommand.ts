import axios from 'axios';
import { Response } from 'express';
const { TELEGRAM_URL } = process.env;

import User from '../../models/user';
import getCurrencyCoins from '../coin/getCurrencyCoins';

type CurrencySymbolCommand = (
  res: Response,
  chat_id: number,
  symbol: string,
) => any;

interface UserData {
  chatId: number;
  user: string;
  coin: string[];
}

const currencySymbolCommand: CurrencySymbolCommand = async (
  res,
  chat_id,
  symbol,
) => {
  const userData: UserData = await User.findOne({ chatId: chat_id });
  const symbolCoin: string = symbol.slice(1);
  const timeInMinutes: number[] = [30, 60, 180, 360, 720, 1440];
  let textMessage: string = `/${symbolCoin} average price per: `;

  timeInMinutes.forEach(async (time, i, arr) => {
    const data: {
      symbol: string;
      price: number;
    }[] = await getCurrencyCoins(symbolCoin, time);
    const priceCoin: string = Number(data[0].price).toFixed(2);
    textMessage += `\n${time / 60} hours = ${priceCoin}$`;

    if (i === arr.length - 1) {
      try {
        await axios
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
          .then(() => {
            res.status(201).json({
              status: 'success',
              code: 201,
            });
          });
      } catch (error) {
        res.send(error);
      }
    }
  });
};

export default currencySymbolCommand;
