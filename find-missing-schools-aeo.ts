import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function findMissingSchoolsAEO() {
  try {
    console.log('🔍 Finding which AEOs should manage missing schools...\n');

    // Get teachers with schools that don't exist in database
    const teachersWithMissingSchools = await db.execute(sql`
      SELECT DISTINCT
        u.school_name,
        COUNT(*) as teacher_count
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER')
      AND u.school_id IS NOT NULL
      AND s.id IS NULL
      AND u.school_name IS NOT NULL
      GROUP BY u.school_name
      ORDER BY teacher_count DESC, u.school_name
    `);

    console.log(`Found ${teachersWithMissingSchools.length} missing schools with ${teachersWithMissingSchools.reduce((sum, s) => sum + Number(s.teacher_count), 0)} teachers\n`);
    console.log('='.repeat(120));

    for (const missingSchool of teachersWithMissingSchools) {
      console.log(`\n📍 MISSING SCHOOL: ${missingSchool.school_name}`);
      console.log(`   Teachers affected: ${missingSchool.teacher_count}`);

      // Try to find similar schools in the database
      const similarSchools = await db.execute(sql`
        SELECT
          s.name,
          s.emis_number,
          m.name as markaz_name,
          aeo.name as aeo_name,
          aeo.phone_number as aeo_phone
        FROM schools s
        LEFT JOIN markazes m ON s.markaz_id = m.id
        LEFT JOIN users aeo ON aeo.markaz_name = m.name AND aeo.role = 'AEO'
        WHERE s.name ILIKE '%' || ${missingSchool.school_name.split(' ')[0]} || '%'
        OR s.name ILIKE '%' || ${missingSchool.school_name.split(' ').slice(-1)[0]} || '%'
        LIMIT 5
      `);

      if (similarSchools.length > 0) {
        console.log('   \n   📋 Similar schools found in database:');
        similarSchools.forEach((school: any, idx: number) => {
          console.log(`   ${idx + 1}. ${school.name} (EMIS: ${school.emis_number})`);
          if (school.markaz_name) {
            console.log(`      Markaz: ${school.markaz_name}`);
            if (school.aeo_name) {
              console.log(`      AEO: ${school.aeo_name} (${school.aeo_phone})`);
            }
          }
        });

        // Get the most common markaz from similar schools
        const markazCounts: Record<string, number> = {};
        similarSchools.forEach((school: any) => {
          if (school.markaz_name) {
            markazCounts[school.markaz_name] = (markazCounts[school.markaz_name] || 0) + 1;
          }
        });

        const mostLikelyMarkaz = Object.entries(markazCounts).sort((a, b) => b[1] - a[1])[0];
        if (mostLikelyMarkaz) {
          console.log(`\n   ✨ RECOMMENDATION: Assign to markaz "${mostLikelyMarkaz[0]}"`);
        }
      } else {
        console.log('   ⚠️  No similar schools found - needs manual investigation');
      }

      // Show the teachers affected
      const teachers = await db.execute(sql`
        SELECT name, role, phone_number
        FROM users
        WHERE school_name = ${missingSchool.school_name}
        AND role IN ('TEACHER', 'HEAD_TEACHER')
        ORDER BY role, name
      `);

      console.log('\n   👥 Teachers needing assignment:');
      teachers.forEach((teacher: any) => {
        console.log(`      - ${teacher.name} (${teacher.role}) ${teacher.phone_number || ''}`);
      });

      console.log('\n' + '-'.repeat(120));
    }

    console.log('\n' + '='.repeat(120));
    console.log('SUMMARY OF ACTIONS NEEDED:');
    console.log('='.repeat(120));
    console.log('\nFor each missing school above:');
    console.log('1. Verify if the school should exist or if it\'s a typo/old name');
    console.log('2. If it should exist: Add the school to the database with correct markaz');
    console.log('3. If it\'s a typo: Update teachers\' school_name to match existing school');
    console.log('4. If school was renamed: Update teachers\' school_id to point to renamed school');
    console.log('5. Once school exists with markaz, run fix-teacher-markaz-assignments.ts again');
    console.log('\n' + '='.repeat(120));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

findMissingSchoolsAEO();
