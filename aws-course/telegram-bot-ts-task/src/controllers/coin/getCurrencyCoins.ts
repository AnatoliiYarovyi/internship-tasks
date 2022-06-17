import axios, { AxiosResponse } from 'axios';
const { SERVER_COIN_URL } = process.env;

interface DataCurrencyCoins {
  symbol: string;
  price: number;
}

const getCurrencyCoins = async (symbol: string, time: number = 60) => {
  try {
    const resData = await axios
      .get(SERVER_COIN_URL, {
        params: { name: symbol, timeInMinutes: time },
      })
      .then((res: AxiosResponse) => {
        const data: DataCurrencyCoins[] = res.data.data;
        return data;
      });
    return resData;
  } catch (error) {
    console.log(error);
  }
};

export default getCurrencyCoins;
