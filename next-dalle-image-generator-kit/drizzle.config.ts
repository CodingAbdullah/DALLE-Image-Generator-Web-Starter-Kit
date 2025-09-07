import type { Config } from 'drizzle-kit';

// Drizzle configuration file for working with the user schema and the Supabase database
export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;