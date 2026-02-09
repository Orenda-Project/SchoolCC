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

async function investigate() {
  try {
    console.log('Connected to database\n');
    console.log('INVESTIGATION: RAIKA MAIRA MARKAZ');
    console.log('='.repeat(80));
    
    // Step 1: Find the markaz_id for RAIKA MAIRA
    const markazQuery = `
      SELECT id, name
      FROM markazes
      WHERE UPPER(name) = 'RAIKA MAIRA'
      LIMIT 1
    `;

    const markazResult = await client.unsafe(markazQuery);

    if (markazResult.length === 0) {
      console.log('Markaz "RAIKA MAIRA" not found in markazes table');
      process.exit(0);
    }

    const markazId = markazResult[0].id;
    console.log(`Found Markaz: ${markazResult[0].name} (ID: ${markazId})`);

    // Step 2: Count schools in RAIKA MAIRA markaz
    const schoolCountQuery = `
      SELECT COUNT(*) as count
      FROM schools
      WHERE markaz_id = $1
    `;

    const countResult = await client.unsafe(schoolCountQuery, [markazId]);
    const schoolCount = countResult[0].count;

    console.log(`\n1. SCHOOLS IN RAIKA MAIRA MARKAZ: ${schoolCount}`);
    console.log('='.repeat(80));

    if (schoolCount === 0) {
      console.log('No schools found in RAIKA MAIRA markaz');
      process.exit(0);
    }

    // Step 3: List all schools in RAIKA MAIRA
    const schoolsQuery = `
      SELECT
        s.id,
        s.name,
        s.emis_number,
        s.code,
        s.markaz_id,
        m.name as markaz_name
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      WHERE s.markaz_id = $1
      ORDER BY s.name
    `;

    const schools = await client.unsafe(schoolsQuery, [markazId]);

    console.log('\n2. LIST OF SCHOOLS:');
    console.log('='.repeat(80));
    schools.forEach((school: any, index: number) => {
      console.log(`\n${index + 1}. ${school.name}`);
      console.log(`   School ID: ${school.id}`);
      console.log(`   EMIS Number: ${school.emis_number}`);
      console.log(`   Code: ${school.code}`);
      console.log(`   Markaz: ${school.markaz_name}`);
    });
    
    // Step 3 & 4: For each school, find teachers and check markaz_name
    console.log('\n\n3. TEACHERS BY SCHOOL (WITH MARKAZ_NAME STATUS):');
    console.log('='.repeat(80));
    
    let totalTeachers = 0;
    let teachersWithMarkaz = 0;
    let teachersWithoutMarkaz = 0;
    
    for (const school of schools) {
      const teachersQuery = `
        SELECT 
          id,
          name,
          role,
          phone_number,
          markaz_name,
          status
        FROM users
        WHERE school_id = $1
          AND role IN ('Head Teacher', 'Teacher')
        ORDER BY role, name
      `;
      
      const teachers = await client.unsafe(teachersQuery, [school.id]);
      
      console.log(`\n\nSchool: ${school.name}`);
      console.log(`EMIS: ${school.emis_number}`);
      console.log(`Teachers Found: ${teachers.length}`);
      console.log('-'.repeat(80));
      
      if (teachers.length === 0) {
        console.log('   No teachers assigned to this school');
      } else {
        teachers.forEach((teacher: any, idx: number) => {
          totalTeachers++;
          const hasMarkaz = teacher.markaz_name ? true : false;
          if (hasMarkaz) {
            teachersWithMarkaz++;
          } else {
            teachersWithoutMarkaz++;
          }
          
          console.log(`\n   ${idx + 1}. ${teacher.name}`);
          console.log(`      Role: ${teacher.role}`);
          console.log(`      Phone: ${teacher.phone_number || 'N/A'}`);
          console.log(`      Markaz Name: ${teacher.markaz_name || '❌ NOT SET'}`);
          console.log(`      Status: ${teacher.status}`);
          
          if (!hasMarkaz) {
            console.log(`      ⚠️  WARNING: markaz_name is NULL - needs to be set to 'RAIKA MAIRA'`);
          } else if (teacher.markaz_name !== 'RAIKA MAIRA') {
            console.log(`      ⚠️  WARNING: markaz_name is '${teacher.markaz_name}' but should be 'RAIKA MAIRA'`);
          } else {
            console.log(`      ✓ markaz_name is correctly set`);
          }
        });
      }
    }
    
    // Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('SUMMARY:');
    console.log('='.repeat(80));
    console.log(`Schools in RAIKA MAIRA: ${schoolCount}`);
    console.log(`Total Teachers/Head Teachers: ${totalTeachers}`);
    console.log(`Teachers WITH markaz_name set: ${teachersWithMarkaz}`);
    console.log(`Teachers WITHOUT markaz_name set: ${teachersWithoutMarkaz}`);
    
    if (teachersWithoutMarkaz > 0) {
      console.log('\n⚠️  ACTION REQUIRED:');
      console.log(`   ${teachersWithoutMarkaz} teacher(s) need their markaz_name field updated to 'RAIKA MAIRA'`);
    }
    
    if (totalTeachers === 0) {
      console.log('\n⚠️  NOTE: No teachers found in any schools in this markaz');
      console.log('   Either schools have no staff assigned, or teachers exist but are not linked via school_id');
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

investigate();
