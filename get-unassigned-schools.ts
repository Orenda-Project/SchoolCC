import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getUnassignedSchools() {
  try {
    console.log('📊 Finding schools with NO staff assigned...\n');

    // Get schools with no users AND no AEO coverage
    const unassignedSchools = await db.execute(sql`
      WITH school_users AS (
        SELECT
          school_id,
          COUNT(*) as user_count
        FROM users
        WHERE school_id IS NOT NULL
        GROUP BY school_id
      ),
      markaz_aeos AS (
        SELECT
          markaz_name,
          COUNT(*) as aeo_count
        FROM users
        WHERE role = 'AEO' AND markaz_name IS NOT NULL
        GROUP BY markaz_name
      )
      SELECT
        s.id,
        s.name as school_name,
        s.emis_number,
        s.address,
        m.name as markaz_name,
        t.name as tehsil_name,
        COALESCE(su.user_count, 0) as direct_users,
        COALESCE(ma.aeo_count, 0) as markaz_aeos
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      LEFT JOIN school_users su ON s.id = su.school_id
      LEFT JOIN markaz_aeos ma ON m.name = ma.markaz_name
      WHERE COALESCE(su.user_count, 0) = 0
      ORDER BY m.name, s.name
    `);

    // Separate into categories
    const noAEONoStaff: any[] = [];
    const hasAEONoStaff: any[] = [];

    unassignedSchools.forEach((school: any) => {
      if (school.markaz_aeos === 0) {
        noAEONoStaff.push(school);
      } else {
        hasAEONoStaff.push(school);
      }
    });

    console.log('='.repeat(150));
    console.log('SCHOOLS WITH NO STAFF ASSIGNED');
    console.log('='.repeat(150));
    console.log(`Total schools with no direct users: ${unassignedSchools.length}\n`);

    console.log(`\n${'█'.repeat(80)}`);
    console.log(`█ CRITICAL: Schools with NO AEO and NO Staff (${noAEONoStaff.length} schools)`);
    console.log(`${'█'.repeat(80)}\n`);

    noAEONoStaff.forEach((school: any, index: number) => {
      console.log(`${index + 1}. ${school.school_name}`);
      console.log(`   EMIS: ${school.emis_number || 'N/A'}`);
      console.log(`   Markaz: ${school.markaz_name || '⚠️  NO MARKAZ'}`);
      console.log(`   Tehsil: ${school.tehsil_name || 'N/A'}`);
      if (school.address) {
        console.log(`   Address: ${school.address}`);
      }
      console.log(`   Status: ❌ NO AEO, NO HEAD TEACHER, NO TEACHER\n`);
    });

    console.log(`\n${'█'.repeat(80)}`);
    console.log(`█ WARNING: Schools with AEO but NO Staff (${hasAEONoStaff.length} schools)`);
    console.log(`${'█'.repeat(80)}\n`);

    hasAEONoStaff.forEach((school: any, index: number) => {
      console.log(`${index + 1}. ${school.school_name}`);
      console.log(`   EMIS: ${school.emis_number || 'N/A'}`);
      console.log(`   Markaz: ${school.markaz_name || 'N/A'} (${school.markaz_aeos} AEO${school.markaz_aeos > 1 ? 's' : ''})`);
      console.log(`   Tehsil: ${school.tehsil_name || 'N/A'}`);
      if (school.address) {
        console.log(`   Address: ${school.address}`);
      }
      console.log(`   Status: ⚠️  HAS AEO, but NO HEAD TEACHER, NO TEACHER\n`);
    });

    console.log('\n' + '='.repeat(150));
    console.log('SUMMARY');
    console.log('='.repeat(150));
    console.log(`Total unassigned schools: ${unassignedSchools.length}`);
    console.log(`\nCritical (No AEO + No Staff): ${noAEONoStaff.length}`);
    console.log(`Warning (Has AEO but No Staff): ${hasAEONoStaff.length}`);
    console.log('='.repeat(150));

    // Create CSV files
    const csvHeaders = 'School Name,EMIS Number,Markaz,Tehsil,Address,AEO Count,Status\n';

    // Critical schools CSV
    const criticalRows = noAEONoStaff.map((school: any) =>
      `"${school.school_name}","${school.emis_number || ''}","${school.markaz_name || 'NO MARKAZ'}","${school.tehsil_name || ''}","${school.address || ''}",${school.markaz_aeos},"NO AEO NO STAFF"`
    );
    fs.writeFileSync('critical_unassigned_schools.csv', csvHeaders + criticalRows.join('\n'));

    // Warning schools CSV
    const warningRows = hasAEONoStaff.map((school: any) =>
      `"${school.school_name}","${school.emis_number || ''}","${school.markaz_name || ''}","${school.tehsil_name || ''}","${school.address || ''}",${school.markaz_aeos},"HAS AEO NO STAFF"`
    );
    fs.writeFileSync('warning_unassigned_schools.csv', csvHeaders + warningRows.join('\n'));

    // Combined CSV
    const allRows = unassignedSchools.map((school: any) => {
      const status = school.markaz_aeos === 0 ? 'NO AEO NO STAFF' : 'HAS AEO NO STAFF';
      return `"${school.school_name}","${school.emis_number || ''}","${school.markaz_name || 'NO MARKAZ'}","${school.tehsil_name || ''}","${school.address || ''}",${school.markaz_aeos},"${status}"`;
    });
    fs.writeFileSync('all_unassigned_schools.csv', csvHeaders + allRows.join('\n'));

    console.log('\n✅ Export complete!');
    console.log('   Files created:');
    console.log('   - critical_unassigned_schools.csv (No AEO + No Staff)');
    console.log('   - warning_unassigned_schools.csv (Has AEO but No Staff)');
    console.log('   - all_unassigned_schools.csv (All unassigned schools)');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getUnassignedSchools();
