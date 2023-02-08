import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';
import { products } from './productsTable';

export const orderDetails = sqliteTable('OrderDetails', {
  orderId: integer('OrderID').primaryKey(),
  productId: integer('ProductID').references(() => products.productId),
  unitPrice: integer('UnitPrice'),
  quantity: integer('Quantity'),
  discount: integer('Discount'),
});
export type OrderDetails = InferModel<typeof orderDetails>;
