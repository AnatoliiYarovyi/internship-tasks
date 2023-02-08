import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { orderDetails } from '../tables/orderDetailsTable';
import { orders } from '../tables/ordersTable';
import { products } from '../tables/productsTable';
import { shippers } from '../tables/shippersTable';

export class Orders {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const queryTemp = this.db.select(orders).fields({
      RowCount: sql`count(${orders.orderId})`.as<number>(),
    });
    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw.replace(/"/gm, "'");

    return { sqlString, data };
  }

  async getAllOrders(limit: number, page: number) {
    const offset = this.getOffset(limit, page);
    const queryTemp = this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        'Total Price':
          sql`sum(${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount}))`.as<number>(),
        Products: sql`count(${orderDetails.orderId})`.as<number>(),
        Quantity: sql`sum(${orderDetails.quantity})`.as<number>(),
        Shipped: orders.shippedDate,
        'Ship Name': orders.shipName,
        City: orders.shipCity,
        Country: orders.shipCountry,
      })
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .limit(limit)
      .offset(offset)
      .groupBy(orders.orderId);

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace('limit ?', `limit ${limit}`)
      .replace('offset ?', `offset ${offset}`);

    return { sqlString, data };
  }

  async orderInformationById(id: number) {
    const queryTemp = this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        'Customer Id': orders.customerId,
        'Ship Name': orders.shipName,
        'Total Products': sql`count(${orderDetails.orderId})`.as<number>(),
        'Total Quantity': sql`sum(${orderDetails.quantity})`.as<number>(),
        'Total Price':
          sql`sum(${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount}))`.as<number>(),
        'Total Discount':
          sql`sum(${orderDetails.quantity} * ${products.unitPrice} * ${orderDetails.discount})`.as<number>(),
        'Ship Via': shippers.companyName,
        Freight: orders.freight,
        'Order Date': orders.orderDate,
        'Required Date': orders.requiredDate,
        'Shipped Date': orders.shippedDate,
        'Ship City': orders.shipCity,
        'Ship Region': orders.shipRegion,
        'Ship Postal Code': orders.shipPostalCode,
        'Ship Country': orders.shipCountry,
      })
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperId))
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .where(eq(orders.orderId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'OrderID' = ?`, `'OrderID' = ${id}`);

    return { sqlString, data };
  }

  async productsInOrderById(id: number) {
    const queryTemp = this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        ProductId: products.productId,
        Product: products.productName,
        Quantity: orderDetails.quantity,
        'Order Price': products.unitPrice,
        'Total Price':
          sql`${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount})`.as<number>(),
        Discount: sql`100 * ${orderDetails.discount}`,
      })
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .where(eq(orders.orderId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'OrderID' = ?`, `'OrderID' = ${id}`);

    return { sqlString, data };
  }
}
