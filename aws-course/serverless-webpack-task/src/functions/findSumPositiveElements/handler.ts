import { middyfy } from '../../libs/lambda';
import { Event } from './interface';

const handler = async (event: Event) => {
  const arrNumbers = event.body;
  const sumPositiveElement: number = arrNumbers.reduce((acc: number, el) => {
    if (el > 0) {
      acc += el;
    }
    return acc;
  }, 0);
  const body = {
    sumAllPositiveElement: sumPositiveElement,
  };

  return {
    statusCode: 201,
    body,
  };
};

export const findSumPositiveElements = middyfy(handler);
