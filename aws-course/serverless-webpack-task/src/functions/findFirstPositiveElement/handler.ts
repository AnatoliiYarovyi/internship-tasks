import { middyfy } from '../../libs/lambda';
import { Event } from './interface';

const handler = async (event: Event) => {
  const arrNumbers = event.body;
  const firstPositiveElement = arrNumbers.find(el => el > 0);
  const indexFirstPositiveElement = arrNumbers.findIndex(
    el => el === firstPositiveElement,
  );
  const body = {
    firstPositiveElement,
    indexFirstPositiveElement,
  };

  return {
    statusCode: 201,
    body,
  };
};

export const findFirstPositiveElement = middyfy(handler);
