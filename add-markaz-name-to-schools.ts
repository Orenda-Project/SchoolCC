import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function addMarkazNameColumn() {
  try {
    console.log('📊 Adding markaz_name column to schools table...\n');

    // Check if column already exists
    const columnCheck = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'schools'
      AND column_name = 'markaz_name'
    `);

    if (columnCheck.length > 0) {
      console.log('✓ Column markaz_name already exists in schools table');
    } else {
      console.log('Adding markaz_name column...');
      await db.execute(sql`
        ALTER TABLE schools
        ADD COLUMN markaz_name TEXT
      `);
      console.log('✓ Column added successfully');
    }

    // Populate markaz_name from markazes table
    console.log('\n🔄 Populating markaz_name from markazes table...');

    const result = await db.execute(sql`
      UPDATE schools
      SET markaz_name = m.name
      FROM markazes m
      WHERE schools.markaz_id = m.id
    `);

    console.log('✓ Markaz names populated');

    // Verify the update
    const stats = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_name) as with_markaz_name,
        COUNT(*) - COUNT(markaz_name) as without_markaz_name
      FROM schools
    `);

    const stat = stats[0];
    console.log('\n' + '='.repeat(80));
    console.log('VERIFICATION');
    console.log('='.repeat(80));
    console.log(`Total schools: ${stat.total}`);
    console.log(`Schools with markaz_name: ${stat.with_markaz_name}`);
    console.log(`Schools without markaz_name: ${stat.without_markaz_name}`);
    console.log('='.repeat(80));

    // Show sample data
    const sample = await db.execute(sql`
      SELECT name as school_name, emis_number, markaz_id, markaz_name
      FROM schools
      WHERE markaz_name IS NOT NULL
      LIMIT 5
    `);

    console.log('\nSample schools with markaz_name:');
    sample.forEach((school: any) => {
      console.log(`  ${school.school_name}`);
      console.log(`    EMIS: ${school.emis_number}`);
      console.log(`    Markaz ID: ${school.markaz_id}`);
      console.log(`    Markaz Name: ${school.markaz_name}\n`);
    });

    console.log('✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

addMarkazNameColumn();
