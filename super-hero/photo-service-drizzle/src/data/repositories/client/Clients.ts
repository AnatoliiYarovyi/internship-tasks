import { PgDatabase } from 'drizzle-orm-pg';
import { eq } from 'drizzle-orm/expressions';

import { clients } from '../../tables/client/clientsTable';

export class Clients {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  async getCurrentClientId(phone: string) {
    const data = await this.db
      .select(clients)
      .where(eq(clients.phone, phone))
      .fields({
        id: clients.clientId,
      });
    const { id } = data[0];
    return id;
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  async updateClientsData(phone: string, fullName?: string, email?: string) {
    const data = await this.db
      .update(clients)
      .set({ fullName, email })
      .where(eq(clients.phone, phone));
    return data;
  }

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------

  async writeClients(phone: string) {
    const data = await this.db.insert(clients).values({
      phone,
    });
    return data;
  }
}
