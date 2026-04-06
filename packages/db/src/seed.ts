import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Missing environment variable: DATABASE_URL');
  }

  const client = postgres(databaseUrl);
  const db = drizzle(client, { schema });

  console.log('Seeding database...');

  const [user] = await db
    .insert(schema.users)
    .values({
      email: 'dev@budgetino.app',
      name: 'Dev User',
      avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=budgetino',
    })
    .onConflictDoNothing({ target: schema.users.email })
    .returning();

  if (user) {
    await db
      .insert(schema.userPreferences)
      .values({
        userId: user.id,
        defaultCurrency: 'USD',
        theme: 'system',
        locale: 'en',
      })
      .onConflictDoNothing({ target: schema.userPreferences.userId });

    console.log(`Created user: ${user.email} (${user.id})`);
  } else {
    console.log('User already exists, skipping seed.');
  }

  console.log('Seeding complete.');
  await client.end();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
