import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function listMarkazes() {
  try {
    console.log('📊 Listing all markazes in database...\n');

    const markazes = await db.execute(sql`
      SELECT id, name
      FROM markazes
      ORDER BY name
    `);

    console.log(`Total markazes: ${markazes.length}\n`);

    markazes.forEach((markaz: any, index: number) => {
      console.log(`${index + 1}. ${markaz.name}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

listMarkazes();
