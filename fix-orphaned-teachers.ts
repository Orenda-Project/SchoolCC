import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function fixOrphanedTeachers() {
  try {
    console.log('🔧 Fixing teachers with incorrect school_id references...\n');

    // Find teachers whose school_id doesn't match any school
    console.log('Finding teachers with incorrect school_id...');
    const orphanedTeachers = await db.execute(sql`
      SELECT
        u.id,
        u.name as teacher_name,
        u.role,
        u.school_id as old_school_id,
        u.school_name
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND u.school_id IS NOT NULL
      AND s.id IS NULL
      ORDER BY u.school_name, u.name
    `);

    console.log(`Found ${orphanedTeachers.length} teachers with incorrect school_id\n`);

    if (orphanedTeachers.length === 0) {
      console.log('✅ No teachers need fixing!');
      process.exit(0);
    }

    // Try to match each teacher to a school by name
    let fixed = 0;
    let notFound = 0;

    console.log('Matching teachers to schools by name...\n');
    console.log('='.repeat(100));

    for (const teacher of orphanedTeachers) {
      if (!teacher.school_name) {
        console.log(`⚠️  ${teacher.teacher_name}: No school_name to match`);
        notFound++;
        continue;
      }

      // Try to find matching school by name (case-insensitive, trimmed)
      const matchingSchools = await db.execute(sql`
        SELECT s.id, s.name, s.emis_number, m.name as markaz_name
        FROM schools s
        LEFT JOIN markazes m ON s.markaz_id = m.id
        WHERE UPPER(TRIM(s.name)) = UPPER(TRIM(${teacher.school_name}))
        LIMIT 1
      `);

      if (matchingSchools.length > 0) {
        const school = matchingSchools[0];

        // Update teacher's school_id
        await db.execute(sql`
          UPDATE users
          SET school_id = ${school.id}
          WHERE id = ${teacher.id}
        `);

        console.log(`✓ ${teacher.teacher_name} (${teacher.role})`);
        console.log(`  School: ${teacher.school_name}`);
        console.log(`  New school_id: ${school.id}`);
        console.log(`  Markaz: ${school.markaz_name || 'None'}\n`);

        fixed++;
      } else {
        console.log(`✗ ${teacher.teacher_name}: School "${teacher.school_name}" not found in database`);
        notFound++;
      }
    }

    console.log('='.repeat(100));
    console.log('\nSUMMARY:');
    console.log(`  Total teachers processed: ${orphanedTeachers.length}`);
    console.log(`  Successfully fixed: ${fixed}`);
    console.log(`  Could not match: ${notFound}\n`);

    if (fixed > 0) {
      console.log('🔄 Re-running markaz assignment update for fixed teachers...\n');

      // Update markaz for the fixed teachers
      const markazUpdate = await db.execute(sql`
        UPDATE users u
        SET
          markaz_id = s.markaz_id,
          markaz_name = m.name
        FROM schools s
        INNER JOIN markazes m ON s.markaz_id = m.id
        WHERE u.school_id = s.id
        AND u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
        AND u.markaz_id IS NULL
        AND s.markaz_id IS NOT NULL
      `);

      console.log('✅ Markaz assignments updated!');

      // Check final stats
      const finalStats = await db.execute(sql`
        SELECT
          COUNT(*) as total,
          COUNT(markaz_id) as with_markaz,
          COUNT(*) - COUNT(markaz_id) as without_markaz
        FROM users
        WHERE role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      `);

      console.log('\nFINAL STATISTICS:');
      console.log(`  Total teachers: ${finalStats[0].total}`);
      console.log(`  With markaz: ${finalStats[0].with_markaz}`);
      console.log(`  Without markaz: ${finalStats[0].without_markaz}`);
      console.log(`  Coverage: ${((Number(finalStats[0].with_markaz) / Number(finalStats[0].total)) * 100).toFixed(1)}%`);
    }

    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

fixOrphanedTeachers();
