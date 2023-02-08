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

export const clients = pgTable('clients', {
  clientId: serial('client_id').primaryKey(),
  phone: varchar('phone', { length: 15 }).notNull(),
  fullName: varchar('full_name', { length: 50 }),
  email: varchar('email', { length: 50 }),
  created: timestamp('created'),
});
export type Clients = InferModel<typeof clients>;
