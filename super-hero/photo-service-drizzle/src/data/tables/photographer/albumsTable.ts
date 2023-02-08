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
import { photographers } from './photographersTable';

export const albums = pgTable('albums', {
  albumId: serial('album_id').primaryKey(),
  albumName: varchar('album_name', { length: 100 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  specifiedTimestamp: bigint('specified_timestamp', {
    mode: 'number',
  }).notNull(),
  photographerId: integer('photographer_id')
    .notNull()
    .references(() => photographers.photographerId),
  albumCoverLink: varchar('album_cover_link', { length: 200 }),
  created: timestamp('created'),
});
export type Albums = InferModel<typeof albums>;
