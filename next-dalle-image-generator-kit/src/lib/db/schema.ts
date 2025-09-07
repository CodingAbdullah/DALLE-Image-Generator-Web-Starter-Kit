import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// Sample User Pictures Schema
export const userPictures = pgTable('user_pictures', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  clerkUserId: text('clerk_user_id').notNull(),
  search: text('search').notNull(),
  size: text('size').notNull(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});