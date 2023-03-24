const deliveryTime = require('./deliveryTime');

const workDayMonday = {
  getFullYear: 2022,
  getMonth: 0,
  getDate: 17,
  getDay: 1,
  getHours: 15,
  getMinutes: 15,
};
const workDayWednesday = {
  getFullYear: 2022,
  getMonth: 0,
  getDate: 19,
  getDay: 3,
  getHours: 9,
  getMinutes: 0,
};
const workDayFriday = {
  getFullYear: 2022,
  getMonth: 0,
  getDate: 21,
  getDay: 5,
  getHours: 12,
  getMinutes: 30,
};
const workDaySaturday = {
  getFullYear: 2022,
  getMonth: 0,
  getDate: 22,
  getDay: 6,
  getHours: 12,
  getMinutes: 30,
};
const workDaySunday = {
  getFullYear: 2022,
  getMonth: 0,
  getDate: 23,
  getDay: 0,
  getHours: 12,
  getMinutes: 30,
};

describe('Расчет дедлайна - заказ в рабочее время понедельник', () => {
  test('работа готова сегодня', () => {
    expect(deliveryTime(60, workDayMonday)).toEqual({
      deadline: 1642428900000,
      deadline_date: '17.01.2022, 16:15:00',
    });
  });
  test('работа будет готова завтра', () => {
    expect(deliveryTime(360, workDayMonday)).toEqual({
      deadline: 1642500900000,
      deadline_date: '18.01.2022, 12:15:00',
    });
  });
  test('работа будет готова через неделю', () => {
    expect(deliveryTime(2700, workDayMonday)).toEqual({
      deadline: 1643030100000,
      deadline_date: '24.01.2022, 15:15:00',
    });
  });
  test('работа будет готова через 2 недели', () => {
    expect(deliveryTime(5400, workDayMonday)).toEqual({
      deadline: 1643634900000,
      deadline_date: '31.01.2022, 15:15:00',
    });
  });
  test('работа будет готова через 3 недели', () => {
    expect(deliveryTime(8100, workDayMonday)).toEqual({
      deadline: 1644239700000,
      deadline_date: '07.02.2022, 15:15:00',
    });
  });
});

describe('Расчет дедлайна - заказ в рабочее время пятница', () => {
  test('работа готова сегодня', () => {
    expect(deliveryTime(60, workDayFriday)).toEqual({
      deadline: 1642764600000,
      deadline_date: '21.01.2022, 13:30:00',
    });
  });
  test('работа будет готова в понедельник', () => {
    expect(deliveryTime(420, workDayFriday)).toEqual({
      deadline: 1643013000000,
      deadline_date: '24.01.2022, 10:30:00',
    });
  });
  test('работа будет готова через неделю', () => {
    expect(deliveryTime(2700, workDayFriday)).toEqual({
      deadline: 1643365800000,
      deadline_date: '28.01.2022, 12:30:00',
    });
  });
  test('работа будет готова через 2 недели', () => {
    expect(deliveryTime(5400, workDayFriday)).toEqual({
      deadline: 1643970600000,
      deadline_date: '04.02.2022, 12:30:00',
    });
  });
  test('работа будет готова через 3 недели', () => {
    expect(deliveryTime(8100, workDayFriday)).toEqual({
      deadline: 1644575400000,
      deadline_date: '11.02.2022, 12:30:00',
    });
  });
});

describe('Расчет дедлайна - заказ в выходной субота', () => {
  test('работа готова в понедельник', () => {
    expect(deliveryTime(60, workDaySaturday)).toEqual({
      deadline: 1643014800000,
      deadline_date: '24.01.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через неделю', () => {
    expect(deliveryTime(2760, workDaySaturday)).toEqual({
      deadline: 1643619600000,
      deadline_date: '31.01.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через 2 недели', () => {
    expect(deliveryTime(5460, workDaySaturday)).toEqual({
      deadline: 1644224400000,
      deadline_date: '07.02.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через 3 недели', () => {
    expect(deliveryTime(8160, workDaySaturday)).toEqual({
      deadline: 1644829200000,
      deadline_date: '14.02.2022, 11:00:00',
    });
  });
  test('работа будет готова в пятницу через 2 недели', () => {
    expect(deliveryTime(8040, workDaySaturday)).toEqual({
      deadline: 1644595200000,
      deadline_date: '11.02.2022, 18:00:00',
    });
  });
});
describe('Расчет дедлайна - заказ в выходной воскресенье', () => {
  test('работа готова в понедельник', () => {
    expect(deliveryTime(60, workDaySunday)).toEqual({
      deadline: 1643014800000,
      deadline_date: '24.01.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через неделю', () => {
    expect(deliveryTime(2760, workDaySunday)).toEqual({
      deadline: 1643619600000,
      deadline_date: '31.01.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через 2 недели', () => {
    expect(deliveryTime(5460, workDaySunday)).toEqual({
      deadline: 1644224400000,
      deadline_date: '07.02.2022, 11:00:00',
    });
  });
  test('работа будет готова в понедельник через 3 недели', () => {
    expect(deliveryTime(8160, workDaySunday)).toEqual({
      deadline: 1644829200000,
      deadline_date: '14.02.2022, 11:00:00',
    });
  });
  test('работа будет готова в пятницу через 2 недели', () => {
    expect(deliveryTime(8040, workDaySunday)).toEqual({
      deadline: 1644595200000,
      deadline_date: '11.02.2022, 18:00:00',
    });
  });
});
describe('Расчет дедлайна - заказ в среду', () => {
  test('работа готова в четверг', () => {
    expect(deliveryTime(600, workDayWednesday)).toEqual({
      deadline: 1642669200000,
      deadline_date: '20.01.2022, 11:00:00',
    });
  });
  test('работа готова во вторник', () => {
    expect(deliveryTime(2220, workDayWednesday)).toEqual({
      deadline: 1643101200000,
      deadline_date: '25.01.2022, 11:00:00',
    });
  });
  test('работа готова черерез неделю в понедельник', () => {
    expect(deliveryTime(4380, workDayWednesday)).toEqual({
      deadline: 1643619600000,
      deadline_date: '31.01.2022, 11:00:00',
    });
  });
  test('работа готова черерез 2 недели в пятницу', () => {
    expect(deliveryTime(6540, workDayWednesday)).toEqual({
      deadline: 1643965200000,
      deadline_date: '04.02.2022, 11:00:00',
    });
  });
});
