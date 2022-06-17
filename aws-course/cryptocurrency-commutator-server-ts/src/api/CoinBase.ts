import axios, { AxiosResponse } from 'axios';

const endPoints: string = 'https://api.coinbase.com/v2/exchange-rates';

import { Obj, DetailsCoin } from '../interface/interface';

interface DataCoins {
  symbol: string;
  price: string;
}

const getCoinBase = async () => {
  const resData: DetailsCoin[] = await axios
    .get(endPoints)
    .then((resp: AxiosResponse) => {
      // we take object {} from the response with key="crypt name", value="price"
      const objCoins: Obj = resp.data.data.rates;

      // using "for in" iterate over objCoins and create the array of objects we need
      const dataCoins: DataCoins[] = [];
      for (const key in objCoins) {
        dataCoins.push({
          symbol: key,
          price: objCoins[key],
        });
      }

      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shopName: 'coinBase',
          listNumber: i + 1,
          symbol: el.symbol,
          price: Number(el.price),
        });
        return acc;
      }, []);
    })
    .catch(error => console.error(error));
  return resData;
};

export default getCoinBase;
