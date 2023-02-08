import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { like } from 'drizzle-orm/expressions';

import connecting from '../../db/connecting';
import { suburbs } from '../tables/suburbsTable';

export class Suburbs {
  private db: BetterSQLite3Database = connecting();

  async getSuburbs(value: string) {
    const results = this.db
      .select(suburbs)
      .fields({
        suggestion: suburbs.suburbName,
      })
      .where(like(suburbs.suburbName, `${value}%`))
      .groupBy(suburbs.suburbName)
      .all();

    return results;
  }

  async getPostcode(value: string) {
    const results = this.db
      .select(suburbs)
      .fields({
        suggestion: suburbs.postcode,
      })
      .where(like(suburbs.postcode, `${value}%`))
      .groupBy(suburbs.postcode)
      .all();

    return results;
  }
}
