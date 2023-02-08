import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';
import { categories } from './categoriesTable';
import { suppliers } from './suppliersTable';

export const products = sqliteTable('Products', {
  productId: integer('ProductID').primaryKey(),
  productName: text('ProductName'),
  supplierId: integer('SupplierID').references(() => suppliers.supplierId),
  categoryId: integer('CategoryID').references(() => categories.categoryId),
  quantityPerUnit: text('QuantityPerUnit'),
  unitPrice: integer('UnitPrice'),
  unitsInStock: integer('UnitsInStock'),
  unitsOnOrder: integer('UnitsOnOrder'),
  reorderLevel: integer('ReorderLevel'),
  discontinued: integer('Discontinued'),
});
export type Products = InferModel<typeof products>;
