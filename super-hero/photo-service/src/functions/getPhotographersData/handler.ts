import Boom from '@hapi/boom';

import { Event } from '../../interface/interface';
import { middyfy } from '../../libs/lambda';
import queryPhotographersData from '../../repositories/queryPhotographersData';

const handler = async (event: Event) => {
  const { connection } = event.body;

  const dataDB = await queryPhotographersData(connection).catch(error => {
    throw Boom.badImplementation(error);
  });

  return {
    status: 'success',
    message: 'getPhotographersData successful',
    data: dataDB,
  };
};

export const getPhotographersData = middyfy(handler);
