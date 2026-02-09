import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function checkTeachersWithEmis() {
  try {
    console.log('🔍 Checking teachers without markaz - looking for EMIS numbers...\n');
    console.log('='.repeat(100));

    // Get teachers without markaz and their school info
    const teachersWithoutMarkaz = await db.execute(sql`
      SELECT
        u.id,
        u.name as teacher_name,
        u.role,
        u.phone_number,
        u.school_id,
        u.school_name,
        s.emis_number as school_emis_from_id,
        s.name as school_name_from_id
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND u.markaz_id IS NULL
      ORDER BY u.school_name, u.name
    `);

    console.log(`Found ${teachersWithoutMarkaz.length} teachers without markaz\n`);

    // Group by school_name
    const schoolGroups: Record<string, any[]> = {};

    teachersWithoutMarkaz.forEach((teacher: any) => {
      const schoolName = teacher.school_name || 'NO_SCHOOL_NAME';
      if (!schoolGroups[schoolName]) {
        schoolGroups[schoolName] = [];
      }
      schoolGroups[schoolName].push(teacher);
    });

    // Show details for each school
    for (const [schoolName, teachers] of Object.entries(schoolGroups)) {
      console.log(`\n📍 SCHOOL: ${schoolName} (${teachers.length} teachers)`);
      console.log('-'.repeat(100));

      teachers.forEach((teacher: any) => {
        console.log(`\n  Teacher: ${teacher.teacher_name} (${teacher.role})`);
        console.log(`    Phone: ${teacher.phone_number || 'N/A'}`);
        console.log(`    School ID: ${teacher.school_id || 'NULL'}`);

        if (teacher.school_id) {
          console.log(`    School from ID: ${teacher.school_name_from_id || 'N/A'}`);
          console.log(`    School EMIS from ID: ${teacher.school_emis_from_id || 'NULL'}`);
        }
      });

      // Try to find matching schools in database by partial name match
      console.log(`\n  🔎 Searching for schools with similar names or EMIS...`);

      // Search by name
      const similarByName = await db.execute(sql`
        SELECT s.id, s.name, s.emis_number, m.name as markaz_name
        FROM schools s
        LEFT JOIN markazes m ON s.markaz_id = m.id
        WHERE s.name ILIKE '%' || ${schoolName.split(' ')[0]} || '%'
        OR s.name ILIKE '%' || ${schoolName.split(' ').slice(-1)[0]} || '%'
        LIMIT 5
      `);

      if (similarByName.length > 0) {
        console.log(`\n  📋 Similar schools in database:`);
        similarByName.forEach((school: any, idx: number) => {
          console.log(`    ${idx + 1}. ${school.name}`);
          console.log(`       EMIS: ${school.emis_number || 'N/A'}`);
          console.log(`       Markaz: ${school.markaz_name || 'N/A'}`);
        });
      } else {
        console.log(`  ❌ No similar schools found in database`);
      }

      console.log('\n' + '-'.repeat(100));
    }

    console.log('\n' + '='.repeat(100));
    console.log('💡 SUMMARY:');
    console.log('='.repeat(100));
    console.log(`Total teachers without markaz: ${teachersWithoutMarkaz.length}`);
    console.log(`Schools affected: ${Object.keys(schoolGroups).length}`);
    console.log('\nIf schools have EMIS numbers in database, we can match them.');
    console.log('Otherwise, manual verification with teachers will be needed.');
    console.log('='.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

checkTeachersWithEmis();
