import Boom from '@hapi/boom';

import { Event } from '../../interface/interface';
import { middyfy } from '../../libs/lambda';

import { Photographers } from '../../data/repositories/photographer/Photographers';

const handler = async (event: Event) => {
  const { connection } = event.body;
  const photographer = new Photographers(connection);

  const dataDB = await photographer.getAllPhotographers().catch(error => {
    throw Boom.badImplementation(error);
  });

  return {
    status: 'success',
    message: 'getPhotographersData successful',
    data: dataDB,
  };
};

export const getPhotographersData = middyfy(handler);
