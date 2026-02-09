import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function runSchoolSync() {
  try {
    console.log('📊 Running school markaz sync from sync_schools_complete.sql...\n');

    // Read the SQL file
    const sqlContent = fs.readFileSync('sync_schools_complete.sql', 'utf-8');

    console.log('SQL file loaded successfully');
    console.log(`File size: ${sqlContent.length} characters\n`);

    // Execute the SQL
    console.log('🔄 Executing SQL updates...\n');

    await db.execute(sql.raw(sqlContent));

    console.log('\n✅ School markaz assignments updated successfully!');
    console.log('\nVerifying updates...\n');

    // Verify the updates
    const schoolsWithMarkaz = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_id) as with_markaz,
        COUNT(*) - COUNT(markaz_id) as without_markaz
      FROM schools
    `);

    const stats = schoolsWithMarkaz[0];
    console.log('='.repeat(100));
    console.log('SCHOOL MARKAZ ASSIGNMENT STATS');
    console.log('='.repeat(100));
    console.log(`Total Schools: ${stats.total}`);
    console.log(`Schools with Markaz: ${stats.with_markaz}`);
    console.log(`Schools without Markaz: ${stats.without_markaz}`);
    console.log('='.repeat(100));

    // Show schools by markaz
    const byMarkaz = await db.execute(sql`
      SELECT
        COALESCE(m.name, 'NO MARKAZ') as markaz,
        COUNT(*) as school_count
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      GROUP BY m.name
      ORDER BY school_count DESC
    `);

    console.log('\nSchools by Markaz:');
    byMarkaz.forEach((row: any) => {
      console.log(`  ${row.markaz}: ${row.school_count} schools`);
    });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.position) {
      console.error(`Error position: ${error.position}`);
    }
  }
  process.exit(0);
}

runSchoolSync();
