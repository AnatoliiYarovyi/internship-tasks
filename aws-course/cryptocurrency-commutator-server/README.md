# cryptocurrency-commutator-server
У нас есть 5 бирж. У каждой биржи своя API.

Раз в 5 минут делаем запросы на все API, смысл которых “получить нынешнюю цену криптовалют”.

Мапим полученные результаты,  подсчитываем средние значения валют по всем биржам, сохраняем все в базу данных.

# Технологии

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

# Рекомедуемый порядок выполнения

---

## Фаза 0:

Если есть опыт работы с тайпскриптом - пишите сразу на TS. Если опыта нет, сначала на JS - потом:

- Перевести бота на TS;
- Настроить eslint.

## Фаза 1:

- Развернуть сервер Express.js;
- Получить респонс от каждой API;
- Выбрать (в идеале - сделать это программно. Если не выходит - выбрать вручную) 20-30 “хайповых” криптовалют, которые возвращают все 5 API и получить их цену .
- Привести респонс полученный от каждой из API к единому формату.

## Фаза 2:

- Создать и настроить MySQL DB;
- Получить респонс от каждой API;
- Создать таблицу, в которой будут храниться данные о каждой из криптовалют.
- В таблице обязательно должны быть такие поля
    - *cryptocurrensyName*
    - *[cryptocurrency_platform_name]Value* - цена крипты в конкретном маркете. (сколько API - столько и колонок)
- реализовать простейшие CRUD операции с БД (взять, положить, удалить, обновить);

## Фаза 3:

- Положить данные из Фазы 1 в базу данных, которую создали в Фазе 2;

## Фаза 4:

- Настроить крон-джоб на каждые 5 мин на выполнение действий из 1-3 Фазы;
    - [https://www.npmjs.com/package/node-cron](https://www.npmjs.com/package/node-cron)
    - [https://www.youtube.com/watch?v=9dIHjegGeKo&ab_channel=WesBos](https://www.youtube.com/watch?v=9dIHjegGeKo&ab_channel=WesBos)

## Фаза 5:

- Создать эндпоинт(ы), которые возвращают данные про криптовалюту. В параметрах запроса должна быть возможность указать какую-то конкретную крипту, конкретный маркет, за какой период возращать данны о крипте, и т д и тп;
