import 'reflect-metadata';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Coin } from './entity/Coin';
import express from 'express';
import { Request, Response } from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

import getCurrentPrice from './support/getCurrentPrice';
import writeData from './db/writeData';
import queryAllCoin from './db/queryAllCoin';
import queryCoin from './db/queryCoin';
import { AllPriceCoin } from './interface/interface';

const { DB_HOST, DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env;

// configuration typeORM
let dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_USER_PASS,
  database: DB_NAME,
  entities: [Coin],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    console.log('connect --> ON');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

const index = express();
index.use(express.json());

// start "cron" --> requests happen every 5 minutes
const interval: number = 5;
cron.schedule(`*/${interval} * * * *`, async () => {
  try {
    console.log('start "cron"');
    const currentPrice: AllPriceCoin[] = await getCurrentPrice();
    await getWriteCoinDB(currentPrice);
  } catch (error) {
    console.log(error);
  }
});

// write data to DB
const getWriteCoinDB = async (currentPrice: AllPriceCoin[]) => {
  const manager: EntityManager = await dataSource.manager;
  currentPrice.map(async (el: AllPriceCoin) => {
    await writeData(manager, el);
  });
  console.log('Data recording completed!');
};

// GET '/' --> Reading from the database of the 20 latest cryptocurrencies with their average price
index.get('/coinName/', async function (req: Request, res: Response) {
  try {
    const userRepository: Repository<any> = dataSource.getRepository(Coin);
    const data = await queryAllCoin(userRepository);
    res.json({
      message: 'Get all coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET '/coin/name' --> Reading the requested 'coin'(cryptocurrency) from the database
index.get('/coin/', async function (req: Request, res: Response) {
  try {
    const userRepository: Repository<any> = dataSource.getRepository(Coin);

    const symbolCoin = req.query.name;
    const shopCoin = req.query.shop;
    const timeInMinutes: number = Number(req.query.timeInMinutes);
    const timeInterval: number = Math.floor(timeInMinutes / interval);
    const data = await queryCoin(
      userRepository,
      symbolCoin,
      shopCoin,
      timeInterval,
    );
    res.json({
      message: 'Get coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// listen for program interruption (ctrl-c)
process.on('SIGINT', async () => {
  await dataSource.destroy();
  console.log('connect --> OFF');
  process.exit();
});
// listen on port 3000
index.listen(PORT, () => {
  console.log(`Server srart on port=${PORT} ...`);
});
