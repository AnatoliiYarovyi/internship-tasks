import { PgDatabase } from 'drizzle-orm-pg';
import { eq } from 'drizzle-orm/expressions';

import { photographers } from '../../tables/photographer/photographersTable';

export class Photographers {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  // -----------------------------------
  // ***** SELECT *****
  // -----------------------------------

  /* queryPhotographersData */
  async getAllPhotographers() {
    const data = await this.db.select(photographers).fields({
      id: photographers.photographerId,
      nickname: photographers.nickname,
      fullName: photographers.fullName,
      email: photographers.email,
    });
    return data;
  }

  /* queryCurrentPhtographerId */
  async getCurrentPhtographerId(nickname: string) {
    const data = await this.db
      .select(photographers)
      .where(eq(photographers.nickname, nickname))
      .fields({
        id: photographers.photographerId,
      });

    const { id } = data[0];
    return id;
  }

  // -----------------------------------
  //  ***** UPDATE *****
  // -----------------------------------

  // -----------------------------------
  //  ***** INSERT *****
  // -----------------------------------

  /* writePhotographerToDB */
  async writePhotographer(
    nickname: string,
    fullName?: string,
    email?: string,
    phone?: string,
  ) {
    const data = await this.db.insert(photographers).values({
      nickname,
      fullName,
      email,
      phone,
    });
    return data;
  }
}
