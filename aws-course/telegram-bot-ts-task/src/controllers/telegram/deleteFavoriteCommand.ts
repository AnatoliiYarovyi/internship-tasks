import axios from 'axios';
import { Response  } from 'express';
const { TELEGRAM_URL } = process.env;
import User from '../../models/user';

type DeleteFavoriteCommand = (
  res: Response,
  chat_id: number,
  symbol: string,
) => any;

const deleteFavoriteCommand: DeleteFavoriteCommand = async (
  res,
  chat_id,
  symbol,
) => {
  if (symbol === undefined) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but the command is not correct. Please enter /deleteFavorite and the symbol of the coin (for example "/deleteFavorite BTC")`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }

  const { coin: userCoin } = await User.findOne({ chatId: chat_id });

  if (userCoin.includes(symbol) === false) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but this coin /${symbol} is not in your favorites list`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    userCoin.splice(userCoin.indexOf(symbol), 1);
    await User.findOneAndUpdate(
      { chatId: chat_id },
      { $set: { coin: userCoin } },
    );
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `/${symbol} removed from favorite`,
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

export default deleteFavoriteCommand;
