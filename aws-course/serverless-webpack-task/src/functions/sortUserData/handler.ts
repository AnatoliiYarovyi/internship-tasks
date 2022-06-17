import { middyfy } from '../../libs/lambda';
import { Event } from './interface';

const handler = async (event: Event) => {
  const arr = event.body;
  const byField = (field: string) => {
    return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
  };

  const copyArrForSortName = arr.slice(0);
  const sortName = copyArrForSortName.sort(byField('firstName'));

  const copyArrForSortBirthDate = arr.slice(0);
  const sortBirthDate = copyArrForSortBirthDate
    .sort(byField('birthDate'))
    .reverse();
  const body = { sortName, sortBirthDate };

  return {
    statusCode: 201,
    body,
  };
};

export const sortUserData = middyfy(handler);
