import { InferModel, sqliteTable, text } from 'drizzle-orm-sqlite';

export const customers = sqliteTable('Customers', {
  customerId: text('CustomerID').primaryKey(),
  companyName: text('CompanyName'),
  contactName: text('ContactName'),
  contactTitle: text('ContactTitle'),
  address: text('Address'),
  city: text('City'),
  region: text('Region'),
  postalCode: text('PostalCode'),
  country: text('Country'),
  phone: text('Phone'),
  fax: text('Fax'),
});
export type Customers = InferModel<typeof customers>;
