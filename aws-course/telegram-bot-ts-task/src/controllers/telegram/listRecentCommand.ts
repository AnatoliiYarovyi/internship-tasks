import axios from 'axios';
import { Response } from 'express';
const { TELEGRAM_URL } = process.env;

import getAllCoins from '../coin/getAllCoins';

const listRecentCommand = async (res: Response, chat_id: number) => {
  try {
    const data: {
      cryptocurrensySymbol: string;
      priceAverage: string;
    }[] = await getAllCoins();
    let text: string = `These are 20 popular crypto coins and their average price per hour.`;
    data.forEach(({ cryptocurrensySymbol, priceAverage }) => {
      let price = Number(priceAverage).toFixed(2);
      text += `\n/${cryptocurrensySymbol} = ${price}$`;
    });

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

export default listRecentCommand;
