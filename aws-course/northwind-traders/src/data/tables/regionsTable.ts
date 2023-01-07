import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';

export const regions = sqliteTable('Regions', {
  regionId: integer('RegionID').primaryKey(),
  regionDescription: text('RegionDescription'),
});
export type Regions = InferModel<typeof regions>;
