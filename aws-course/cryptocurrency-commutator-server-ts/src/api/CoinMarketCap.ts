import axios, { AxiosResponse } from 'axios';

import { Obj, DetailsCoin } from '../interface/interface';
interface DataCoins {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

const endPoints: string =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const headers: Obj = {
  'X-CMC_PRO_API_KEY': '39ac0feb-d618-47b4-8607-59ea6df21e06',
};

const getArrCoinMarketCap = async () => {
  const resData: DetailsCoin[] = await axios
    .get(endPoints, { headers })
    .then((resp: AxiosResponse) => {
      const dataCoins: DataCoins[] = resp.data.data;
      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shopName: 'coinMarketCap',
          listNumber: i + 1,
          name: el.name,
          symbol: el.symbol,
          price: el.quote.USD.price,
        });
        return acc;
      }, []);
    })
    .catch(error => console.log(error));
  return resData;
};

export default getArrCoinMarketCap;
