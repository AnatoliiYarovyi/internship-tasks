import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { APPID } = process.env;

const getWindInformation = async (period) => {
  try {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${APPID}&q=Svitlovodsk,UA&units=metric&lang=ua`
    );
    const cityName = data.data.city.name;
    const weatherData = data.data.list;
    let windInformation = getEveryThreeHours(weatherData);
    return `Вітер у ${cityName}` + windInformation;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getEveryThreeHours = (arr) => {
  const weather = arr.reduce((acc, el, i, arr) => {
    const oldDate = i === 0 ? 0 : arr[i - 1].dt_txt.split(" ");
    const date = arr[i].dt_txt.split(" ");
    const time = date[1].replace(":00:00", ":00");
    const { temp } = el.main;
    const sign = temp < 0 ? `-` : `+`;
    const { speed, deg } = el.wind;

    let directionWind;
    if ((deg >= 0 && deg <= 22, 5) || (deg >= 337, 6 && deg <= 360)) {
      directionWind = "↑Пн";
    } else if ((deg >= 22, 6 && deg <= 67, 5)) {
      directionWind = "↗Пн/Сх";
    } else if ((deg >= 67, 6 && deg <= 112, 5)) {
      directionWind = "→Сх";
    } else if ((deg >= 112, 6 && deg <= 157, 5)) {
      directionWind = "↘Пд/Сх";
    } else if ((deg >= 157, 6 && deg <= 202, 5)) {
      directionWind = "↓Пд";
    } else if ((deg >= 202, 6 && deg <= 247, 5)) {
      directionWind = "↙Пд/Зх";
    } else if ((deg >= 247, 6 && deg <= 292, 5)) {
      directionWind = "←Зх";
    } else if ((deg >= 292, 6 && deg <= 237, 5)) {
      directionWind = "↖Пн/Зх";
    }

    if (i === 0 || date[0] !== oldDate[0]) {
      acc += `\n\n${date[0]}:\n  ${time}, ${sign}${Math.round(
        temp
      )}℃, вітер ${speed}м/с, ${directionWind}`;
    } else {
      acc += `\n  ${time}, ${sign}${Math.round(
        temp
      )}℃, вітер ${speed}м/с, ${directionWind}`;
    }
    return acc;
  }, ``);
  return weather;
};

export default getWindInformation;
