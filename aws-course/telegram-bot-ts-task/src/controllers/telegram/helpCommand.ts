import axios from 'axios';
import { Response } from 'express';
const { TELEGRAM_URL } = process.env;

const helpCommand = async (res: Response, chat_id: number) => {
  try {
    const text: string = `I am a cryptocurrency bot!\nI display the price of cryptocurrency!\nYou can use commands like this:\n/listRecent --> get a list of popular cryptocurrencies;\n/{currency_symbol} --> get detailed information about cryptocurrency;\n/listFavorite --> return a list of "favorite" crypts;\n/addToFavorite {currency_symbol} --> add a crypt to the "favorite";\n/deleteFavorite {currency_symbol} --> remove crypto from "favorite";`;

    await axios
      .post(`${TELEGRAM_URL}/sendMessage`, {
        chat_id,
        text,
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
};

export default helpCommand;
