import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function checkSchoolDetails() {
  try {
    console.log('🔍 DETAILED CHECK: Schools for Teachers Without Markaz\n');
    console.log('='.repeat(100));

    // Get all teachers without markaz and their schools
    const results = await db.execute(sql`
      SELECT
        u.id as user_id,
        u.name as teacher_name,
        u.role,
        u.phone_number,
        u.school_id,
        u.school_name as user_school_name,
        s.name as school_name,
        s.emis_number,
        s.code,
        s.markaz_id,
        s.tehsil_id,
        s.district_id,
        m.name as markaz_name,
        t.name as tehsil_name,
        d.name as district_name
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      LEFT JOIN districts d ON s.district_id = d.id
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      AND u.markaz_id IS NULL
      ORDER BY u.school_name, u.name
    `);

    console.log(`\nFound ${results.length} teachers without markaz\n`);

    // Group by school_id
    const schoolGroups: Record<string, any[]> = {};

    results.forEach((teacher: any) => {
      const schoolId = teacher.school_id || 'NO_SCHOOL_ID';
      if (!schoolGroups[schoolId]) {
        schoolGroups[schoolId] = [];
      }
      schoolGroups[schoolId].push(teacher);
    });

    let schoolNumber = 0;
    for (const [schoolId, teachers] of Object.entries(schoolGroups)) {
      schoolNumber++;
      const firstTeacher = teachers[0];

      console.log(`\n${'='.repeat(100)}`);
      console.log(`SCHOOL ${schoolNumber}/${Object.keys(schoolGroups).length}`);
      console.log(`${'='.repeat(100)}`);

      if (schoolId === 'NO_SCHOOL_ID') {
        console.log('❌ No school_id assigned');
        console.log(`   User School Name: ${firstTeacher.user_school_name || 'N/A'}`);
      } else {
        console.log(`School ID: ${schoolId}`);
        console.log(`School Name (from schools table): ${firstTeacher.school_name || 'NOT FOUND IN SCHOOLS TABLE'}`);
        console.log(`School Name (from users table): ${firstTeacher.user_school_name || 'N/A'}`);
        console.log(`EMIS Number: ${firstTeacher.emis_number || 'NULL'}`);
        console.log(`School Code: ${firstTeacher.code || 'NULL'}`);
        console.log(`District: ${firstTeacher.district_name || 'NULL'}`);
        console.log(`Tehsil: ${firstTeacher.tehsil_name || 'NULL'}`);
        console.log(`Markaz ID: ${firstTeacher.markaz_id || 'NULL'}`);
        console.log(`Markaz Name: ${firstTeacher.markaz_name || 'NULL'}`);

        // If school exists but no markaz, we need to assign it
        if (firstTeacher.school_name && !firstTeacher.markaz_id) {
          console.log(`\n⚠️  ISSUE: School exists in database but has NO MARKAZ assigned`);
        }

        // If school doesn't exist in schools table
        if (!firstTeacher.school_name) {
          console.log(`\n❌ ISSUE: school_id points to non-existent school record`);
        }
      }

      console.log(`\nTeachers (${teachers.length}):`);
      teachers.forEach((t: any) => {
        console.log(`  - ${t.teacher_name} (${t.role})`);
        console.log(`    Phone: ${t.phone_number}`);
      });

      // Try to find this school in Excel data if EMIS exists
      if (firstTeacher.emis_number) {
        console.log(`\n✅ Has EMIS number - Can search Excel files for: ${firstTeacher.emis_number}`);
      } else if (firstTeacher.user_school_name) {
        console.log(`\n🔍 Need to search Excel files for school name: "${firstTeacher.user_school_name}"`);
      }
    }

    // Final summary
    console.log(`\n\n${'='.repeat(100)}`);
    console.log('📊 SUMMARY');
    console.log(`${'='.repeat(100)}`);

    const withEmis = results.filter((r: any) => r.emis_number);
    const withoutEmis = results.filter((r: any) => !r.emis_number);
    const schoolsInDb = results.filter((r: any) => r.school_name);
    const schoolsNotInDb = results.filter((r: any) => !r.school_name && r.school_id);

    console.log(`\nTotal teachers without markaz: ${results.length}`);
    console.log(`Schools affected: ${Object.keys(schoolGroups).length}`);
    console.log(`\nTeachers whose schools have EMIS: ${withEmis.length}`);
    console.log(`Teachers whose schools lack EMIS: ${withoutEmis.length}`);
    console.log(`\nSchools found in database: ${schoolsInDb.length > 0 ? 'Yes (' + [...new Set(schoolsInDb.map((r: any) => r.school_id))].length + ' unique)' : '0'}`);
    console.log(`School IDs pointing to missing records: ${schoolsNotInDb.length > 0 ? 'Yes (' + [...new Set(schoolsNotInDb.map((r: any) => r.school_id))].length + ' unique)' : '0'}`);

    console.log(`\n💡 ACTION ITEMS:`);
    if (withEmis.length > 0) {
      console.log(`1. Search Excel files for EMIS numbers to find markaz assignments`);
    }
    if (withoutEmis.length > 0) {
      console.log(`2. Search Excel files by school name for ${withoutEmis.length} teachers`);
    }
    if (schoolsNotInDb.length > 0) {
      console.log(`3. Fix database integrity - school_ids point to missing records`);
    }

    console.log(`${'='.repeat(100)}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

checkSchoolDetails();
