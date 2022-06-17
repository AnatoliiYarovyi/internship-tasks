const axios = require("axios");
const endPoints = require("./endPoints");

let count = null;
async function getOllData() {
  try {
    const arrIsDone = await getArrIsDone(endPoints);
    const { isTrue, isFalse } = filterIsDone(arrIsDone);
    console.log("значений True: ", isTrue);
    console.log("значений False: ", isFalse);
  } catch (error) {
    if (count < 3) {
      console.log(count);
      getOllData();
      count++;
    } else {
      console.log(error);
    }
  }
}

const getArrIsDone = async (type) => {
  return await Promise.all(
    type.map(async (el) => {
      return await axios.get(el).then((resp) => {
        if (resp.data.isDone != undefined) {
          return resp.data.isDone;
        } else if (resp.data.location.isDone != undefined) {
          return resp.data.location.isDone;
        } else if (resp.data.higherEducation.isDone != undefined) {
          return resp.data.higherEducation.isDone;
        }
      });
    })
  );
};

const filterIsDone = (data) => {
  let isTrue = null;
  let isFalse = null;
  data.map((el) => {
    if (el) {
      isTrue++;
    } else {
      isFalse++;
    }
  });
  return { isTrue, isFalse };
};

getOllData();
