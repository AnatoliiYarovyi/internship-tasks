const axios = require('axios');
const fs = require('fs/promises');

const endPoints =
  'https://api.coinstats.app/public/v1/coins?limit=20&currency=USD';

async function getNewNameCoin() {
  try {
    const arrCryptos = await getArrCryptos(endPoints);
    const stringData = await JSON.stringify(arrCryptos);

    await fs.writeFile('./support/dbNameCoin.json', stringData);
    console.log(`Data save in "dbNameCoin.json"`);
  } catch (error) {
    console.log(error);
  }
}

const getArrCryptos = async endPoints => {
  const data = await axios.get(endPoints).then(resp => {
    const dataCoins = resp.data.coins;
    return dataCoins.reduce((acc, el, i) => {
      acc.push({
        id: i + 1,
        name: el.name,
        symbol: el.symbol,
      });
      return acc;
    }, []);
  });
  return data;
};

// getNewNameCoin();
module.exports = getNewNameCoin;
