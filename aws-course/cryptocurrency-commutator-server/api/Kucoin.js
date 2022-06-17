const axios = require('axios');

const endPoints = 'https://api.kucoin.com/api/v1/prices';

const getArrKucoin = async () => {
  const resData = await axios
    .get(endPoints)
    .then(resp => {
      // we take object {} from the response with key="crypt name", value="price"
      const objCoins = resp.data.data;

      // using "for in" iterate over objCoins and create the array of objects we need
      const dataCoins = [];
      for (const key in objCoins) {
        dataCoins.push({
          symbol: key,
          price: objCoins[key],
        });
      }

      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          shop_name: 'kucoin',
          list_number: i + 1,
          symbol: el.symbol,
          price: Number(el.price),
        });
        return acc;
      }, []);
    })
    .catch(error => console.log(error));
  return resData;
};
module.exports = getArrKucoin;
