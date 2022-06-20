const express = require('express');

const costCalculation = require('./service/costCalculation');
const workingTime = require('./service/workingTime');
const getCurrentDate = require('./service/getCurrentDate');
const deliveryTime = require('./service/deliveryTime');

// const fileExemple = {
//   mimetype: 'doc',
//   language: 'ua',
//   count: 100,
// };

const index = express();
const { PORT = 3000 } = process.env;

index.use(express.json());

index.post('/', function (req, res) {
  try {
    console.log(req.body);
    const { price, time, deadline, deadline_date } = correctarium(req.body);
    console.log(typeof req.body.count);
    if (typeof req.body.count != 'number') {
      res.send({ error: 'Алло, шо ты лепишь?:) Число давай!' });
    } else {
      res.send({ price, time, deadline, deadline_date });
    }
  } catch (error) {
    console.log(error);
  }
});
const correctarium = fileExemple => {
  const price = costCalculation(fileExemple);
  const taskTimeInMinutes = workingTime(fileExemple);
  const currentDate = getCurrentDate();
  const { deadline, deadline_date } = deliveryTime(
    taskTimeInMinutes,
    currentDate,
  );

  return {
    price,
    time: Number((taskTimeInMinutes / 60).toFixed(2)), //часы,
    deadline,
    deadline_date,
  };
};

// console.log(correctarium(fileExemple));

index.listen(PORT, () => {
  console.log(`Server srart on port=${PORT} ...`);
});
