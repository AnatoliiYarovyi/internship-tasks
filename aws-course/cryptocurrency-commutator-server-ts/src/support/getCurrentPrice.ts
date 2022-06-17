import * as fs from 'fs/promises';
import * as path from 'path';

import getAllCoins from '../api/getAllCoins';

import { AllPriceCoin, DetailsCoin } from '../interface/interface';

interface NameCoins {
  id: number;
  name: string;
  symbol: string;
}

const getCurrentPrice = async () => {
  try {
    const nameCoins: NameCoins[] = await getNameCoins(); // reading from the file the "name" of the desired bitcoins
    const arrAllCoins: DetailsCoin[] = await getAllCoins(); // get an array of objects from all markets
    const price: AllPriceCoin[] = getPrice(nameCoins, arrAllCoins); // find current prices
    // console.log('price', price);
    return price;
  } catch (error) {
    console.log(error);
  }
};

// reading from the file the "name" of the desired bitcoins
const getNameCoins = async () => {
  try {
    const filesPath: string = path.join(__dirname, 'dbNameCoin.json');

    const data = await fs.readFile(filesPath).then(async dataNameCoin => {
      const dataPars: NameCoins[] = await JSON.parse(dataNameCoin.toString());
      return dataPars;
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// find current prices
const getPrice = (nameCoins: NameCoins[], arrAllCoins: DetailsCoin[]) => {
  const allPriceCoin: AllPriceCoin[] = nameCoins.reduce((acc, el) => {
    const findCoin = arrAllCoins.filter(({ shopName, name, symbol }) => {
      if (shopName === 'kucoin' || shopName === 'coinBase') {
        return symbol === el.symbol;
      } else {
        return name === el.name;
      }
    });

    const shops = {
      CoinMarketCap: null,
      CoinBase: null,
      CoinStats: null,
      Kucoin: null,
      CoinPaprika: null,
    };
    let coinPriceSum: number | null = null;
    let calc: number | null = null;

    findCoin.map(({ shopName, price }) => {
      let coinPrice: number;

      if (price) {
        coinPrice = price;

        coinPriceSum += price;
        calc++;
      } else {
        coinPrice = null;
      }

      switch (shopName) {
        case 'coinMarketCap':
          shops.CoinMarketCap = coinPrice;
          break;
        case 'coinBase':
          shops.CoinBase = coinPrice;
          break;
        case 'coinStats':
          shops.CoinStats = coinPrice;
          break;
        case 'kucoin':
          shops.Kucoin = coinPrice;
          break;
        case 'coinPaprika':
          shops.CoinPaprika = coinPrice;
          break;
        default:
          console.log('Invalid store name');
      }
    });

    acc.push({
      name: el.name,
      symbol: el.symbol,
      coinMarketCap: shops.CoinMarketCap,
      coinBase: shops.CoinBase,
      coinStats: shops.CoinStats,
      kucoin: shops.Kucoin,
      coinPaprika: shops.CoinPaprika,
      priceAverage: coinPriceSum / calc,
    });
    return acc;
  }, []);
  return allPriceCoin;
};

export default getCurrentPrice;
