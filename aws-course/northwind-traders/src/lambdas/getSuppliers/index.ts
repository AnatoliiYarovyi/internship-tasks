import middy from 'middy';

import { customJsonBodyParser } from '../../middlewares/customJsonBodyParser';
import { apiGatewayResponse } from '../../middlewares/apiGateWayResponse';

async function getSuppliers() {
  return 'Hello, this lambda work!';
}

export const handler = middy(getSuppliers)
  .use(customJsonBodyParser())
  .use(apiGatewayResponse());

export default getSuppliers;
