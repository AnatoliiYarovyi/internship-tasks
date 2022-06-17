const fs = require('fs/promises');
const path = require('path');

// --------work with all files ------------
// const filesPath = path.join(__dirname, 'db', '200k_words_100x100');
const filesPath = path.join(__dirname, 'db', '2kk_words_400x400');

// ==================================================================================================
const getAll = async () => {
  try {
    const data = await fs
      .readdir(filesPath)
      .then(files => {
        return Promise.all(
          files.map(async filename => {
            let wordsPath = path.join(
              __dirname,
              'db',
              // '200k_words_100x100',
              '2kk_words_400x400',
              filename,
            );
            const dataW = await fs
              .readFile(wordsPath)
              .then(data => data.toString())
              .catch(error => error);
            return dataW;
          }),
        );
      })
      .catch(error => error);
    const allWords = await getOllWords(data);

    // ----- находим количество всех словосочетаний ----------------------
    const uniqueValues = [...new Set(allWords.flat())];
    console.log('uniqueValues =', uniqueValues.length); // = 129240

    // const arr = allWords.flat().sort();
    // const existInAllFiles = getUniqueElems(arr);
    // console.log('existInAllFiles =', existInAllFiles.length); // =441
    // const existInAtLeastTen = getExistInAtLeastTen(arr);
    // console.log('existInAtLeastTen =', existInAtLeastTen.length); // =73245

    const { resAll, resTen } = getUniqueElemsAll(allWords);
    console.log('existInAllFiles =', resAll.length);
    console.log('existInAtLeastTen =', resTen.length);
  } catch (error) {
    throw error;
  }
};

getAll();
// ---------------------------------------------------------------------------------------------------------
// функция возвращает масив без дублей [[словосочетания файла-1], [словосочетания файла-2], ...]
async function getOllWords(data) {
  return data.reduce((acc, el) => {
    acc.push([...new Set(el.split('\n'))]);
    return acc;
  }, []);
}

// функция возвращает масив элементов встречающихся 20 раз
function getUniqueElems(arr) {
  const res = [];

  arr.reduce((acc, word, i, arr) => {
    if (acc.slice(-1)[0] != word || i === arr.length - 1) {
      if (acc.length === 19) {
        res.push(acc[0]);
      }
      acc.length = 0;
    }
    if (arr[i + 1] === word) {
      acc.push(word);
    }

    return acc;
  }, []);
  return res;
}

// функция возвращает масив элементов встречающихся 10 раз и более
function getExistInAtLeastTen(arr) {
  const res = [];

  arr.reduce((acc, word, i, arr) => {
    if (acc.slice(-1)[0] != word || i === arr.length - 1) {
      if (acc.length >= 9) {
        res.push(acc[0]);
      }
      acc.length = 0;
    }
    if (arr[i + 1] === word) {
      acc.push(word);
    }
    return acc;
  }, []);
  return res;
}

// функция возвращает масив элементов встречающихся (20 раз) && (10 раз и более)
function getUniqueElemsAll(allWords) {
  const arr = allWords.flat().sort();
  const resAll = [];
  const resTen = [];

  arr.reduce((acc, word, i, arr) => {
    if (acc.slice(-1)[0] != word || i === arr.length - 1) {
      if (acc.length === 19) {
        resAll.push(acc[0]);
      }
      if (acc.length >= 9) {
        resTen.push(acc[0]);
      }
      acc.length = 0;
    }
    if (arr[i + 1] === word) {
      acc.push(word);
    }

    return acc;
  }, []);
  return { resAll, resTen };
}
