import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function checkUserSchoolRelation() {
  try {
    console.log('Checking user-school relationships...\n');

    const users = await db.execute(sql`
      SELECT id, name, role, school_id, school_name, markaz_name, tehsil_name
      FROM users
      ORDER BY role, name
      LIMIT 15
    `);

    console.log('Sample users with school relationships:');
    users.forEach((user: any) => {
      console.log(`- ${user.name} (${user.role})`);
      console.log(`  school_id: ${user.school_id || 'NULL'}`);
      console.log(`  school_name: ${user.school_name || 'NULL'}`);
      console.log(`  markaz_name: ${user.markaz_name || 'NULL'}`);
      console.log(`  tehsil_name: ${user.tehsil_name || 'NULL'}\n`);
    });

    // Count users by school_id vs school_name
    const bySchoolId = await db.execute(sql`
      SELECT COUNT(*) as count
      FROM users
      WHERE role IN ('Head Teacher', 'Teacher') AND school_id IS NOT NULL
    `);

    const bySchoolName = await db.execute(sql`
      SELECT COUNT(*) as count
      FROM users
      WHERE role IN ('Head Teacher', 'Teacher') AND school_name IS NOT NULL
    `);

    console.log('User-School Relationship Summary:');
    console.log(`  Users with school_id: ${bySchoolId[0].count}`);
    console.log(`  Users with school_name: ${bySchoolName[0].count}`);

  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

checkUserSchoolRelation();
