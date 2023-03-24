const {
  PRICE_PER_CHARACTER,
  MIN_PRICE_PER_CHARACTER,
  PRICE_PER_CHARACTER_EN,
  MIN_PRICE_PER_CHARACTER_EN,
} = require('./variables');

const costCalculation = file => {
  const { mimetype, language, count } = file;
  function calculation() {
    let price = null;
    if (language === 'ua' || language === 'ru') {
      price = count * PRICE_PER_CHARACTER;
      if (price < MIN_PRICE_PER_CHARACTER) {
        price = MIN_PRICE_PER_CHARACTER;
      }
    } else if (language === 'en') {
      price = count * PRICE_PER_CHARACTER_EN;
      if (price < MIN_PRICE_PER_CHARACTER_EN) {
        price = MIN_PRICE_PER_CHARACTER_EN;
      }
    }
    if (mimetype != 'doc' && mimetype != 'docx' && mimetype != 'rtf') {
      price = price * 1.2;
    }
    return Number(price.toFixed(2));
  }
  return calculation();
};

module.exports = costCalculation;
