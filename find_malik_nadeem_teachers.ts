import { readFileSync } from 'fs';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Read .env manually
const envContent = readFileSync('.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const connectionString = dbUrlMatch[1].trim();
const client = postgres(connectionString);
const db = drizzle(client);

async function findTeachers() {
  try {
    console.log('Connected to database\n');

    // Step 1: Find the AEO
    const aeoQuery = `
      SELECT id, name, markaz_name, role, phone_number, status
      FROM users
      WHERE LOWER(name) LIKE '%malik nadeem%'
        AND role = 'AEO'
      LIMIT 1
    `;

    const aeoResult = await client.unsafe(aeoQuery);

    if (aeoResult.length === 0) {
      console.log('AEO "Malik Nadeem Sultan" not found');
      process.exit(0);
    }

    const aeo = aeoResult[0];
    console.log('AEO INFORMATION:');
    console.log('='.repeat(80));
    console.log(`Name: ${aeo.name}`);
    console.log(`Role: ${aeo.role}`);
    console.log(`Markaz: ${aeo.markaz_name}`);
    console.log(`Phone: ${aeo.phone_number || 'N/A'}`);
    console.log(`Status: ${aeo.status}`);
    console.log('='.repeat(80));

    // Step 2 & 3: Find all teachers and head teachers
    const teachersQuery = `
      SELECT
        u.id,
        u.name,
        u.role,
        u.phone_number,
        u.markaz_name,
        u.status,
        s.name as school_name,
        s.emis_number as emis_code
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      WHERE u.markaz_name = $1
        AND u.role IN ('Head Teacher', 'Teacher')
      ORDER BY u.role, u.name
    `;

    const teachersResult = await client.unsafe(teachersQuery, [aeo.markaz_name]);

    console.log(`\nTEACHERS AND HEAD TEACHERS UNDER ${aeo.name}`);
    console.log(`Markaz: ${aeo.markaz_name}`);
    console.log(`Total: ${teachersResult.length}`);
    console.log('='.repeat(80));

    if (teachersResult.length === 0) {
      console.log('\nNo teachers or head teachers found under this AEO');
    } else {
      teachersResult.forEach((teacher: any, index: number) => {
        console.log(`\n${index + 1}. ${teacher.name}`);
        console.log(`   Role: ${teacher.role}`);
        console.log(`   Phone: ${teacher.phone_number || 'N/A'}`);
        console.log(`   School: ${teacher.school_name || 'Not assigned'}`);
        if (teacher.emis_code) {
          console.log(`   EMIS Code: ${teacher.emis_code}`);
        }
        console.log(`   Status: ${teacher.status}`);
      });
      
      console.log('\n' + '='.repeat(80));
      console.log('SUMMARY:');
      const headTeachers = teachersResult.filter((t: any) => t.role === 'Head Teacher');
      const teachers = teachersResult.filter((t: any) => t.role === 'Teacher');
      console.log(`Head Teachers: ${headTeachers.length}`);
      console.log(`Teachers: ${teachers.length}`);
      console.log(`Total: ${teachersResult.length}`);
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

findTeachers();
