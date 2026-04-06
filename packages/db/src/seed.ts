import { eq } from 'drizzle-orm';
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

  try {
    console.log('Seeding database...');

    const [inserted] = await db
      .insert(schema.users)
      .values({
        email: 'dev@budgetino.app',
        name: 'Dev User',
        avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=budgetino',
      })
      .onConflictDoNothing({ target: schema.users.email })
      .returning();

    const user =
      inserted ??
      (
        await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, 'dev@budgetino.app'))
      )[0];

    if (!user) {
      throw new Error('Failed to find or create seed user.');
    }

    await db
      .insert(schema.userPreferences)
      .values({
        userId: user.id,
        defaultCurrency: 'USD',
        theme: 'system',
        locale: 'en',
      })
      .onConflictDoNothing({ target: schema.userPreferences.userId });

    console.log(`Seeded user: ${user.email} (${user.id})`);
    console.log('Seeding complete.');
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
