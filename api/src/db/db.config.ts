import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import process from 'process';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/db.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING!,
  },
});
