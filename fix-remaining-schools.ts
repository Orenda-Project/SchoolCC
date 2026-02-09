import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function fixRemainingSchools() {
  try {
    console.log('🔧 Fixing remaining schools with EMIS matching...\n');
    console.log('='.repeat(100));

    const fixes = [
      {
        teacherSchoolName: 'GPS HAYAL.',
        correctEmis: '37330250',
        correctName: 'GPS HAYAL.',
        expectedMarkaz: 'Adyala'
      },
      {
        teacherSchoolName: 'GBES kuri khuda baksh Rawalpindi',
        correctEmis: '37330131',
        correctName: 'GES KURI KHUDA BUKSH',
        expectedMarkaz: 'JHATTA HATHIAL'
      }
    ];

    let totalFixed = 0;

    for (const fix of fixes) {
      console.log(`\n📍 Processing: ${fix.teacherSchoolName}`);
      console.log('-'.repeat(100));

      // Find the school by EMIS
      const school = await db.execute(sql`
        SELECT s.id, s.name, s.emis_number, s.markaz_id, m.name as markaz_name
        FROM schools s
        LEFT JOIN markazes m ON s.markaz_id = m.id
        WHERE s.emis_number = ${fix.correctEmis}
        LIMIT 1
      `);

      if (school.length === 0) {
        console.log(`❌ School with EMIS ${fix.correctEmis} not found in database!`);
        console.log(`   Need to add: ${fix.correctName}`);
        continue;
      }

      const foundSchool = school[0];
      console.log(`✓ Found school: ${foundSchool.name} (EMIS: ${foundSchool.emis_number})`);
      console.log(`  Markaz: ${foundSchool.markaz_name || 'NONE'}`);

      // Check if markaz is correct
      if (!foundSchool.markaz_id) {
        console.log(`  ⚠️ School has no markaz assigned!`);

        // Find the expected markaz
        const markaz = await db.execute(sql`
          SELECT id
          FROM markazes
          WHERE name = ${fix.expectedMarkaz}
          LIMIT 1
        `);

        if (markaz.length === 0) {
          console.log(`  ❌ Markaz "${fix.expectedMarkaz}" not found!`);
          continue;
        }

        // Update school with markaz
        console.log(`  🔄 Updating school markaz to ${fix.expectedMarkaz}...`);
        await db.execute(sql`
          UPDATE schools
          SET markaz_id = ${markaz[0].id}
          WHERE id = ${foundSchool.id}
        `);
        console.log(`  ✅ School markaz updated`);
      }

      // Find teachers with this school_name
      const teachers = await db.execute(sql`
        SELECT id, name, role, school_id, school_name
        FROM users
        WHERE school_name = ${fix.teacherSchoolName}
        AND role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      `);

      if (teachers.length === 0) {
        console.log(`  ℹ️  No teachers found with school_name "${fix.teacherSchoolName}"`);
        continue;
      }

      console.log(`\n  📝 Updating ${teachers.length} teacher(s):`);

      for (const teacher of teachers) {
        console.log(`    - ${teacher.name} (${teacher.role})`);

        // Update teacher's school_id and school_name
        await db.execute(sql`
          UPDATE users
          SET
            school_id = ${foundSchool.id},
            school_name = ${foundSchool.name}
          WHERE id = ${teacher.id}
        `);
      }

      console.log(`  ✅ Updated ${teachers.length} teacher(s)`);
      totalFixed += teachers.length;
    }

    console.log('\n' + '='.repeat(100));
    console.log('🔄 Updating markaz assignments for fixed teachers...\n');

    // Update markaz for all teachers based on their school
    await db.execute(sql`
      UPDATE users u
      SET
        markaz_id = s.markaz_id,
        markaz_name = m.name
      FROM schools s
      INNER JOIN markazes m ON s.markaz_id = m.id
      WHERE u.school_id = s.id
      AND u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND (u.markaz_id IS NULL OR u.markaz_name IS NULL)
      AND s.markaz_id IS NOT NULL
    `);

    console.log('✅ Markaz assignments updated!\n');

    // Final statistics
    const finalStats = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_id) as with_markaz,
        COUNT(*) - COUNT(markaz_id) as without_markaz
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
    `);

    console.log('='.repeat(100));
    console.log('FINAL STATISTICS:');
    console.log('='.repeat(100));
    console.log(`  Total teachers: ${finalStats[0].total}`);
    console.log(`  With markaz: ${finalStats[0].with_markaz}`);
    console.log(`  Without markaz: ${finalStats[0].without_markaz}`);
    console.log(`  Coverage: ${((Number(finalStats[0].with_markaz) / Number(finalStats[0].total)) * 100).toFixed(1)}%`);
    console.log('='.repeat(100));

    // Show remaining teachers without markaz
    const remaining = await db.execute(sql`
      SELECT DISTINCT
        u.school_name,
        COUNT(*) as teacher_count
      FROM users u
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND u.markaz_id IS NULL
      GROUP BY u.school_name
      ORDER BY teacher_count DESC
    `);

    if (remaining.length > 0) {
      console.log('\n⚠️  REMAINING SCHOOLS WITHOUT MARKAZ:');
      console.log('='.repeat(100));
      remaining.forEach((school: any) => {
        console.log(`  ${school.school_name}: ${school.teacher_count} teachers`);
      });
      console.log('='.repeat(100));
      console.log('\nThese schools need manual investigation - contact teachers to verify details.');
    } else {
      console.log('\n🎉 ALL TEACHERS NOW HAVE MARKAZ ASSIGNMENTS!');
    }

    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

fixRemainingSchools();
