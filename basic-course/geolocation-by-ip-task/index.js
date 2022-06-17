const fs = require("fs/promises");
const path = require("path");
const express = require("express");

const index = express();
const { PORT = 3000 } = process.env;

index.use(express.json());

// -- Для самопроверки в body {"ip": "188.163.53.81"} -----
index.post("/", async function (req, res) {
  try {
    const currentIP = req.body.ip;
    const { countryIP, countryIP2SistemStart, countryIP2SistemEnd } =
      await getAll(currentIP);
    res.json({
      data: {
        startIP: countryIP2SistemStart,
        endIP: countryIP2SistemEnd,
        shortNameCountry: countryIP.shortNameCountry,
        fullNameCountry: countryIP.fullNameCountry,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
// -- Определяет IP автоматически ---
index.get("/", async function (req, res) {
  try {
    const currentIP =
      req.header("x-forwarded-for") || req.connection.remoteAddress;
    const { countryIP, countryIP2SistemStart, countryIP2SistemEnd } =
      await getAll(currentIP);
    res.json({
      data: {
        startIP: countryIP2SistemStart,
        endIP: countryIP2SistemEnd,
        shortNameCountry: countryIP.shortNameCountry,
        fullNameCountry: countryIP.fullNameCountry,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
// --------work with files ------------
const filesPath = path.join(__dirname, "db-ip");

// -------------------------------------------------
const getAll = async (currentIP) => {
  try {
    const data = await fs
      .readdir(filesPath)
      .then((files) => {
        return Promise.all(
          files.map(async (filename) => {
            let wordsPath = path.join(__dirname, "db-ip", filename);
            const dataW = await fs
              .readFile(wordsPath)
              .then((data) => data.toString())
              .catch((error) => error);
            return dataW;
          })
        );
      })
      .catch((error) => error);
    const arrLineIP = await getArrLineIP(data);
    const allArrIP = await getArrIP(arrLineIP);
    const arrIP = await getIP(allArrIP);
    const currentIP10 = await getCurrentIP10(currentIP);
    const countryIP = await getCountry(arrIP, currentIP10);
    const countryIP2SistemStart = await getCountryIP2Sistem(countryIP.startIP);
    const countryIP2SistemEnd = await getCountryIP2Sistem(countryIP.endIP);

    return { countryIP, countryIP2SistemStart, countryIP2SistemEnd };
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------------------------------------------------
// функция возвращает масив строк ['"start-IP, end-IP, shortNameCountry, fullNameCountry"', '"..."', '"..."', ]
async function getArrLineIP(data) {
  return data.reduce((acc, el) => {
    acc = el.split("\r\n");
    return acc;
  }, []);
}
// функция возвращает масив масивов[['start-IP', 'end-IP', 'shortNameCountry', 'fullNameCountry'], [...], [...], ]
async function getArrIP(data) {
  return data.reduce((acc, el) => {
    acc.push(el.replace(/"/g, "").split(","));
    return acc;
  }, []);
}
// функция возвращает масив объектов [{start-IP, end-IP, shortNameCountry, fullNameCountry}, {...}, {...}, ]
async function getIP(data) {
  return data.reduce((acc, el) => {
    acc.push({
      startIP: Number(el[0]),
      endIP: Number(el[1]),
      shortNameCountry: el[2],
      fullNameCountry: el[3],
    });
    return acc;
  }, []);
}
// функция преобразовывает IP в десятичную систему счисления
async function getCurrentIP10(currentIP) {
  const arrCurrentIP = currentIP.split(".");
  return arrCurrentIP.reduce((acc, el, i) => {
    const numEl = Number(el);
    switch (i) {
      case 0:
        acc += numEl * Math.pow(256, 3);
        break;

      case 1:
        acc += numEl * Math.pow(256, 2);
        break;

      case 2:
        acc += numEl * 256;
        break;

      case 3:
        acc += numEl;
        break;

      default:
        console.log("Invalid type");
    }
    return acc;
  }, 0);
}
// функция отдает данные о IP
async function getCountry(arrIP, currentIP10) {
  return arrIP.reduce((acc, el) => {
    if (currentIP10 >= el.startIP && currentIP10 <= el.endIP) {
      acc = el;
    }
    return acc;
  }, {});
}
//  функция отдает IP в человеческом виде
async function getCountryIP2Sistem(IP10) {
  let IP = [];
  for (let i = 0; i < 4; i++) {
    switch (i) {
      case 0:
        IP[i] = IP[0] = Math.floor(IP10 / Math.pow(256, 3));
        break;

      case 1:
        IP[i] = Math.floor(
          (IP10 - IP[0] * Math.pow(256, 3)) / Math.pow(256, 2)
        );
        break;

      case 2:
        IP[i] = Math.floor(
          (IP10 - IP[0] * Math.pow(256, 3) - IP[1] * Math.pow(256, 2)) / 256
        );
        break;

      case 3:
        IP[i] =
          IP10 -
          IP[0] * Math.pow(256, 3) -
          IP[1] * Math.pow(256, 2) -
          IP[2] * 256;
        break;

      default:
        console.log("Invalid type IP");
    }
  }
  return `${IP[0]}.${IP[1]}.${IP[2]}.${IP[3]}`;
}

index.listen(PORT, () => {
  console.log(`Server srart on port=${PORT} ...`);
});
