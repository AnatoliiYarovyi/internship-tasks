import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq, like } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { customers } from '../tables/customersTable';

export class Customers {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const queryTemp = this.db.select(customers).fields({
      RowCount: sql`count(${customers.customerId})`.as<number>(),
    });

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw.replace(/"/gm, "'");

    return { sqlString, data };
  }

  async getAllCustomers(limit: number, page: number) {
    const offset = this.getOffset(limit, page);
    const queryTemp = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        Company: customers.companyName,
        Contact: customers.contactName,
        Title: customers.contactTitle,
        City: customers.city,
        Country: customers.country,
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

  async getCustomersById(id: string) {
    const queryTemp = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        CompanyName: customers.companyName,
        ContactName: customers.contactName,
        ContactTitle: customers.contactTitle,
        Address: customers.address,
        City: customers.city,
        PostalCode: customers.postalCode,
        Region: customers.region,
        Country: customers.country,
        Phone: customers.phone,
        Fax: customers.fax,
      })
      .where(eq(customers.customerId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'CustomerID' = ?`, `'CustomerID' = ${id}`);

    return { sqlString, data };
  }

  getSearchCustomers = async (value: string) => {
    const queryTemp = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        Name: customers.companyName,
        Contact: customers.contactName,
        Title: customers.contactTitle,
        Phone: customers.phone,
      })
      .where(like(customers.companyName, `%${value}%`));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`like ?`, `like %${value}%`);

    return {
      sqlString,
      data,
    };
  };
}
