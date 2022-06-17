import axios, { AxiosResponse } from 'axios';

import { DetailsCoin } from '../interface/interface';
interface DataCoins {
  name: string;
  symbol: string;
  quotes: {
    USD: {
      price: number;
    };
  };
}

const endPoints: string = 'https://api.coinpaprika.com/v1/tickers';

const getArrCoinPaprika = async () => {
  const resData: DetailsCoin[] = await axios
    .get(endPoints)
    .then((resp: AxiosResponse) => {
      const dataCoins: DataCoins[] = resp.data;
      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shopName: 'coinPaprika',
          listNumber: i + 1,
          name: el.name,
          symbol: el.symbol,
          price: el.quotes.USD.price || null,
        });
        return acc;
      }, []);
    })
    .catch(error => console.error(error));
  return resData;
};

export default getArrCoinPaprika;
