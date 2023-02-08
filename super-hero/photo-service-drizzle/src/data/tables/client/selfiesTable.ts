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
