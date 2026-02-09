import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function addMissingSchools() {
  try {
    console.log('🔍 Checking and adding missing schools from Excel...\n');

    // Schools found in Excel
    const schoolsToAdd = [
      {
        emis: '37330546',
        name: 'GMPS WARYAMA',
        markaz: 'BASSALI FEMALE',
        teacherNames: ['GMPS Waryam'] // What teachers call it
      },
      {
        emis: '37330599',
        name: 'GGES DHOKE KALA KHAN',
        markaz: 'ADYALA FEMALE',
        teacherNames: ['GGES Dhoke kala khan rwp', 'GGES DHOK KALA KHAN'] // Both variations
      }
    ];

    // First check if schools already exist
    console.log('📊 Checking if schools already exist in database...\n');

    for (const school of schoolsToAdd) {
      const existing = await db.execute(sql`
        SELECT s.id, s.name, s.emis_number, s.markaz_id, m.name as markaz_name
        FROM schools s
        LEFT JOIN markazes m ON s.markaz_id = m.id
        WHERE s.emis_number = ${school.emis}
        LIMIT 1
      `);

      if (existing.length > 0) {
        console.log(`✓ School already exists: ${school.name} (EMIS: ${school.emis})`);
        console.log(`  Current markaz: ${existing[0].markaz_name || 'None'}`);

        // Update teachers to use this school
        for (const teacherName of school.teacherNames) {
          const teacherCount = await db.execute(sql`
            SELECT COUNT(*) as count
            FROM users
            WHERE school_name = ${teacherName}
            AND role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
          `);

          if (Number(teacherCount[0].count) > 0) {
            console.log(`  📝 Updating ${teacherCount[0].count} teacher(s) with school_name "${teacherName}"`);

            await db.execute(sql`
              UPDATE users
              SET school_id = ${existing[0].id},
                  school_name = ${school.name}
              WHERE school_name = ${teacherName}
              AND role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
            `);
          }
        }
      } else {
        console.log(`❌ School NOT in database: ${school.name} (EMIS: ${school.emis})`);

        // Get markaz_id for this markaz
        const markaz = await db.execute(sql`
          SELECT id
          FROM markazes
          WHERE name = ${school.markaz}
          LIMIT 1
        `);

        if (markaz.length === 0) {
          console.log(`  ⚠️  Markaz "${school.markaz}" not found! Need to create it first.`);
          continue;
        }

        const markazId = markaz[0].id;

        // Add the school - need cluster_id and district_id
        // Get these from the markaz
        const markazInfo = await db.execute(sql`
          SELECT district_id, tehsil_id
          FROM markazes
          WHERE id = ${markazId}
          LIMIT 1
        `);

        if (markazInfo.length === 0) {
          console.log(`  ⚠️  Could not get markaz info!`);
          continue;
        }

        // Schools need a cluster_id - let's use a default or the district_id
        const districtId = markazInfo[0].district_id;
        const tehsilId = markazInfo[0].tehsil_id;

        // Get a cluster for this district (or create a default one)
        const cluster = await db.execute(sql`
          SELECT id
          FROM clusters
          WHERE district_id = ${districtId}
          LIMIT 1
        `);

        let clusterId;
        if (cluster.length > 0) {
          clusterId = cluster[0].id;
        } else {
          console.log(`  ⚠️  No cluster found for district, creating default cluster...`);
          const newCluster = await db.execute(sql`
            INSERT INTO clusters (id, name, code, district_id)
            VALUES (gen_random_uuid(), 'DEFAULT', 'DEFAULT', ${districtId})
            RETURNING id
          `);
          clusterId = newCluster[0].id;
        }

        console.log(`  ➕ Adding school to database...`);
        const newSchool = await db.execute(sql`
          INSERT INTO schools (id, name, code, emis_number, markaz_id, cluster_id, district_id, tehsil_id)
          VALUES (gen_random_uuid(), ${school.name}, ${school.emis}, ${school.emis}, ${markazId}, ${clusterId}, ${districtId}, ${tehsilId})
          RETURNING id
        `);

        const newSchoolId = newSchool[0].id;
        console.log(`  ✅ School added with ID: ${newSchoolId}`);

        // Update teachers
        for (const teacherName of school.teacherNames) {
          const teacherCount = await db.execute(sql`
            SELECT COUNT(*) as count
            FROM users
            WHERE school_name = ${teacherName}
            AND role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
          `);

          if (Number(teacherCount[0].count) > 0) {
            console.log(`  📝 Updating ${teacherCount[0].count} teacher(s) with school_name "${teacherName}"`);

            await db.execute(sql`
              UPDATE users
              SET school_id = ${newSchoolId},
                  school_name = ${school.name}
              WHERE school_name = ${teacherName}
              AND role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
            `);
          }
        }
      }

      console.log('');
    }

    // Now fix markaz assignments for these teachers
    console.log('🔄 Updating markaz assignments for fixed teachers...\n');

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

    // Final stats
    const finalStats = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        COUNT(markaz_id) as with_markaz,
        COUNT(*) - COUNT(markaz_id) as without_markaz
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
    `);

    console.log('='.repeat(80));
    console.log('FINAL STATISTICS:');
    console.log('='.repeat(80));
    console.log(`  Total teachers: ${finalStats[0].total}`);
    console.log(`  With markaz: ${finalStats[0].with_markaz}`);
    console.log(`  Without markaz: ${finalStats[0].without_markaz}`);
    console.log(`  Coverage: ${((Number(finalStats[0].with_markaz) / Number(finalStats[0].total)) * 100).toFixed(1)}%`);
    console.log('='.repeat(80));

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
      console.log('='.repeat(80));
      remaining.forEach((school: any) => {
        console.log(`  ${school.school_name}: ${school.teacher_count} teachers`);
      });
      console.log('='.repeat(80));
    }

    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

addMissingSchools();
