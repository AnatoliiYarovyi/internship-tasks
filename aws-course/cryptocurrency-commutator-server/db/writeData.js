const writeData = (connection, data) => {
  const {
    name,
    symbol,
    coinMarketCap,
    coinBase,
    coinStats,
    kucoin,
    coinPaprika,
    price_average,
  } = data;
  let writeData =
    'INSERT INTO cryptocurrency_prices (cryptocurrensy_name, cryptocurrensy_symbol, coinMarketCap, coinBase, coinStats, kucoin, coinPaprika, price_average) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.execute(
    writeData,
    [
      name,
      symbol,
      coinMarketCap,
      coinBase,
      coinStats,
      kucoin,
      coinPaprika,
      price_average,
    ],
    (err, result, field) => {
      // console.log(err);
      // console.log(result);
      // console.log(field);
    },
  );
};

module.exports = writeData;
