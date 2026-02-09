import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getComprehensiveSchoolReport() {
  try {
    console.log('📊 Generating comprehensive school hierarchy report...\n');

    // Get all schools with complete information, staff, and AEO coverage
    const schoolData = await db.execute(sql`
      SELECT
        s.id as school_id,
        s.name as school_name,
        s.code as school_code,
        s.emis_number,
        s.address,
        s.latitude,
        s.longitude,
        s.total_students,
        s.present_students,
        s.absent_students,
        s.total_teachers,
        s.present_teachers,
        s.absent_teachers,
        s.total_toilets,
        s.working_toilets,
        s.broken_toilets,
        s.is_drinking_water_available,
        s.desks_new,
        s.desks_in_use,
        s.desks_broken,
        s.fans_new,
        s.fans_in_use,
        s.fans_broken,
        s.chairs_new,
        s.chairs_in_use,
        s.chairs_broken,
        s.blackboards_new,
        s.blackboards_in_use,
        s.blackboards_broken,
        s.computers_new,
        s.computers_in_use,
        s.computers_broken,
        s.data_last_updated,
        s.created_at as school_created_at,
        m.name as markaz_name,
        t.name as tehsil_name,
        u.id as user_id,
        u.name as user_name,
        u.phone_number as user_phone,
        u.role as user_role,
        u.status as user_status,
        u.created_at as user_created_at,
        aeo.id as aeo_id,
        aeo.name as aeo_name,
        aeo.phone_number as aeo_phone,
        aeo.status as aeo_status
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      LEFT JOIN users u ON u.school_id = s.id AND u.role IN ('Head Teacher', 'Teacher')
      LEFT JOIN users aeo ON aeo.markaz_name = m.name AND aeo.role = 'AEO'
      ORDER BY s.name,
        CASE u.role
          WHEN 'Head Teacher' THEN 1
          WHEN 'Teacher' THEN 2
          ELSE 3
        END,
        u.name
    `);

    console.log(`Found ${schoolData.length} school-staff records\n`);

    // Count unique schools
    const uniqueSchools = new Set(schoolData.map((row: any) => row.school_id)).size;
    console.log(`Unique schools: ${uniqueSchools}\n`);

    // Generate detailed CSV
    const csvHeaders = [
      'School Name',
      'School Code',
      'EMIS Number',
      'Markaz',
      'Tehsil',
      'Address',
      'Latitude',
      'Longitude',
      'Total Students',
      'Present Students',
      'Absent Students',
      'Total Teachers',
      'Present Teachers',
      'Absent Teachers',
      'Total Toilets',
      'Working Toilets',
      'Broken Toilets',
      'Drinking Water Available',
      'Desks New',
      'Desks In Use',
      'Desks Broken',
      'Fans New',
      'Fans In Use',
      'Fans Broken',
      'Chairs New',
      'Chairs In Use',
      'Chairs Broken',
      'Blackboards New',
      'Blackboards In Use',
      'Blackboards Broken',
      'Computers New',
      'Computers In Use',
      'Computers Broken',
      'Data Last Updated',
      'School Created',
      'Staff Name',
      'Staff Phone',
      'Staff Role',
      'Staff Status',
      'Staff Joined',
      'AEO Name',
      'AEO Phone',
      'AEO Status'
    ].join(',') + '\n';

    const csvRows = schoolData.map((row: any) => {
      return [
        `"${row.school_name || ''}"`,
        `"${row.school_code || ''}"`,
        `"${row.emis_number || ''}"`,
        `"${row.markaz_name || 'NO MARKAZ'}"`,
        `"${row.tehsil_name || ''}"`,
        `"${(row.address || '').replace(/"/g, '""')}"`,
        row.latitude || '',
        row.longitude || '',
        row.total_students || 0,
        row.present_students || 0,
        row.absent_students || 0,
        row.total_teachers || 0,
        row.present_teachers || 0,
        row.absent_teachers || 0,
        row.total_toilets || 0,
        row.working_toilets || 0,
        row.broken_toilets || 0,
        row.is_drinking_water_available ? 'Yes' : 'No',
        row.desks_new || 0,
        row.desks_in_use || 0,
        row.desks_broken || 0,
        row.fans_new || 0,
        row.fans_in_use || 0,
        row.fans_broken || 0,
        row.chairs_new || 0,
        row.chairs_in_use || 0,
        row.chairs_broken || 0,
        row.blackboards_new || 0,
        row.blackboards_in_use || 0,
        row.blackboards_broken || 0,
        row.computers_new || 0,
        row.computers_in_use || 0,
        row.computers_broken || 0,
        row.data_last_updated ? new Date(row.data_last_updated).toISOString().split('T')[0] : '',
        row.school_created_at ? new Date(row.school_created_at).toISOString().split('T')[0] : '',
        `"${row.user_name || ''}"`,
        `"${row.user_phone || ''}"`,
        `"${row.user_role || ''}"`,
        `"${row.user_status || ''}"`,
        row.user_created_at ? new Date(row.user_created_at).toISOString().split('T')[0] : '',
        `"${row.aeo_name || ''}"`,
        `"${row.aeo_phone || ''}"`,
        `"${row.aeo_status || ''}"`
      ].join(',');
    });

    const csvContent = csvHeaders + csvRows.join('\n');
    fs.writeFileSync('comprehensive_school_report.csv', csvContent);

    // Generate summary statistics
    console.log('='.repeat(150));
    console.log('COMPREHENSIVE SCHOOL REPORT SUMMARY');
    console.log('='.repeat(150));

    // Schools by markaz
    const schoolsByMarkaz: Record<string, Set<string>> = {};
    schoolData.forEach((row: any) => {
      const markaz = row.markaz_name || 'NO_MARKAZ';
      if (!schoolsByMarkaz[markaz]) {
        schoolsByMarkaz[markaz] = new Set();
      }
      schoolsByMarkaz[markaz].add(row.school_id);
    });

    console.log('\nSchools by Markaz:');
    Object.entries(schoolsByMarkaz)
      .sort((a, b) => b[1].size - a[1].size)
      .forEach(([markaz, schools]) => {
        console.log(`  ${markaz}: ${schools.size} schools`);
      });

    // Staff distribution
    const staffByRole: Record<string, number> = {};
    schoolData.forEach((row: any) => {
      if (row.user_role) {
        staffByRole[row.user_role] = (staffByRole[row.user_role] || 0) + 1;
      }
    });

    console.log('\nStaff Distribution:');
    Object.entries(staffByRole).forEach(([role, count]) => {
      console.log(`  ${role}: ${count}`);
    });

    // Schools with and without staff
    const schoolsWithStaff = new Set(
      schoolData.filter((row: any) => row.user_id).map((row: any) => row.school_id)
    ).size;
    const schoolsWithoutStaff = uniqueSchools - schoolsWithStaff;

    console.log('\nSchool Staffing:');
    console.log(`  Schools with staff: ${schoolsWithStaff}`);
    console.log(`  Schools without staff: ${schoolsWithoutStaff}`);

    // AEO coverage
    const schoolsWithAEO = new Set(
      schoolData.filter((row: any) => row.aeo_id).map((row: any) => row.school_id)
    ).size;
    const schoolsWithoutAEO = uniqueSchools - schoolsWithAEO;

    console.log('\nAEO Coverage:');
    console.log(`  Schools with AEO coverage: ${schoolsWithAEO}`);
    console.log(`  Schools without AEO coverage: ${schoolsWithoutAEO}`);

    // Infrastructure summary
    const infrastructureStats = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_drinking_water_available = true THEN 1 ELSE 0 END) as with_water,
        SUM(CASE WHEN total_toilets > 0 THEN 1 ELSE 0 END) as with_toilets,
        SUM(CASE WHEN working_toilets > 0 THEN 1 ELSE 0 END) as with_working_toilets,
        SUM(CASE WHEN desks_in_use > 0 THEN 1 ELSE 0 END) as with_desks,
        SUM(CASE WHEN fans_in_use > 0 THEN 1 ELSE 0 END) as with_fans,
        SUM(CASE WHEN chairs_in_use > 0 THEN 1 ELSE 0 END) as with_chairs,
        SUM(CASE WHEN blackboards_in_use > 0 THEN 1 ELSE 0 END) as with_blackboards,
        SUM(CASE WHEN computers_in_use > 0 THEN 1 ELSE 0 END) as with_computers,
        SUM(total_students) as total_students,
        AVG(total_students) as avg_students,
        SUM(total_teachers) as total_teachers,
        AVG(total_teachers) as avg_teachers,
        SUM(total_toilets) as total_toilets_count,
        SUM(working_toilets) as working_toilets_count,
        SUM(broken_toilets) as broken_toilets_count,
        SUM(desks_in_use) as desks_in_use_count,
        SUM(fans_in_use) as fans_in_use_count,
        SUM(computers_in_use) as computers_in_use_count
      FROM schools
    `);

    const stats = infrastructureStats[0] as any;
    // Convert string values to numbers
    Object.keys(stats).forEach(key => {
      if (stats[key] !== null && !isNaN(Number(stats[key]))) {
        stats[key] = Number(stats[key]);
      }
    });
    console.log('\nInfrastructure Summary:');
    console.log(`  Total Schools: ${stats.total}`);
    console.log(`  Schools with Drinking Water: ${stats.with_water} (${((stats.with_water / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Toilets: ${stats.with_toilets} (${((stats.with_toilets / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Working Toilets: ${stats.with_working_toilets} (${((stats.with_working_toilets / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Desks: ${stats.with_desks} (${((stats.with_desks / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Fans: ${stats.with_fans} (${((stats.with_fans / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Chairs: ${stats.with_chairs} (${((stats.with_chairs / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Blackboards: ${stats.with_blackboards} (${((stats.with_blackboards / stats.total) * 100).toFixed(1)}%)`);
    console.log(`  Schools with Computers: ${stats.with_computers} (${((stats.with_computers / stats.total) * 100).toFixed(1)}%)`);

    console.log('\nAsset Counts:');
    console.log(`  Total Toilets: ${stats.total_toilets_count} (Working: ${stats.working_toilets_count}, Broken: ${stats.broken_toilets_count})`);
    console.log(`  Desks in Use: ${stats.desks_in_use_count}`);
    console.log(`  Fans in Use: ${stats.fans_in_use_count}`);
    console.log(`  Computers in Use: ${stats.computers_in_use_count}`);

    console.log('\nStudent & Teacher Statistics:');
    console.log(`  Total Students: ${stats.total_students || 0}`);
    console.log(`  Average Students per School: ${stats.avg_students ? Math.round(stats.avg_students) : 0}`);
    console.log(`  Total Teachers: ${stats.total_teachers || 0}`);
    console.log(`  Average Teachers per School: ${stats.avg_teachers ? stats.avg_teachers.toFixed(1) : '0.0'}`);
    if (stats.total_students > 0 && stats.total_teachers > 0) {
      console.log(`  Student-Teacher Ratio: ${Math.round(stats.total_students / stats.total_teachers)}:1`);
    }

    console.log('\n' + '='.repeat(150));
    console.log('✅ Report generated successfully!');
    console.log('   File: comprehensive_school_report.csv');
    console.log(`   Total records: ${schoolData.length}`);
    console.log(`   Unique schools: ${uniqueSchools}`);
    console.log('='.repeat(150));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getComprehensiveSchoolReport();
