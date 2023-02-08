import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';

export const cities = sqliteTable('cities', {
  citySlug: text('city_slug').notNull(),
  cityName: text('city_name').notNull(),
  state: text('state').notNull(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  h1: text('H1').notNull(),
  h2: text('H2').notNull(),
  subHeadingText: text('sub_heading_text').notNull(),
  tick1: text('tick_1').notNull(),
  tick2: text('tick_2').notNull(),
  tick3: text('tick_3').notNull(),
  aboutBookphysio: text('about_bookphysio').notNull(),
});
export type Сities = InferModel<typeof cities>;
