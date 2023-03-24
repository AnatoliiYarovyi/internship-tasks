const { START_WORKING_DAY, END_WORKING_DAY } = require('./variables');

const deliveryTime = (taskTimeInMinutes, currentDate) => {
  const { getFullYear, getMonth, getDate, getDay, getHours, getMinutes } =
    currentDate;

  let endMinutes = getMinutes;
  let endHours = getHours;
  let endDate = getDate;
  let dayWeek = getDay;

  // ---- узнаем сколько часов осталось работать (сб, вс - выходной) ---------
  let timeLeftWork = 9;
  if (
    getDay != 6 &&
    getDay != 0 &&
    getHours > START_WORKING_DAY &&
    getHours < END_WORKING_DAY
  ) {
    timeLeftWork =
      END_WORKING_DAY - getHours - Number((getMinutes / 60).toFixed(2));
  }

  // -сколько часов нужно для выполнения задания за вычетом рабочих часов сегоднешнего дня
  let hourLeft = null;
  if (getDay != 6 && getDay != 0) {
    hourLeft = Number((taskTimeInMinutes / 60).toFixed(2)) - timeLeftWork;
  } else {
    hourLeft = Number((taskTimeInMinutes / 60).toFixed(2));
  }
  // - если оставшегося времени для выполнения задания хватает
  if (hourLeft <= 0) {
    endMinutes +=
      (taskTimeInMinutes / 60 - Math.floor(taskTimeInMinutes / 60)) * 60;
    endHours += Math.floor(taskTimeInMinutes / 60);
    // -переносим работу с выходных на будние дни
    if (dayWeek === 0) {
      endDate += 1;
    }
    if (dayWeek === 6) {
      endDate += 2;
    }
    if (dayWeek === 6 || dayWeek === 0) {
      endMinutes =
        (taskTimeInMinutes / 60 - Math.floor(taskTimeInMinutes / 60)) * 60;
      endHours = START_WORKING_DAY + Math.floor(taskTimeInMinutes / 60);
    }
  }
  // - если оставшегося времени для выполнения задания НЕ хватает
  if (hourLeft > 0) {
    // - так как hourLeft это время которое осталось за вычетом рабочих часов
    // поэтому добавляем +1 к дате и дню недели
    endDate += 1;
    dayWeek += 1;
    if (dayWeek === 6) {
      endDate += 2;
      dayWeek = 0;
    } else if (dayWeek === 0 || dayWeek === 7) {
      endDate += 1;
      dayWeek = 0;
    }

    if (hourLeft / 9 < 1) {
      endMinutes = (hourLeft - Math.floor(hourLeft)) * 60;
      endHours = START_WORKING_DAY + Math.floor(hourLeft);
    }
    if (hourLeft / 9 >= 1) {
      // -сколько дней нужно для выполнения задания
      const dayLeft = Math.floor(hourLeft / 9);
      // - добавляем выходные дни
      if (dayWeek + dayLeft >= 5) {
        const balanceWorkDay = 5 - dayWeek;
        const balanceDay = dayLeft - balanceWorkDay;
        if (dayLeft - balanceDay <= 5) {
          endDate += 2;
        }
        if (balanceDay / 5 >= 1) {
          endDate += 2 * Math.floor(dayLeft / 5);
        }
        // убираем лишние выходные
        if (getDay != 1 && dayLeft >= 10) {
          endDate -= 2;
        }
      }
      // -оставшиеся часы поле вычета от сумарного времени рабочих дней по 9 часов
      const hoursLeftWorkDay = hourLeft - dayLeft * 9;

      endMinutes = (hoursLeftWorkDay - Math.floor(hoursLeftWorkDay)) * 60;
      endHours = START_WORKING_DAY + Math.floor(hoursLeftWorkDay);
      endDate += dayLeft;
    }
  }
  //год, месяц (начинается с 0), день, часы, минуты, секунды и миллисекунды
  const deadline = new Date(
    getFullYear,
    getMonth,
    endDate,
    endHours,
    endMinutes,
  );

  return {
    deadline: deadline.getTime(), //UNIX таймстемп в секундах
    deadline_date: deadline.toLocaleString(),
  };
};

module.exports = deliveryTime;
