import { PgDatabase } from 'drizzle-orm-pg';
import { eq } from 'drizzle-orm/expressions';

import { Clients } from './Clients';
import { selfies } from '../../tables/client/selfiesTable';

export class Selfies {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  async updateSelfiesLoaded(selfiName: string) {
    const data = await this.db
      .update(selfies)
      .set({ loaded: true })
      .where(eq(selfies.name, selfiName));
    return data;
  }

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------

  async writeClientsSelfieLink(
    nickname: string,
    name: string,
    selfieLink: string,
  ) {
    const clients = new Clients(this.db);
    const clientId = await clients.getCurrentClientId(nickname);

    const data = await this.db.insert(selfies).values({
      name,
      selfieLink,
      clientId,
    });
    return data;
  }
}
