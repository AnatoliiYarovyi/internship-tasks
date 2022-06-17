const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const cron = require('node-cron');

const getCurrentPrice = require('./support/getCurrentPrice');
const writeData = require('./db/writeData');
const queryAllCoin = require('./db/queryAllCoin');
const queryCoin = require('./db/queryCoin');

const { DB_HOST, DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env;
// configuration MySQL
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_USER_PASS,
  database: DB_NAME,
});
connection.connect(err => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log('connect --> ON');
  }
});
const index = express();
index.use(express.json());

// start "cron" --> requests happen every 5 minutes
const interval = 5;
cron.schedule(`*/${interval} * * * *`, async () => {
  try {
    console.log('running a task every five minutes');
    const currentPrice = await getCurrentPrice();
    getWriteCoinDB(currentPrice);
  } catch (error) {
    console.log(error);
  }
});

// write data to DB
const getWriteCoinDB = currentPrice => {
  currentPrice.map((el, i) => {
    writeData(connection, el);
  });
  console.log('Data recording completed!');
};

// GET '/' --> Reading from the database of the 20 latest cryptocurrencies with their average price
index.get('/coinName/', async function (req, res) {
  try {
    const data = await queryAllCoin(connection);
    res.json({
      message: 'Get all coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET '/coin/name' --> Reading the requested 'coin'(cryptocurrency) from the database
index.get('/coin/', async function (req, res) {
  try {
    const { name, shop, timeInMinutes } = req.query;
    const timeInterval = Math.floor(timeInMinutes / interval);
    const data = await queryCoin(connection, name, shop, timeInterval);
    res.json({
      message: 'Get coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// listen for program interruption (ctrl-c)
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log('connect --> OFF');
    }
  });
  process.exit();
});
// listen on port 3000
index.listen(PORT, () => {
  console.log(`Server srart on port=${PORT} ...`);
});
