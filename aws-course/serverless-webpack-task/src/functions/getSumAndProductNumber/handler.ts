import { middyfy } from '../../libs/lambda';
import { Event } from './interface';

const handler = async (event: Event) => {
  const value: number = event.body;

  const arrNumber: number[] = [];
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
  const body = {
    getSumAndProductNumber,
  };

  return {
    statusCode: 201,
    body,
  };
};

export const getSumAndProductNumber = middyfy(handler);
