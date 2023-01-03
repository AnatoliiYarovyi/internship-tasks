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

export const photographers = pgTable('photographers', {
  photographerId: serial('photographer_id').primaryKey(),
  nickname: varchar('nickname', { length: 55 }).notNull(),
  fullName: varchar('full_name', { length: 60 }),
  email: varchar('email', { length: 35 }),
  phone: varchar('phone', { length: 15 }),
  created: timestamp('created'),
});
export type Photographers = InferModel<typeof photographers>;

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

export const selfies = pgTable('selfies', {
  selfieId: serial('selfie_id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  loaded: boolean('loaded').notNull().default(false),
  selfieLink: varchar('selfie_link', { length: 200 }).notNull(),
  clientId: integer('client_id')
    .notNull()
    .references(() => clients.clientId),
  created: timestamp('created'),
});
export type Selfies = InferModel<typeof selfies>;

export const clients = pgTable('clients', {
  clientId: serial('client_id').primaryKey(),
  phone: varchar('phone', { length: 15 }).notNull(),
  fullName: varchar('full_name', { length: 50 }),
  email: varchar('email', { length: 50 }),
  created: timestamp('created'),
});
export type Clients = InferModel<typeof clients>;

export const clients_photos = pgTable('clients_photos', {
  clientId: serial('client_id')
    .primaryKey()
    .references(() => clients.clientId),
  photoId: serial('photo_id')
    .primaryKey()
    .references(() => photos.photoId),
  albumId: integer('album_id')
    .notNull()
    .references(() => albums.albumId),
  unlocked: boolean('unlocked').notNull().default(false),
});
export type ClientsPhotos = InferModel<typeof clients_photos>;

export const clients_albums = pgTable('clients_albums', {
  clientId: serial('client_id')
    .primaryKey()
    .references(() => clients.clientId),
  albumId: serial('album_id')
    .primaryKey()
    .references(() => photos.photoId),
});
export type ClientsAlbums = InferModel<typeof clients_albums>;
