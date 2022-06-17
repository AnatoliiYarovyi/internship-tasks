const getArrCoinMarketCap = require('./CoinMarketCap');
const getCoinBase = require('./CoinBase');
const getArrCoinStats = require('./CoinStats');
const getArrKucoin = require('./Kucoin');
const getArrCoinPaprika = require('./Coinpaprika');

const getAllCoins = async () => {
  try {
    const arrCoinMarketCap = await getArrCoinMarketCap();
    const arrCoinBase = await getCoinBase();
    const arrCoinStats = await getArrCoinStats();
    const arrKucoin = await getArrKucoin();
    const arrArrCoinPaprika = await getArrCoinPaprika();
    const allCoins = arrCoinMarketCap.concat(
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

module.exports = getAllCoins;
