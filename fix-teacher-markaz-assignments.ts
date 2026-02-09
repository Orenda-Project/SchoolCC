import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function fixTeacherMarkazAssignments() {
  try {
    console.log('🔧 Fixing teacher and head teacher markaz assignments...\n');

    // First, check current state
    console.log('Checking current state...');
    const before = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_id) as with_markaz_id,
        COUNT(markaz_name) as with_markaz_name
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
    `);

    console.log('BEFORE:');
    console.log(`  Total Teachers/Head Teachers: ${before[0].total}`);
    console.log(`  With markaz_id: ${before[0].with_markaz_id}`);
    console.log(`  With markaz_name: ${before[0].with_markaz_name}\n`);

    // Update markaz_id and markaz_name for all teachers based on their school
    console.log('🔄 Updating teacher markaz assignments...');

    const result = await db.execute(sql`
      UPDATE users u
      SET
        markaz_id = s.markaz_id,
        markaz_name = m.name
      FROM schools s
      INNER JOIN markazes m ON s.markaz_id = m.id
      WHERE u.school_id = s.id
      AND u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND s.markaz_id IS NOT NULL
    `);

    console.log('✅ Update completed!\n');

    // Check results
    const after = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_id) as with_markaz_id,
        COUNT(markaz_name) as with_markaz_name
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
    `);

    console.log('AFTER:');
    console.log(`  Total Teachers/Head Teachers: ${after[0].total}`);
    console.log(`  With markaz_id: ${after[0].with_markaz_id}`);
    console.log(`  With markaz_name: ${after[0].with_markaz_name}\n`);

    // Show breakdown by markaz
    const byMarkaz = await db.execute(sql`
      SELECT
        markaz_name,
        COUNT(*) as teacher_count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
      AND markaz_name IS NOT NULL
      GROUP BY markaz_name
      ORDER BY teacher_count DESC
    `);

    console.log('='.repeat(80));
    console.log('TEACHERS/HEAD TEACHERS BY MARKAZ:');
    console.log('='.repeat(80));
    byMarkaz.forEach((row: any) => {
      console.log(`  ${row.markaz_name}: ${row.teacher_count} teachers`);
    });

    // Show teachers still without markaz
    const noMarkaz = await db.execute(sql`
      SELECT COUNT(*) as count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
      AND markaz_name IS NULL
    `);

    console.log('\n' + '='.repeat(80));
    console.log(`Teachers still without markaz: ${noMarkaz[0].count}`);

    if (Number(noMarkaz[0].count) > 0) {
      console.log('\n⚠️  These teachers are in schools without markaz assignments.');
      console.log('   Their schools need markaz assignments first.');
    }

    console.log('='.repeat(80));
    console.log('\n✅ Fix completed! AEOs should now see their teachers.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

fixTeacherMarkazAssignments();
