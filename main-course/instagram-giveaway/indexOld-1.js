const fs = require('fs/promises');
const path = require('path');

// ------- work with one file -------------------
// const wordsPath = path.join(__dirname, 'db', '200k_words_100x100', 'out0.txt');

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
    const ads = [
      [1, 1, 2, 3, 4],
      [1, 2, 2, 3, 5],
      [1, 2, 3, 3, 6],
      [1, 2, 3, 4, 7],
    ];

    // const sortArr = allWords.flat().slice().sort();
    // ----- находим количество всех словосочетаний ---------------------
    const allCollocation = [...new Set(allWords.flat())];
    console.log('allCollocation =', allCollocation.length); // = 129240

    const uniqueCollocation = await filterValues(allWords);
    console.log('uniqueCollocation =', uniqueCollocation.length); // =

    // const qwe = existInAtLeastTen(allWords);
    // console.log('qwe =', qwe.length);

    // ======================== work with one file ==============================
    // const data = await fs
    //   .readFile(wordsPath)
    //   .then(data => data.toString())
    //   .catch(error => error);
    // const arr = data.split('\n');
    // const sortArr = arr.slice().sort();
    // const { duplicatesArr } = await duplicates(sortArr);
    // const uniqueWords = await uniqueValues(sortArr, duplicatesArr);
    // console.log(uniqueWords);
    // ============================================================
  } catch (error) {
    throw error;
  }
};

getAll();
// ----------------------------------------------------------------------------------------------------------------------------
// функция возвращает масив[[словосочетания файла-1], [словосочетания файла-2], ...]
async function getOllWords(data) {
  return data.reduce((acc, el) => {
    acc.push(el.split('\n'));
    return acc;
  }, []);
}
// ==================================================================================================
async function filterValues(allWords) {
  const unc = allWords.reduce((acc, words) => {
    const sortArr = words.slice().sort();
    const uniqueValueCurrentArr = getUniqueCollocation(sortArr);
    acc.push(uniqueValueCurrentArr);
    return acc;
  }, []);
  const sortArrUnc = unc.flat().sort();
  return getUniqueCollocation(sortArrUnc);
}
// ===================================================================================================
function getUniqueCollocation(sortArr) {
  const { duplicatesArr } = duplicates(sortArr);
  const setSortArr = [...new Set(sortArr)];
  // const { uniqueValuesArr } = uniqueValues(setSortArr, duplicatesArr);
  let uniqueValuesArr = setSortArr.filter(x => !duplicatesArr.includes(x));

  console.log('uniqueValuesArr: ', uniqueValuesArr);
  return uniqueValuesArr;
}
// - функция возвращает масив словосочетаний которые дублируются======================================
function duplicates(sortArr) {
  const duplicatesArr = sortArr.reduce((acc, word, i, arr) => {
    if (arr[i + 1] === word) {
      acc.push(word);
    }
    return acc;
  }, []);
  return {
    duplicatesArr: [...new Set(duplicatesArr)],
  };
}
// - функция возвращает масив уникальных словосочетаний (встречаются только 1раз)======================
function uniqueValues(allCollocation, duplicatesArr) {
  let unicArr = allCollocation;
  // let unicArr = allCollocation.filter(x => !duplicatesArr.includes(x)); // 6sek
  duplicatesArr.map(duplWord => {
    // unicArr = unicArr.filter(uniqWord => uniqWord != duplWord); // 14sek
    unicArr = binarySearch(duplWord, unicArr); // 2sek
  });
  return {
    // uniqueValuesArr: [...new Set(unicArr)],
    uniqueValuesArr: unicArr,
  };
}
// - функция бинарного поиска==========================================================================
function binarySearch(value, unicArr) {
  let returnArr = unicArr;

  let first = 0;
  let last = returnArr.length - 1;
  let middle;
  let found = false;

  while (found == false && first <= last) {
    middle = Math.floor((first + last) / 2);
    if (returnArr[middle] == value) {
      returnArr.splice(middle, 1);
      found = true;
      continue;
    } else if (returnArr[middle] > value) {
      last = middle - 1;
    } else if (returnArr[middle] < value) {
      first = middle + 1;
    }
  }
  return returnArr;
}

// -----------------------------------------------------------------------------------------------------
function existInAtLeastTen(allWords) {
  let unc = [];
  for (let i = 0; i < allWords.length; i++) {
    console.log(`allWords${i} =`, allWords[i]);
    let sortArr = [...new Set(allWords[i])];
    unc.push(sortArr);
  }
  const a = getUniqueElems(unc.flat());
  return a;
}

function getUniqueElems(arr) {
  const res = [];

  const a = arr => {
    const elemToCompare = arr[0];
    const filterResult = arr.filter(item => item !== elemToCompare);
    const countOfArrayBeforeFiltering = arr.length;
    const countOfFilterResult = filterResult.length;
    if (countOfArrayBeforeFiltering - countOfFilterResult >= 10) {
      res.push(elemToCompare);
    }
    return arr.length ? a(filterResult) : res;
  };

  return a(arr);
}

// --------------------------------------------------------
// функция возвращает масив уникальных словосочетаний (встречаются только 1раз)
// async function uniqueValues(arr) {
//   const { duplicatesArr } = await duplicates(arr);
//   console.log(duplicatesArr);
//   const unicArr = [];
//   for (i = 0; i < arr.length; i++) {
//     let currentWord = arr[i];
//     let wordFound = duplicatesArr.includes(currentWord);
//     if (!wordFound) {
//       unicArr.push(currentWord);
//     }
//   }
//   return unicArr;
// }
