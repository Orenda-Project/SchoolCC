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

async function investigateMissing() {
  try {
    console.log('INVESTIGATION: 42 Teachers Still Missing Markaz Assignments');
    console.log('='.repeat(80));
    
    // Get the 42 teachers still missing markaz
    const missingTeachers = await client`
      SELECT 
        u.id,
        u.name,
        u.role,
        u.phone_number,
        u.school_id,
        u.school_name,
        u.markaz_name,
        u.markaz_id,
        u.status,
        s.id as school_actual_id,
        s.name as school_actual_name,
        s.markaz_id as school_markaz_id,
        m.name as school_markaz_name
      FROM users u
      LEFT JOIN schools s ON u.school_id = s.id
      LEFT JOIN markazes m ON s.markaz_id = m.id
      WHERE u.role IN ('TEACHER', 'HEAD_TEACHER')
        AND (u.markaz_name IS NULL OR u.markaz_name = '')
      ORDER BY u.name
    `;
    
    console.log(`Found ${missingTeachers.length} teachers without markaz assignments\n`);
    
    // Categorize the issues
    let noSchoolId = 0;
    let schoolNotFound = 0;
    let schoolNoMarkaz = 0;
    let markazNotFound = 0;
    
    console.log('DETAILED BREAKDOWN:');
    console.log('='.repeat(80));
    
    missingTeachers.forEach((teacher: any, idx: number) => {
      console.log(`\n${idx + 1}. ${teacher.name}`);
      console.log(`   Role: ${teacher.role}`);
      console.log(`   Phone: ${teacher.phone_number || 'N/A'}`);
      console.log(`   Status: ${teacher.status}`);
      console.log(`   ---`);
      console.log(`   User's school_id: ${teacher.school_id || '❌ NOT SET'}`);
      console.log(`   User's school_name: ${teacher.school_name || 'N/A'}`);
      
      // Diagnose the issue
      if (!teacher.school_id) {
        console.log(`   ❌ ISSUE: No school_id assigned to this user`);
        noSchoolId++;
      } else if (!teacher.school_actual_id) {
        console.log(`   ❌ ISSUE: school_id "${teacher.school_id}" not found in schools table`);
        console.log(`      (Orphaned school_id - school may have been deleted)`);
        schoolNotFound++;
      } else if (!teacher.school_markaz_id) {
        console.log(`   ❌ ISSUE: School "${teacher.school_actual_name}" has no markaz_id`);
        console.log(`      School needs to be assigned to a markaz first`);
        schoolNoMarkaz++;
      } else if (!teacher.school_markaz_name) {
        console.log(`   ❌ ISSUE: School's markaz_id "${teacher.school_markaz_id}" not found in markazes table`);
        console.log(`      (Orphaned markaz_id - markaz may have been deleted)`);
        markazNotFound++;
      } else {
        console.log(`   ⚠️  UNEXPECTED: School has markaz but teacher wasn't updated`);
        console.log(`      School Markaz: ${teacher.school_markaz_name}`);
      }
    });
    
    // Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('ROOT CAUSE SUMMARY FOR 42 MISSING TEACHERS:');
    console.log('='.repeat(80));
    
    console.log(`\nTotal Teachers Missing Markaz: ${missingTeachers.length}`);
    console.log(`\nBreakdown by Issue:`);
    console.log(`  1. No school_id assigned: ${noSchoolId}`);
    console.log(`  2. School not found (orphaned school_id): ${schoolNotFound}`);
    console.log(`  3. School has no markaz_id: ${schoolNoMarkaz}`);
    console.log(`  4. Markaz not found (orphaned markaz_id): ${markazNotFound}`);
    
    console.log('\n' + '='.repeat(80));
    console.log('RECOMMENDED ACTIONS:');
    console.log('='.repeat(80));
    
    if (noSchoolId > 0) {
      console.log(`\n1. ${noSchoolId} teacher(s) need school assignments:`);
      console.log('   → Assign them to schools via school_id');
      console.log('   → Then their markaz will auto-populate');
    }
    
    if (schoolNotFound > 0) {
      console.log(`\n2. ${schoolNotFound} teacher(s) have invalid school_id references:`);
      console.log('   → Clean up orphaned school_id values');
      console.log('   → Reassign to valid schools');
    }
    
    if (schoolNoMarkaz > 0) {
      console.log(`\n3. ${schoolNoMarkaz} teacher(s) are in schools without markaz:`);
      console.log('   → These schools need markaz_id assigned first');
      console.log('   → Once schools have markaz, run UPDATE again');
      
      // List the schools without markaz
      const schoolsNoMarkaz = await client`
        SELECT DISTINCT s.id, s.name, s.emis_number
        FROM users u
        INNER JOIN schools s ON u.school_id = s.id
        WHERE u.role IN ('TEACHER', 'HEAD_TEACHER')
          AND (u.markaz_name IS NULL OR u.markaz_name = '')
          AND s.markaz_id IS NULL
        ORDER BY s.name
      `;
      
      if (schoolsNoMarkaz.length > 0) {
        console.log(`\n   Schools needing markaz assignment (${schoolsNoMarkaz.length}):`);
        schoolsNoMarkaz.forEach((school: any, idx: number) => {
          console.log(`   ${idx + 1}. ${school.name} (EMIS: ${school.emis_number})`);
        });
      }
    }
    
    if (markazNotFound > 0) {
      console.log(`\n4. ${markazNotFound} teacher(s) have schools with invalid markaz_id:`);
      console.log('   → Fix the schools\' markaz_id to point to valid markazes');
      console.log('   → Then run UPDATE again');
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

investigateMissing();
