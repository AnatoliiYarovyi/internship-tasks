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
import { photos } from '../photographer/photosTable';

export const clients_albums = pgTable('clients_albums', {
  clientId: serial('client_id')
    .primaryKey()
    .references(() => clients.clientId),
  albumId: serial('album_id')
    .primaryKey()
    .references(() => photos.photoId),
});
export type ClientsAlbums = InferModel<typeof clients_albums>;
