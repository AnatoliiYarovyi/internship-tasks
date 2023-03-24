const {
  MIN_TIME_TEXT_EDITING,
  START_TIME_TEXT_EDITING,
  CHARACTER_PER_HOUR,
  CHARACTER_PER_HOUR_EN,
} = require('./variables');

const workingTime = file => {
  const { mimetype, language, count } = file;
  function calculation() {
    let taskTimeInMinutes = null;
    if (language === 'ua' || language === 'ru') {
      taskTimeInMinutes = Math.floor(
        (count / CHARACTER_PER_HOUR) * 60 + START_TIME_TEXT_EDITING,
      );
      if (taskTimeInMinutes < MIN_TIME_TEXT_EDITING) {
        taskTimeInMinutes = MIN_TIME_TEXT_EDITING;
      }
    } else if (language === 'en') {
      taskTimeInMinutes = Math.floor(
        (count / CHARACTER_PER_HOUR_EN) * 60 + START_TIME_TEXT_EDITING,
      );
      if (taskTimeInMinutes < MIN_TIME_TEXT_EDITING) {
        taskTimeInMinutes = MIN_TIME_TEXT_EDITING;
      }
    }
    if (mimetype != 'doc' && mimetype != 'docx' && mimetype != 'rtf') {
      taskTimeInMinutes = taskTimeInMinutes * 1.2;
    }
    return taskTimeInMinutes;
  }
  return calculation();
};

module.exports = workingTime;
