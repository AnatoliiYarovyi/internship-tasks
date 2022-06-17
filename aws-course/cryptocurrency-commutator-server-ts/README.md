# cryptocurrency-commutator-server

We have 5 exchanges. Each exchange has its own API.

Once every 5 minutes, we make requests to all APIs, the meaning of which is “get
the current price of cryptocurrencies”.

Maps the results, calculate the average values of currencies for all exchanges,
save everything to the database.

# Stack technologies

---

- Node.js;
- Express.js;
- DataBase (MySQL);
- CRON;
- Cryptocurrency APIs.
- Heroku;
- NgRok.

# Cryptocurrency API list

---

- [CoinMarketCap](https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest);
- [CoinBase](https://developers.coinbase.com/api/v2?javascript#introduction);
- [CoinStats](https://documenter.getpostman.com/view/5734027/RzZ6Hzr3);
- [Kucoin](https://docs.kucoin.com/#general);
- [CoinPaprika](https://api.coinpaprika.com/);
