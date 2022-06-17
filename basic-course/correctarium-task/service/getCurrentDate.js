const getCurrentDate = () => {
  const date = new Date();
  const getFullYear = date.getFullYear();
  const getMonth = date.getMonth(); // Возвращает месяц от 0 до 11
  const getDate = date.getDate(); // Возвращает день месяца от 1 до 31
  const getDay = date.getDay(); // Возвращает день недели 0-6 (начало воскресенье = 0)
  const getHours = date.getHours(); // Возвращает час
  const getMinutes = date.getMinutes(); // Возвращает минуты

  return { getFullYear, getMonth, getDate, getDay, getHours, getMinutes };
};

module.exports = getCurrentDate;
