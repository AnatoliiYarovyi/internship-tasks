import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';

export const shippers = sqliteTable('Shippers', {
  shipperId: integer('ShipperID').primaryKey(),
  companyName: text('CompanyName'),
  phone: text('Phone'),
});
export type Shippers = InferModel<typeof shippers>;
