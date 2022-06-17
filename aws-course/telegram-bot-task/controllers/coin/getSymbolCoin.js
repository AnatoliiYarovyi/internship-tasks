const getAllCoins = require('./getAllCoins');

// this function find symbolCoin === symbolCoin in DB
const getSymbolCoin = async text => {
  const allCoins = await getAllCoins();
  const arrCoin = allCoins.reduce((acc, { symbol }) => {
    acc.push(symbol);
    return acc;
  }, []);
  const findCoin = arrCoin.filter(el => `/${el}` === text);
  return findCoin[0];
};

module.exports = getSymbolCoin;
