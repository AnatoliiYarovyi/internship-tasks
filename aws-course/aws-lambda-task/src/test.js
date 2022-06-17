const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});

const firstPositiveElementPath = '/first-positive-element';
const sumPositiveElementsPath = '/sum-positive-elements';
const sumProductNumber = '/sum-product-number';
const indexNumberDayPath = '/index-number-day';
const sortDataPath = '/sort-data';

exports.handler = async function (event) {
  console.log('Request event: ', event);
  let response;

  switch (true) {
    case event.httpMethod === 'POST' && event.path === firstPositiveElementPath:
      response = findFirstPositiveElement(JSON.parse(event.body));
      break;

    case event.httpMethod === 'POST' && event.path === sumPositiveElementsPath:
      response = findSumPositiveElements(JSON.parse(event.body));
      break;

    case event.httpMethod === 'POST' && event.path === sumProductNumber:
      response = getSumAndProductNumber(JSON.parse(event.body));
      break;

    case event.httpMethod === 'GET' && event.path === indexNumberDayPath:
      response = getIndexNumber();
      break;

    case event.httpMethod === 'POST' && event.path === sortDataPath:
      response = sortUserData(JSON.parse(event.body));
      break;

    default:
      response = buildResponse(404, '404 Not Found');
      break;
  }
  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-type': 'aaplication/json',
    },
    body: JSON.stringify(body),
  };
}

function findFirstPositiveElement(arr) {
  const firstPositiveElement = arr.find(el => el > 0);
  const indexFirstPositiveElement = arr.findIndex(
    el => el === firstPositiveElement,
  );

  const body = {
    firstPositiveElement,
    indexFirstPositiveElement,
  };

  return buildResponse(201, body);
}

function findSumPositiveElements(arr) {
  const sumPositiveElement = arr.reduce((acc, el) => {
    if (el > 0) {
      acc += el;
    }
    return acc;
  }, 0);

  const body = {
    sumAllPositiveElement: sumPositiveElement,
  };
  return buildResponse(201, body);
}

function getSumAndProductNumber(value) {
  const arrNumber = [];
  for (let i = 1; i <= value; i++) {
    arrNumber.push(i);
  }
  const getSumAndProductNumber = arrNumber.reduce(
    (acc, el, i) => {
      if (i < value) {
        acc.sumNumber += el;
        acc.productNumber *= el;
      }
      return acc;
    },
    { sumNumber: 0, productNumber: 1 },
  );
  return buildResponse(201, getSumAndProductNumber);
}

function getIndexNumber() {
  const dateStart = new Date('January 1, 2022 00:00:01');
  const dateToday = new Date();
  const elapsedMilliseconds = dateToday.getTime() - dateStart.getTime();
  const indexNumber = Math.floor(elapsedMilliseconds / 86400000);

  const body = {
    dayOfTheYear: indexNumber,
  };
  return buildResponse(200, body);
}

function sortUserData(arr) {
  const byField = field => {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  };

  const copyArrForSortName = arr.slice(0);
  const sortName = copyArrForSortName.sort(byField('firstName'));

  const copyArrForSortBirthDate = arr.slice(0);
  const sortBirthDate = copyArrForSortBirthDate
    .sort(byField('birthDate'))
    .reverse();

  const body = { sortName, sortBirthDate };
  return buildResponse(201, body);
}
