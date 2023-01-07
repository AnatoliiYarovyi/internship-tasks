import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';
import { regions } from './regionsTable';

export const territories = sqliteTable('Territories', {
  territoryId: text('TerritoryID').primaryKey(),
  territoryDescription: text('TerritoryDescription'),
  regionId: integer('RegionID').references(() => regions.regionId),
});
export type Territories = InferModel<typeof territories>;
