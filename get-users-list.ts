import { db } from './server/db';
import { users, schools } from './shared/schema';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getUsersList() {
  try {
    console.log('📊 Fetching all users from production database...\n');

    const result = await db.execute(sql`
      SELECT
        u.id,
        u.name,
        u.phone_number,
        u.role,
        u.school_id,
        u.school_name,
        u.markaz_name,
        u.tehsil_name,
        u.status,
        u.created_at,
        s.emis_number as school_emis
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      ORDER BY
        CASE u.role
          WHEN 'CEO' THEN 1
          WHEN 'DEO' THEN 2
          WHEN 'DDEO' THEN 3
          WHEN 'AEO' THEN 4
          WHEN 'Head Teacher' THEN 5
          WHEN 'Teacher' THEN 6
          WHEN 'Data Entry Operator' THEN 7
          ELSE 8
        END,
        u.name
    `);

    console.log(`Total users found: ${result.length}\n`);

    // Group by role
    const byRole: Record<string, any[]> = {};
    result.forEach((user: any) => {
      if (!byRole[user.role]) {
        byRole[user.role] = [];
      }
      byRole[user.role].push(user);
    });

    console.log('Users by Role:');
    Object.keys(byRole).forEach(role => {
      console.log(`  ${role}: ${byRole[role].length}`);
    });

    console.log('\n' + '='.repeat(150));
    console.log('COMPLETE USER LIST');
    console.log('='.repeat(150) + '\n');

    // Print formatted list
    const roles = ['CEO', 'DEO', 'DDEO', 'AEO', 'Head Teacher', 'Teacher', 'Data Entry Operator'];

    roles.forEach(role => {
      if (byRole[role] && byRole[role].length > 0) {
        console.log(`\n${'█'.repeat(50)}`);
        console.log(`█ ${role.toUpperCase()} (${byRole[role].length} users)`);
        console.log(`${'█'.repeat(50)}\n`);

        byRole[role].forEach((user: any, index: number) => {
          console.log(`${index + 1}. ${user.name || 'N/A'}`);
          console.log(`   Phone: ${user.phone_number}`);
          console.log(`   Role: ${user.role}`);
          console.log(`   Status: ${user.status}`);
          if (user.school_name) {
            console.log(`   School: ${user.school_name}`);
            if (user.school_emis) {
              console.log(`   EMIS: ${user.school_emis}`);
            }
          }
          if (user.markaz_name) {
            console.log(`   Markaz: ${user.markaz_name}`);
          }
          if (user.tehsil_name) {
            console.log(`   Tehsil: ${user.tehsil_name}`);
          }
          console.log(`   Created: ${new Date(user.created_at).toLocaleDateString()}`);
          console.log('');
        });
      }
    });

    // Create CSV export
    const csvHeaders = 'ID,Name,Phone,Role,Status,School Name,School EMIS,Markaz,Tehsil,Created At\n';
    const csvRows = result.map((user: any) =>
      `${user.id},"${user.name || ''}",${user.phone_number},${user.role},${user.status},"${user.school_name || ''}","${user.school_emis || ''}","${user.markaz_name || ''}","${user.tehsil_name || ''}",${new Date(user.created_at).toISOString()}`
    ).join('\n');

    const csvContent = csvHeaders + csvRows;
    fs.writeFileSync('users_list.csv', csvContent);

    console.log('\n' + '='.repeat(150));
    console.log('✅ Export complete! CSV file saved as: users_list.csv');
    console.log('='.repeat(150));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getUsersList();
