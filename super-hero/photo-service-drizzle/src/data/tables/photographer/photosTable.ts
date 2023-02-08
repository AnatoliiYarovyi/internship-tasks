import {
  bigint,
  boolean,
  InferModel,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm-pg';
import { albums } from './albumsTable';

export const photos = pgTable('photos', {
  photoId: serial('photo_id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  loaded: boolean('loaded').notNull().default(false),
  photoLink: varchar('photo_link', { length: 200 }).notNull(),
  smallPhotoLink: varchar('small_photo_link', { length: 200 }),
  demoPhotoLink: varchar('demo_photo_link', { length: 200 }),
  smallDemoPhotoLink: varchar('small_demo_photo_link', { length: 200 }),
  albumId: integer('album_id')
    .notNull()
    .references(() => albums.albumId),
  created: timestamp('created'),
});
export type Photos = InferModel<typeof photos>;
