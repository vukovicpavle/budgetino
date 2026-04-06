import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;
let _client: ReturnType<typeof postgres> | undefined;

export function getDb() {
  if (_db) {
    return _db;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Missing environment variable: DATABASE_URL');
  }

  _client = postgres(databaseUrl);
  _db = drizzle(_client, { schema });

  return _db;
}
