const axios = require('axios');
const { SERVER_URL } = process.env;

const getAllCoins = async () => {
  return axios
    .get(SERVER_URL)
    .then(res => {
      const data = res.data.data;
      return data;
    })
    .catch(err => console.log(err));
};
module.exports = getAllCoins;
