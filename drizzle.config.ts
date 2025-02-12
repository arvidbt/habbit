import { type Config } from 'drizzle-kit'

import { env } from '@/env'

const dbCredentials =
  env.NODE_ENV === 'production'
    ? { url: env.TURSO_DATABASE_URL, authToken: env.TURSO_DATABASE_AUTH_TOKEN }
    : { url: env.DATABASE_URL }

export default {
  schema: './src/server/db/schema.ts',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: dbCredentials,
  tablesFilter: ['habbit_*'],
} satisfies Config
