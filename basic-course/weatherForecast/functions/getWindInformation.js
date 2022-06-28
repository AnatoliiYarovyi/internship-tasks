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
    if (deg <= 25 || (deg >= 336 && deg <= 360)) {
      directionWind = "↑с";
    } else if (deg >= 26 && deg <= 65) {
      directionWind = "↗с/в";
    } else if (deg >= 66 && deg <= 115) {
      directionWind = "→в";
    } else if (deg >= 116 && deg <= 155) {
      directionWind = "↘ю/в";
    } else if (deg >= 156 && deg <= 205) {
      directionWind = "↓ю";
    } else if (deg >= 206 && deg <= 245) {
      directionWind = "↙ю/з";
    } else if (deg >= 246 && deg <= 295) {
      directionWind = "←з";
    } else if (deg >= 296 && deg <= 235) {
      directionWind = "↖с/з";
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
