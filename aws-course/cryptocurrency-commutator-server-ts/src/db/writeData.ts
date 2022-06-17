import { Coin } from '../entity/Coin';
import { EntityManager } from 'typeorm';

import { AllPriceCoin } from '../interface/interface';

const writeData = async (manager: EntityManager, data: AllPriceCoin) => {
  try {
    const {
      name,
      symbol,
      coinMarketCap,
      coinBase,
      coinStats,
      kucoin,
      coinPaprika,
      priceAverage,
    } = data;

    await manager.upsert(
      Coin,
      {
        cryptocurrensyName: name,
        cryptocurrensySymbol: symbol,
        coinMarketCap,
        coinBase,
        coinStats,
        kucoin,
        coinPaprika,
        priceAverage,
        date: new Date().toISOString(),
      },
      {
        conflictPaths: ['id'],
        skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export default writeData;
