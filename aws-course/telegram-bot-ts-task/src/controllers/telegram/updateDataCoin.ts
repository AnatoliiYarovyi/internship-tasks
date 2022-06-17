import axios from 'axios';
import { Response } from 'express';
const { TELEGRAM_URL } = process.env;
import User from '../../models/user';

type UpdateDataCoin = (
  res: Response,
  chat_id: number,
  symbol: string,
  message_id: number,
  callback_query_id: string,
) => any;

const updateDataCoin: UpdateDataCoin = async (
  res,
  chat_id,
  symbol,
  message_id,
  callback_query_id,
) => {
  try {
    const { coin: userCoin } = await User.findOne({ chatId: chat_id });
    userCoin.includes(symbol)
      ? userCoin.splice(userCoin.indexOf(symbol), 1)
      : userCoin.push(symbol);

    await User.findOneAndUpdate(
      { chatId: chat_id },
      { $set: { coin: userCoin } },
    );

    let text: string = userCoin.includes(symbol)
      ? `/${symbol} added to favorite`
      : `/${symbol} removed from favorite`;

    await axios.post(`${TELEGRAM_URL}/answerCallbackQuery`, {
      callback_query_id,
      text,
    });

    await axios
      .post(`${TELEGRAM_URL}/editMessageText`, {
        chat_id,
        message_id,
        text,
      })
      .then(response => {
        res.status(201).send(response);
      });
  } catch (error) {
    res.send(error);
  }
};

export default updateDataCoin;
