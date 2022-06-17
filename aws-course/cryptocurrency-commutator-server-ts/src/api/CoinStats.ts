import axios, { AxiosResponse } from 'axios';

import { DetailsCoin } from '../interface/interface';
interface DataCoins {
  name: string;
  symbol: string;
  price: number;
}

const endPoints = 'https://api.coinstats.app/public/v1/coins?currency=USD';

const getArrCoinStats = async () => {
  const resData: DetailsCoin[] = await axios
    .get(endPoints)
    .then((resp: AxiosResponse) => {
      const dataCoins: DataCoins[] = resp.data.coins;

      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shopName: 'coinStats',
          listNumber: i + 1,
          name: el.name,
          symbol: el.symbol,
          price: el.price,
        });
        return acc;
      }, []);
    })
    .catch(error => console.error(error));
  return resData;
};

export default getArrCoinStats;
