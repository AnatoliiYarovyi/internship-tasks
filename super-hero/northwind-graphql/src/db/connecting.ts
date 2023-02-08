import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm-sqlite/better-sqlite3';
import Database from 'better-sqlite3';

export function connecting(): BetterSQLite3Database {
  const sqlite = new Database('northwind.db');
  const db: BetterSQLite3Database = drizzle(sqlite);

  return db;
}
