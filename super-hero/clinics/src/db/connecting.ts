import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm-sqlite/better-sqlite3';
import Database from 'better-sqlite3';

const connecting = () => {
  const sqlite = new Database('clinics.db');
  const db: BetterSQLite3Database = drizzle(sqlite);

  return db;
};

export default connecting;
