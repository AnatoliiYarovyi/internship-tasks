import axios from 'axios';
import { Response } from 'express';
const { TELEGRAM_URL } = process.env;
import User from '../../models/user';
import getAllCoins from '../coin/getAllCoins';

type AddToFavoriteCommand = (
  res: Response,
  chat_id: number,
  symbol: string | undefined,
) => any;

const addToFavoriteCommand: AddToFavoriteCommand = async (
  res,
  chat_id,
  symbol,
) => {
  if (symbol === undefined) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but the command is not correct.\nPlease enter /addToFavorite and the symbol of the coin\n(for example "/addToFavorite BTC")`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }

  const allCoinData: {
    cryptocurrensySymbol: string;
    priceAverage: string;
  }[] = await getAllCoins();
  const allCoinName: string[] = allCoinData.reduce(
    (acc, { cryptocurrensySymbol }) => {
      acc.push(cryptocurrensySymbol);
      return acc;
    },
    [],
  );
  const { coin: userCoin } = await User.findOne({ chatId: chat_id });

  if (userCoin.includes(symbol) === true) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but this coin /${symbol} is already on your favorites list`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  } else if (allCoinName.includes(symbol) === false) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but this coin /${symbol} was not found in /listRecent.\nPlease enter a valid coin name with /listRecent.`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    userCoin.push(symbol);
    await User.findOneAndUpdate(
      { chatId: chat_id },
      { $set: { coin: userCoin } },
    );
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `/${symbol} added to favorite`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }
  return;
};

export default addToFavoriteCommand;
