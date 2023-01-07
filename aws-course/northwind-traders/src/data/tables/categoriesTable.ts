import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';

export const categories = sqliteTable('Categories', {
  categoryId: integer('CategoryID').primaryKey(),
  categoryName: text('CategoryName'),
  description: text('Description'),
});
export type Category = InferModel<typeof categories>;
