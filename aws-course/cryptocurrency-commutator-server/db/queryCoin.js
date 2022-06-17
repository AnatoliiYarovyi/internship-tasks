const queryCoin = async (
  connection,
  coin,
  shop = 'price_average',
  limit = 12,
) => {
  let query = `SELECT cryptocurrensy_symbol AS symbol, ${shop} AS price 
  FROM cryptocurrency_prices
  WHERE cryptocurrensy_symbol = '${coin}'
  ORDER BY date DESC
  LIMIT ${limit}`;
  const dataCoin = await connection
    .promise()
    .query(query)
    .then(([result, field]) => {
      return result;
    })
    .catch(error => console.error(error));

  // calculate the average value of the price
  let sumPrice = null;
  let number = null;
  const data = dataCoin.reduce((acc, el, i, arr) => {
    const { symbol, price } = el;

    if (price) {
      sumPrice += Number(price);
      ++number;
    }
    if (i === arr.length - 1) {
      acc = {
        symbol,
        price: sumPrice / number,
      };
    }
    return acc;
  }, []);
  return data;
};

module.exports = queryCoin;
