import axios, { AxiosResponse } from 'axios';

import { Obj, DetailsCoin } from '../interface/interface';
interface DataCoins {
  symbol: string;
  price: string;
}

const endPoints = 'https://api.kucoin.com/api/v1/prices';

const getArrKucoin = async () => {
  const resData: DetailsCoin[] = await axios
    .get(endPoints)
    .then((resp: AxiosResponse) => {
      // we take object {} from the response with key="crypt name", value="price"
      const objCoins: Obj = resp.data.data;

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
          shopName: 'kucoin',
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

export default getArrKucoin;
