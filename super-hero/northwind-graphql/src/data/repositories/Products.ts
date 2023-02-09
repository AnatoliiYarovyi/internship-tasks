import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq, like } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { products } from '../tables/productsTable';
import { suppliers } from '../tables/suppliersTable';

export class Products {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const queryTemp = this.db.select(products).fields({
      RowCount: sql`count(${products.productId})`.as<number>(),
    });

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw.replace(/"/gm, "'");

    return { sqlString, data };
  }

  async getAllProducts(limit: number, page: number) {
    const offset = this.getOffset(limit, page);
    const queryTemp = this.db
      .select(products)
      .fields({
        Id: products.productId,
        Name: products.productName,
        QtPerUnit: products.quantityPerUnit,
        Price: products.unitPrice,
        Stock: products.unitsInStock,
        Orders: products.unitsOnOrder,
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

  async getProductById(id: number) {
    const queryTemp = this.db
      .select(products)
      .fields({
        Id: products.productId,
        ProductName: products.productName,
        SupplierId: suppliers.supplierId,
        Supplier: suppliers.companyName,
        QuantityPerUnit: products.quantityPerUnit,
        UnitPrice: products.unitPrice,
        UnitsInStock: products.unitsInStock,
        UnitsOnOrder: products.unitsOnOrder,
        ReorderLevel: products.reorderLevel,
        Discontinued: products.discontinued,
      })
      .leftJoin(suppliers, eq(products.supplierId, suppliers.supplierId))
      .where(eq(products.productId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'ProductID' = ?`, `'ProductID' = ${id}`);

    return { sqlString, data };
  }

  getSearchProducts = async (value: string) => {
    const queryTemp = this.db
      .select(products)
      .fields({
        Id: products.productId,
        Name: products.productName,
        QtPerUnit: products.quantityPerUnit,
        Price: products.unitPrice,
        Stock: products.unitsInStock,
      })
      .where(like(products.productName, `%${value}%`));

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
