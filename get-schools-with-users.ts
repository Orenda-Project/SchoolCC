import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getSchoolsWithUsers() {
  try {
    console.log('📊 Fetching all schools and their users from production database...\n');

    // Get all schools
    const schools = await db.execute(sql`
      SELECT
        s.id,
        s.name as school_name,
        s.emis_number,
        s.address,
        m.name as markaz_name,
        t.name as tehsil_name
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      ORDER BY s.name
    `);

    console.log(`Total schools found: ${schools.length}\n`);

    // Get all users with their schools
    const usersResult = await db.execute(sql`
      SELECT
        u.id,
        u.name,
        u.phone_number,
        u.role,
        u.status,
        u.school_id,
        s.name as school_name,
        s.emis_number as school_emis
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.school_id IS NOT NULL
      ORDER BY u.school_id,
        CASE u.role
          WHEN 'HEAD_TEACHER' THEN 1
          WHEN 'TEACHER' THEN 2
          WHEN 'AEO' THEN 3
          ELSE 4
        END,
        u.name
    `);

    console.log(`Total users with schools: ${usersResult.length}\n`);

    // Group users by school_id
    const usersBySchool: Record<string, any[]> = {};
    usersResult.forEach((user: any) => {
      if (!usersBySchool[user.school_id]) {
        usersBySchool[user.school_id] = [];
      }
      usersBySchool[user.school_id].push(user);
    });

    // Statistics
    let schoolsWithUsers = 0;
    let schoolsWithoutUsers = 0;

    console.log('='.repeat(150));
    console.log('SCHOOLS WITH USERS');
    console.log('='.repeat(150) + '\n');

    // CSV data
    const csvRows: string[] = [];
    csvRows.push('School Name,EMIS Number,Markaz,Tehsil,User Name,Phone,Role,Status');

    schools.forEach((school: any, index: number) => {
      const users = usersBySchool[school.id] || [];

      if (users.length > 0) {
        schoolsWithUsers++;
      } else {
        schoolsWithoutUsers++;
      }

      console.log(`\n${index + 1}. ${school.school_name}`);
      console.log(`   EMIS: ${school.emis_number || 'N/A'}`);
      if (school.markaz_name) {
        console.log(`   Markaz: ${school.markaz_name}`);
      }
      if (school.tehsil_name) {
        console.log(`   Tehsil: ${school.tehsil_name}`);
      }

      if (users.length > 0) {
        console.log(`   Users (${users.length}):`);
        users.forEach((user: any, idx: number) => {
          console.log(`      ${idx + 1}. ${user.name} (${user.role})`);
          console.log(`         Phone: ${user.phone_number}`);
          console.log(`         Status: ${user.status}`);

          // Add to CSV
          csvRows.push(
            `"${school.school_name}","${school.emis_number || ''}","${school.markaz_name || ''}","${school.tehsil_name || ''}","${user.name}",${user.phone_number},${user.role},${user.status}`
          );
        });
      } else {
        console.log(`   ⚠️  No users assigned`);

        // Add blank row to CSV for schools without users
        csvRows.push(
          `"${school.school_name}","${school.emis_number || ''}","${school.markaz_name || ''}","${school.tehsil_name || ''}","","","",""`
        );
      }
    });

    console.log('\n' + '='.repeat(150));
    console.log('SUMMARY');
    console.log('='.repeat(150));
    console.log(`Total Schools: ${schools.length}`);
    console.log(`Schools with Users: ${schoolsWithUsers}`);
    console.log(`Schools without Users: ${schoolsWithoutUsers}`);
    console.log('='.repeat(150));

    // Write CSV file
    const csvContent = csvRows.join('\n');
    fs.writeFileSync('schools_with_users.csv', csvContent);

    console.log('\n✅ Export complete!');
    console.log('   CSV file: schools_with_users.csv');

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getSchoolsWithUsers();
