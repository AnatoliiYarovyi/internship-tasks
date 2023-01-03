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
