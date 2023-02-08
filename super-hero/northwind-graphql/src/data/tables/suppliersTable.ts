import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';

export const suppliers = sqliteTable('Suppliers', {
  supplierId: integer('SupplierID').primaryKey(),
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
  homePage: text('HomePage'),
});
export type Suppliers = InferModel<typeof suppliers>;
