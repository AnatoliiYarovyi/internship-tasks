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
import { clients } from './clientsTable';
import { albums } from '../photographer/albumsTable';
import { photos } from '../photographer/photosTable';

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
