import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm-sqlite/better-sqlite3';
import Database from 'better-sqlite3';

export const connectingToDb = () => {
  const before = async (request): Promise<void> => {
    const sqlite = new Database('northwind.db');
    const db: BetterSQLite3Database = drizzle(sqlite);

    if (request.event.body !== null) {
      request.event.body.connection = db;
    } else {
      request.event.body = {
        connection: db,
      };
    }
    console.log('\n*** request in middlewareConnectionDB: ***', request);
  };

  return { before };
};
