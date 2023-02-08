import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { suppliers } from '../tables/suppliersTable';

export class Suppliers {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const queryTemp = this.db.select(suppliers).fields({
      RowCount: sql`count(${suppliers.supplierId})`.as<number>(),
    });

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw.replace(/"/gm, "'");

    return { sqlString, data };
  }

  async getAllSuppliers(limit: number, page: number) {
    const offset = this.getOffset(limit, page);
    const queryTemp = this.db
      .select(suppliers)
      .fields({
        Id: suppliers.supplierId,
        Company: suppliers.companyName,
        Contact: suppliers.contactName,
        Title: suppliers.contactTitle,
        City: suppliers.city,
        Country: suppliers.country,
      })
      .limit(limit)
      .offset(offset);

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace('limit ?', `limit ${limit}`)
      .replace('offset ?', `offset ${offset}`);

    return { sqlString, data };
  }

  async getSupplierById(id: number) {
    const queryTemp = this.db
      .select(suppliers)
      .fields({
        Id: suppliers.supplierId,
        Company: suppliers.companyName,
        Contact: suppliers.contactName,
        Title: suppliers.contactTitle,
        Address: suppliers.address,
        City: suppliers.city,
        Region: suppliers.region,
        'Postal Code': suppliers.postalCode,
        Country: suppliers.country,
        Phone: suppliers.phone,
      })
      .where(eq(suppliers.supplierId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'SupplierID' = ?`, `'SupplierID' = ${id}`);

    return { sqlString, data };
  }
}
