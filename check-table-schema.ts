import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function checkSchema() {
  try {
    // Check schools table columns
    const schoolColumns = await db.execute(sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'schools'
      ORDER BY ordinal_position
    `);

    console.log('Schools table columns:');
    schoolColumns.forEach((col: any) => {
      console.log(`  - ${col.column_name} (${col.data_type})`);
    });

    // Try to get a sample school
    const sample = await db.execute(sql`
      SELECT *
      FROM schools
      LIMIT 1
    `);

    if (sample.length > 0) {
      console.log('\nSample school columns:');
      console.log(Object.keys(sample[0]));
    }

  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

checkSchema();
