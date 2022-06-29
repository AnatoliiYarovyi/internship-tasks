import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { APPID } = process.env;

const getWeather = async (period) => {
  try {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${APPID}&q=Svitlovodsk,UA&units=metric&lang=ua`
    );
    const cityName = data.data.city.name;
    const weatherData = data.data.list;
    let weather = "";
    if (period === 3) {
      weather = getEveryThreeHours(weatherData);
    } else {
      weather = getEverySixHours(weatherData);
    }
    return `Погода у ${cityName}` + weather;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getEveryThreeHours = (arr) => {
  const weather = arr.reduce((acc, el, i, arr) => {
    const oldDate = i === 0 ? 0 : arr[i - 1].dt_txt.split(" ");
    const date = arr[i].dt_txt.split(" ");
    const time = date[1].replace(":00:00", ":00");
    const { temp, feels_like } = el.main;
    const sign = temp < 0 ? `-` : `+`;
    const weatherDescription = el.weather[0].description;

    if (i === 0 || date[0] !== oldDate[0]) {
      acc += `\n\n${date[0]}:\n  ${time}, ${sign}${Math.round(
        temp
      )}℃, відчувається як ${sign}${Math.round(
        feels_like
      )}℃, ${weatherDescription}`;
    } else {
      acc += `\n  ${time}, ${sign}${Math.round(
        temp
      )}℃, відчувається як ${sign}${Math.round(
        feels_like
      )}℃, ${weatherDescription}`;
    }
    return acc;
  }, ``);
  return weather;
};

const getEverySixHours = (arr) => {
  let repeat = 0;
  const weather = arr.reduce((acc, el, i, arr) => {
    const oldDate = i === 0 ? 0 : arr[i - 1].dt_txt.split(" ");
    const date = arr[i].dt_txt.split(" ");
    const time = date[1].replace(":00:00", ":00");
    const { temp, feels_like } = el.main;
    const sign = temp < 0 ? `-` : `+`;
    const weatherDescription = el.weather[0].description;

    if (
      time === "00:00" ||
      time === "06:00" ||
      time === "12:00" ||
      time === "18:00"
    ) {
      if (repeat === 0 || date[0] !== oldDate[0]) {
        repeat = 1;
        acc += `\n\n${date[0]}:\n  ${time}, ${sign}${Math.round(
          temp
        )}℃, відчувається як ${sign}${Math.round(
          feels_like
        )}℃, ${weatherDescription}`;
      } else {
        acc += `\n  ${time}, ${sign}${Math.round(
          temp
        )}℃, відчувається як ${sign}${Math.round(
          feels_like
        )}℃, ${weatherDescription}`;
      }
    }
    return acc;
  }, ``);
  return weather;
};

export { getWeather };
