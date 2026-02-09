import { readFileSync } from 'fs';
import postgres from "postgres";

const envContent = readFileSync('.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const connectionString = dbUrlMatch[1].trim();
const client = postgres(connectionString);

async function getDetails() {
  try {
    console.log('DETAILED REPORT: SCHOOLS WITH "RAIKA" IN NAME');
    console.log('='.repeat(80));
    
    // Get schools with RAIKA in name
    const schools = await client`
      SELECT 
        s.id,
        s.name,
        s.emis_number,
        s.code,
        s.markaz_id,
        m.name as markaz_name
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      WHERE UPPER(s.name) LIKE '%RAIKA%'
      ORDER BY s.name
    `;
    
    console.log(`\nFound ${schools.length} schools:\n`);
    
    let totalTeachers = 0;
    let totalHeadTeachers = 0;
    
    for (let i = 0; i < schools.length; i++) {
      const school = schools[i];
      
      console.log(`\n${'='.repeat(80)}`);
      console.log(`SCHOOL ${i + 1}: ${school.name}`);
      console.log(`${'='.repeat(80)}`);
      console.log(`EMIS Number: ${school.emis_number}`);
      console.log(`School Code: ${school.code}`);
      console.log(`School ID: ${school.id}`);
      console.log(`Current Markaz ID: ${school.markaz_id || 'NOT SET'}`);
      console.log(`Current Markaz Name: ${school.markaz_name || 'NOT SET'}`);
      
      // Get teachers for this school
      const teachers = await client`
        SELECT 
          id,
          name,
          role,
          phone_number,
          markaz_id,
          markaz_name,
          status
        FROM users
        WHERE school_id = ${school.id}
          AND role IN ('Head Teacher', 'Teacher')
        ORDER BY 
          CASE 
            WHEN role = 'Head Teacher' THEN 1
            WHEN role = 'Teacher' THEN 2
            ELSE 3
          END,
          name
      `;
      
      console.log(`\nTeachers/Head Teachers: ${teachers.length}`);
      
      if (teachers.length > 0) {
        console.log('-'.repeat(80));
        
        teachers.forEach((teacher: any, idx: number) => {
          if (teacher.role === 'Head Teacher') totalHeadTeachers++;
          if (teacher.role === 'Teacher') totalTeachers++;
          
          console.log(`\n${idx + 1}. ${teacher.name}`);
          console.log(`   Role: ${teacher.role}`);
          console.log(`   Phone: ${teacher.phone_number || 'N/A'}`);
          console.log(`   Status: ${teacher.status}`);
          console.log(`   Markaz ID: ${teacher.markaz_id || '❌ NOT SET'}`);
          console.log(`   Markaz Name: ${teacher.markaz_name || '❌ NOT SET'}`);
          
          // Check if data is inconsistent
          if (teacher.markaz_id !== school.markaz_id) {
            console.log(`   ⚠️  MISMATCH: Teacher's markaz_id doesn't match school's markaz_id`);
          }
          if (teacher.markaz_name !== school.markaz_name) {
            console.log(`   ⚠️  MISMATCH: Teacher's markaz_name doesn't match school's markaz_name`);
          }
        });
      } else {
        console.log('   No teachers assigned to this school');
      }
    }
    
    // Overall summary
    console.log('\n\n' + '='.repeat(80));
    console.log('OVERALL SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Schools Found: ${schools.length}`);
    console.log(`Total Head Teachers: ${totalHeadTeachers}`);
    console.log(`Total Teachers: ${totalTeachers}`);
    console.log(`Total Staff: ${totalHeadTeachers + totalTeachers}`);
    
    console.log('\n' + '='.repeat(80));
    console.log('KEY FINDINGS:');
    console.log('='.repeat(80));
    
    // Check if schools need to be reassigned
    const raikaMairaMarkazId = 'e4089ce1-5d4e-492a-bd09-90c95ee973ce';
    const schoolsNeedingReassignment = schools.filter((s: any) => s.markaz_id !== raikaMairaMarkazId);
    
    if (schoolsNeedingReassignment.length > 0) {
      console.log(`\n⚠️  ${schoolsNeedingReassignment.length} school(s) with "RAIKA" in name are assigned to different markazes:`);
      schoolsNeedingReassignment.forEach((s: any) => {
        console.log(`   - ${s.name} (EMIS: ${s.emis_number})`);
        console.log(`     Current Markaz: ${s.markaz_name || 'NOT SET'}`);
        console.log(`     Expected Markaz: RAIKA MAIRA`);
      });
      
      console.log('\n💡 RECOMMENDATION:');
      console.log('   These schools should probably be reassigned to the "RAIKA MAIRA" markaz');
      console.log('   along with their teachers to match AEO Malik Nadeem Sultan\'s assignment.');
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

getDetails();
