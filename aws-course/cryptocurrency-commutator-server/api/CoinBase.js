const axios = require('axios');

const endPoints = 'https://api.coinbase.com/v2/exchange-rates';

const getCoinBase = async () => {
  const resData = await axios
    .get(endPoints)
    .then(resp => {
      // we take object {} from the response with key="crypt name", value="price"
      const objCoins = resp.data.data.rates;

      // using "for in" iterate over objCoins and create the array of objects we need
      const dataCoins = [];
      for (const key in objCoins) {
        dataCoins.push({
          symbol: key,
          price: objCoins[key],
        });
      }

      return dataCoins.reduce((acc, el, i, arr) => {
        acc.push({
          shop_name: 'coinBase',
          list_number: i + 1,
          symbol: el.symbol,
          price: Number(el.price),
        });
        // if (i === arr.length - 1) {
        //   console.log(acc);
        // }
        return acc;
      }, []);
    })
    .catch(error => console.log(error));
  return resData;
};
// getCoinBase();
module.exports = getCoinBase;
