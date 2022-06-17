const queryAllCoin = async connection => {
  let query =
    'SELECT cryptocurrensy_symbol AS symbol, price_average FROM cryptocurrency_prices ORDER BY date DESC LIMIT 20';
  const data = await connection
    .promise()
    .query(query)
    .then(([result, field]) => {
      // console.log(result);
      return result;
    })
    .catch(error => console.error(error));
  return data;
};

module.exports = queryAllCoin;
