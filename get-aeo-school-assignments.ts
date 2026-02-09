import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getAEOSchoolAssignments() {
  try {
    console.log('📊 Fetching AEO-School assignments from production database...\n');

    // Get all AEOs with their markaz assignments
    const aeos = await db.execute(sql`
      SELECT
        id,
        name,
        phone_number,
        markaz_name,
        tehsil_name,
        status
      FROM users
      WHERE role = 'AEO'
      ORDER BY markaz_name, name
    `);

    console.log(`Total AEOs found: ${aeos.length}\n`);

    // Get all schools grouped by markaz
    const schoolsByMarkaz = await db.execute(sql`
      SELECT
        s.id,
        s.name as school_name,
        s.emis_number,
        m.name as markaz_name,
        t.name as tehsil_name,
        (SELECT COUNT(*) FROM users u WHERE u.school_id = s.id) as user_count
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      ORDER BY m.name, s.name
    `);

    console.log(`Total schools found: ${schoolsByMarkaz.length}\n`);

    // Group schools by markaz
    const schoolsGrouped: Record<string, any[]> = {};
    schoolsByMarkaz.forEach((school: any) => {
      const markaz = school.markaz_name || 'NO_MARKAZ';
      if (!schoolsGrouped[markaz]) {
        schoolsGrouped[markaz] = [];
      }
      schoolsGrouped[markaz].push(school);
    });

    // Group AEOs by markaz
    const aeosGrouped: Record<string, any[]> = {};
    aeos.forEach((aeo: any) => {
      const markaz = aeo.markaz_name || 'NO_MARKAZ';
      if (!aeosGrouped[markaz]) {
        aeosGrouped[markaz] = [];
      }
      aeosGrouped[markaz].push(aeo);
    });

    console.log('='.repeat(150));
    console.log('AEO-SCHOOL ASSIGNMENTS BY MARKAZ');
    console.log('='.repeat(150) + '\n');

    // CSV data
    const csvRows: string[] = [];
    csvRows.push('Markaz,AEO Name,AEO Phone,School Name,EMIS Number,Users Count,AEO Status');

    let markazesWithAEO = 0;
    let markazesWithoutAEO = 0;
    let schoolsWithAEO = 0;
    let schoolsWithoutAEO = 0;

    // Get unique markazes
    const allMarkazes = new Set([...Object.keys(schoolsGrouped), ...Object.keys(aeosGrouped)]);

    Array.from(allMarkazes).sort().forEach((markaz, index) => {
      const markazAEOs = aeosGrouped[markaz] || [];
      const markazSchools = schoolsGrouped[markaz] || [];

      if (markazAEOs.length > 0) {
        markazesWithAEO++;
        schoolsWithAEO += markazSchools.length;
      } else {
        markazesWithoutAEO++;
        schoolsWithoutAEO += markazSchools.length;
      }

      console.log(`\n${index + 1}. MARKAZ: ${markaz === 'NO_MARKAZ' ? '⚠️  NO MARKAZ ASSIGNED' : markaz.toUpperCase()}`);
      console.log(`   Schools: ${markazSchools.length}`);

      if (markazAEOs.length > 0) {
        console.log(`   ✅ AEOs Assigned (${markazAEOs.length}):`);
        markazAEOs.forEach((aeo: any) => {
          console.log(`      - ${aeo.name} (${aeo.phone_number}) - ${aeo.status}`);
        });
      } else {
        console.log(`   ❌ NO AEO ASSIGNED`);
      }

      if (markazSchools.length > 0) {
        console.log(`   Schools:`);
        markazSchools.forEach((school: any, idx: number) => {
          const userInfo = school.user_count > 0 ? `${school.user_count} users` : 'No users';
          console.log(`      ${idx + 1}. ${school.school_name} (${school.emis_number}) - ${userInfo}`);

          // Add to CSV
          markazAEOs.forEach((aeo: any) => {
            csvRows.push(
              `"${markaz}","${aeo.name}",${aeo.phone_number},"${school.school_name}","${school.emis_number || ''}",${school.user_count},${aeo.status}`
            );
          });

          // If no AEO for this markaz, still add school
          if (markazAEOs.length === 0) {
            csvRows.push(
              `"${markaz}","NO AEO","","${school.school_name}","${school.emis_number || ''}",${school.user_count},""`
            );
          }
        });
      }
    });

    console.log('\n' + '='.repeat(150));
    console.log('SUMMARY');
    console.log('='.repeat(150));
    console.log(`Total Markazes: ${allMarkazes.size}`);
    console.log(`Markazes with AEO: ${markazesWithAEO}`);
    console.log(`Markazes without AEO: ${markazesWithoutAEO}`);
    console.log(`\nSchools with AEO Coverage: ${schoolsWithAEO}`);
    console.log(`Schools without AEO Coverage: ${schoolsWithoutAEO}`);
    console.log(`\nTotal AEOs: ${aeos.length}`);
    console.log(`Active AEOs: ${aeos.filter((a: any) => a.status === 'active').length}`);
    console.log(`Pending AEOs: ${aeos.filter((a: any) => a.status === 'pending').length}`);
    console.log('='.repeat(150));

    // Write CSV file
    const csvContent = csvRows.join('\n');
    fs.writeFileSync('aeo_school_assignments.csv', csvContent);

    console.log('\n✅ Export complete!');
    console.log('   CSV file: aeo_school_assignments.csv');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getAEOSchoolAssignments();
