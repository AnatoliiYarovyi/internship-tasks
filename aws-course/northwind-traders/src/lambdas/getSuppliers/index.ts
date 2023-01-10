import middy from 'middy';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { customJsonBodyParser } from '../../middlewares/customJsonBodyParser';
import { apiGatewayResponse } from '../../middlewares/apiGateWayResponse';
import { connectingToDb } from '../../middlewares/connectingToDb';

import { suppliers } from '../../data/tables/suppliersTable';

async function getSuppliers(event) {
  const connection: BetterSQLite3Database = event.body.connection;

  const data = connection.select(suppliers).all();
  console.log('data', data);

  return 'Hello, this lambda work!';
}

export const handler = middy(getSuppliers)
  .use(customJsonBodyParser())
  .use(connectingToDb())
  .use(apiGatewayResponse());

export default getSuppliers;
