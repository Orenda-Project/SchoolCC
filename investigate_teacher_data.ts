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

async function investigateTeachers() {
  try {
    console.log('TEACHER DATA INVESTIGATION');
    console.log('='.repeat(80));
    console.log('Purpose: Identify why AEOs cannot see teachers in User Management\n');
    
    // 1. Total count of Teachers and Head Teachers
    const totalCount = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('1. TOTAL TEACHERS AND HEAD TEACHERS IN SYSTEM:');
    console.log('='.repeat(80));
    
    let totalTeachers = 0;
    let totalHeadTeachers = 0;
    
    totalCount.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
      if (row.role === 'Teacher') totalTeachers = parseInt(row.count);
      if (row.role === 'Head Teacher') totalHeadTeachers = parseInt(row.count);
    });
    
    const grandTotal = totalTeachers + totalHeadTeachers;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${grandTotal}`);
    
    // 2. Count with markaz_name populated
    const withMarkazName = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
        AND markaz_name IS NOT NULL
        AND markaz_name != ''
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('\n\n2. TEACHERS/HEAD TEACHERS WITH markaz_name POPULATED:');
    console.log('='.repeat(80));
    
    let teachersWithMarkaz = 0;
    let headTeachersWithMarkaz = 0;
    
    withMarkazName.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
      if (row.role === 'Teacher') teachersWithMarkaz = parseInt(row.count);
      if (row.role === 'Head Teacher') headTeachersWithMarkaz = parseInt(row.count);
    });
    
    const totalWithMarkaz = teachersWithMarkaz + headTeachersWithMarkaz;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${totalWithMarkaz}`);
    console.log(`Percentage: ${((totalWithMarkaz / grandTotal) * 100).toFixed(1)}%`);
    
    // 3. Count with school_id populated
    const withSchoolId = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
        AND school_id IS NOT NULL
        AND school_id != ''
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('\n\n3. TEACHERS/HEAD TEACHERS WITH school_id POPULATED:');
    console.log('='.repeat(80));
    
    let teachersWithSchool = 0;
    let headTeachersWithSchool = 0;
    
    withSchoolId.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
      if (row.role === 'Teacher') teachersWithSchool = parseInt(row.count);
      if (row.role === 'Head Teacher') headTeachersWithSchool = parseInt(row.count);
    });
    
    const totalWithSchool = teachersWithSchool + headTeachersWithSchool;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${totalWithSchool}`);
    console.log(`Percentage: ${((totalWithSchool / grandTotal) * 100).toFixed(1)}%`);
    
    // 3a. Count with BOTH markaz_name AND school_id populated
    const withBoth = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
        AND markaz_name IS NOT NULL
        AND markaz_name != ''
        AND school_id IS NOT NULL
        AND school_id != ''
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('\n\n3a. TEACHERS/HEAD TEACHERS WITH BOTH markaz_name AND school_id:');
    console.log('='.repeat(80));
    
    let teachersWithBoth = 0;
    let headTeachersWithBoth = 0;
    
    withBoth.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
      if (row.role === 'Teacher') teachersWithBoth = parseInt(row.count);
      if (row.role === 'Head Teacher') headTeachersWithBoth = parseInt(row.count);
    });
    
    const totalWithBoth = teachersWithBoth + headTeachersWithBoth;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${totalWithBoth}`);
    console.log(`Percentage: ${((totalWithBoth / grandTotal) * 100).toFixed(1)}%`);
    
    // 4. Sample of teachers showing current data
    const sampleTeachers = await client`
      SELECT 
        id,
        name,
        role,
        phone_number,
        markaz_name,
        markaz_id,
        school_id,
        school_name,
        status
      FROM users
      WHERE role IN ('Teacher', 'Head Teacher')
      ORDER BY 
        CASE 
          WHEN markaz_name IS NOT NULL AND school_id IS NOT NULL THEN 1
          WHEN markaz_name IS NOT NULL THEN 2
          WHEN school_id IS NOT NULL THEN 3
          ELSE 4
        END,
        name
      LIMIT 10
    `;
    
    console.log('\n\n4. SAMPLE OF 10 TEACHERS (Prioritizing those with data):');
    console.log('='.repeat(80));
    
    sampleTeachers.forEach((teacher: any, idx: number) => {
      console.log(`\n${idx + 1}. ${teacher.name}`);
      console.log(`   Role: ${teacher.role}`);
      console.log(`   Phone: ${teacher.phone_number || 'N/A'}`);
      console.log(`   Status: ${teacher.status}`);
      console.log(`   ---`);
      console.log(`   markaz_name: ${teacher.markaz_name || '❌ NOT SET'}`);
      console.log(`   markaz_id: ${teacher.markaz_id || '❌ NOT SET'}`);
      console.log(`   school_id: ${teacher.school_id || '❌ NOT SET'}`);
      console.log(`   school_name: ${teacher.school_name || '❌ NOT SET'}`);
      
      // Identify issues
      const issues = [];
      if (!teacher.markaz_name && !teacher.markaz_id) {
        issues.push('No markaz assignment (AEO cannot see)');
      }
      if (!teacher.school_id && !teacher.school_name) {
        issues.push('No school assignment');
      }
      if (teacher.markaz_name && !teacher.markaz_id) {
        issues.push('Has markaz_name but missing markaz_id');
      }
      if (teacher.school_name && !teacher.school_id) {
        issues.push('Has school_name but missing school_id');
      }
      
      if (issues.length > 0) {
        console.log(`   ⚠️  ISSUES:`);
        issues.forEach(issue => console.log(`      - ${issue}`));
      } else {
        console.log(`   ✓ Fully populated - AEO should see this user`);
      }
    });
    
    // SUMMARY AND ANALYSIS
    console.log('\n\n' + '='.repeat(80));
    console.log('CRITICAL ANALYSIS: WHY AEOs CANNOT SEE TEACHERS');
    console.log('='.repeat(80));
    
    const missingMarkazName = grandTotal - totalWithMarkaz;
    const missingSchoolId = grandTotal - totalWithSchool;
    const missingBoth = grandTotal - totalWithBoth;
    
    console.log(`\nTotal Teachers/Head Teachers: ${grandTotal}`);
    console.log(`\nData Completeness:`);
    console.log(`  ✓ With markaz_name: ${totalWithMarkaz} (${((totalWithMarkaz/grandTotal)*100).toFixed(1)}%)`);
    console.log(`  ❌ Missing markaz_name: ${missingMarkazName} (${((missingMarkazName/grandTotal)*100).toFixed(1)}%)`);
    console.log(`\n  ✓ With school_id: ${totalWithSchool} (${((totalWithSchool/grandTotal)*100).toFixed(1)}%)`);
    console.log(`  ❌ Missing school_id: ${missingSchoolId} (${((missingSchoolId/grandTotal)*100).toFixed(1)}%)`);
    console.log(`\n  ✓ With BOTH: ${totalWithBoth} (${((totalWithBoth/grandTotal)*100).toFixed(1)}%)`);
    console.log(`  ❌ Missing one or both: ${missingBoth} (${((missingBoth/grandTotal)*100).toFixed(1)}%)`);
    
    console.log('\n' + '='.repeat(80));
    console.log('ROOT CAUSE:');
    console.log('='.repeat(80));
    
    if (missingMarkazName > 0) {
      console.log(`⚠️  ${missingMarkazName} teachers/head teachers are missing markaz_name`);
      console.log('   → AEOs filter by markaz_name in their interface');
      console.log('   → These users will NOT appear in AEO User Management');
      console.log('   → This is likely the PRIMARY ISSUE');
    }
    
    if (missingSchoolId > 0) {
      console.log(`\n⚠️  ${missingSchoolId} teachers/head teachers are missing school_id`);
      console.log('   → This makes it difficult to know which school they belong to');
      console.log('   → May cause additional filtering issues');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('RECOMMENDED ACTION:');
    console.log('='.repeat(80));
    console.log('1. Update missing markaz_name fields based on school assignments');
    console.log('2. Ensure markaz_id is also populated (sync with markaz_name)');
    console.log('3. Verify school_id links are correct');
    console.log('4. Test AEO User Management interface after updates');
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

investigateTeachers();
