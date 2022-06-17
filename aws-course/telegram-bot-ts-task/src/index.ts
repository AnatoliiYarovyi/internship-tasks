import express from 'express';
import { Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import telegramRouter from './routes/api/telegram';

const { DB_HOST, PORT = 4000 } = process.env;
const index = express();
index.use(bodyParser.json());
index.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

index.use('/', telegramRouter);

index.use((_, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

index.use((err, _, res: Response, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// listen for program interruption (ctrl-c)
process.on('SIGINT', () => {
  console.log(`Server stop`);
  process.exit();
});

mongoose
  .connect(DB_HOST, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connect success');
    index.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
