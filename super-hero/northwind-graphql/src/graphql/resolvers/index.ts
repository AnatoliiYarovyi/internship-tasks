import { customers } from './customers';
import { employees } from './employees';
import { orders } from './orders';
import { products } from './products';
import { suppliers } from './suppliers';

const resolvers = {
  Query: { ...customers, ...employees, ...orders, ...products, ...suppliers },
};

export default resolvers;
