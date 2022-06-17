const axios = require('axios');

const endPoints =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const headers = {
  'X-CMC_PRO_API_KEY': '39ac0feb-d618-47b4-8607-59ea6df21e06',
};

const getArrCoinMarketCap = async () => {
  const resData = await axios
    .get(endPoints, { headers })
    .then(resp => {
      const dataCoins = resp.data.data;
      // console.log(dataCoins);
      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shop_name: 'coinMarketCap',
          list_number: i + 1,
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

module.exports = getArrCoinMarketCap;
