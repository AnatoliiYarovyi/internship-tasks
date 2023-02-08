import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { like } from 'drizzle-orm/expressions';

import connecting from '../../db/connecting';
import { cities } from '../tables/citiesTable';

export class Cities {
  private db: BetterSQLite3Database = connecting();

  async getCities(value: string) {
    const results = this.db
      .select(cities)
      .fields({
        suggestion: cities.cityName,
      })
      .where(like(cities.cityName, `${value}%`))
      .all();

    return results;
  }

  async getState(value: string) {
    const results = this.db
      .select(cities)
      .fields({
        suggestion: cities.state,
      })
      .where(like(cities.state, `${value}%`))
      .groupBy(cities.state)
      .all();

    return results;
  }
}
