import getArrCoinMarketCap from './CoinMarketCap';
import getCoinBase from './CoinBase';
import getArrCoinStats from './CoinStats';
import getArrKucoin from './Kucoin';
import getArrCoinPaprika from './Coinpaprika';

import { DetailsCoin } from '../interface/interface';

const getAllCoins = async () => {
  try {
    const arrCoinMarketCap: DetailsCoin[] = await getArrCoinMarketCap();
    const arrCoinBase: DetailsCoin[] = await getCoinBase();
    const arrCoinStats: DetailsCoin[] = await getArrCoinStats();
    const arrKucoin: DetailsCoin[] = await getArrKucoin();
    const arrArrCoinPaprika: DetailsCoin[] = await getArrCoinPaprika();

    const allCoins: DetailsCoin[] = arrCoinMarketCap.concat(
      arrCoinBase,
      arrCoinStats,
      arrKucoin,
      arrArrCoinPaprika,
    );
    return allCoins;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCoins;
