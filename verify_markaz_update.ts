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

async function verifyUpdate() {
  try {
    console.log('VERIFICATION REPORT: Markaz Assignment Update');
    console.log('='.repeat(80));
    console.log('Checking if teachers now have markaz_name and markaz_id populated\n');
    
    // 1. Total count of Teachers and Head Teachers
    const totalCount = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('BASELINE: TOTAL TEACHERS AND HEAD TEACHERS');
    console.log('='.repeat(80));
    
    let totalTeachers = 0;
    let totalHeadTeachers = 0;
    
    totalCount.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
      if (row.role === 'TEACHER') totalTeachers = parseInt(row.count);
      if (row.role === 'HEAD_TEACHER') totalHeadTeachers = parseInt(row.count);
    });
    
    const grandTotal = totalTeachers + totalHeadTeachers;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${grandTotal}`);
    
    // 2. Count with markaz_name populated (AFTER UPDATE)
    const withMarkazName = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
        AND markaz_name IS NOT NULL
        AND markaz_name != ''
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('\n\n1. TEACHERS/HEAD TEACHERS WITH markaz_name POPULATED (AFTER UPDATE):');
    console.log('='.repeat(80));
    
    let teachersWithMarkaz = 0;
    let headTeachersWithMarkaz = 0;
    
    if (withMarkazName.length > 0) {
      withMarkazName.forEach((row: any) => {
        console.log(`${row.role}: ${row.count}`);
        if (row.role === 'TEACHER') teachersWithMarkaz = parseInt(row.count);
        if (row.role === 'HEAD_TEACHER') headTeachersWithMarkaz = parseInt(row.count);
      });
    } else {
      console.log('❌ (None - Update may have failed)');
    }
    
    const totalWithMarkaz = teachersWithMarkaz + headTeachersWithMarkaz;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${totalWithMarkaz}`);
    console.log(`Percentage: ${((totalWithMarkaz / grandTotal) * 100).toFixed(1)}%`);
    
    if (totalWithMarkaz > 0) {
      console.log(`✓ SUCCESS: ${totalWithMarkaz} teachers now have markaz_name!`);
    } else {
      console.log(`❌ ISSUE: No teachers have markaz_name. Update may have failed.`);
    }
    
    // 3. Count with markaz_id populated (AFTER UPDATE)
    const withMarkazId = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
        AND markaz_id IS NOT NULL
        AND markaz_id != ''
      GROUP BY role
      ORDER BY role
    `;
    
    console.log('\n\n2. TEACHERS/HEAD TEACHERS WITH markaz_id POPULATED (AFTER UPDATE):');
    console.log('='.repeat(80));
    
    let teachersWithMarkazId = 0;
    let headTeachersWithMarkazId = 0;
    
    if (withMarkazId.length > 0) {
      withMarkazId.forEach((row: any) => {
        console.log(`${row.role}: ${row.count}`);
        if (row.role === 'TEACHER') teachersWithMarkazId = parseInt(row.count);
        if (row.role === 'HEAD_TEACHER') headTeachersWithMarkazId = parseInt(row.count);
      });
    } else {
      console.log('❌ (None - Update may have failed)');
    }
    
    const totalWithMarkazId = teachersWithMarkazId + headTeachersWithMarkazId;
    console.log(`${'='.repeat(80)}`);
    console.log(`TOTAL: ${totalWithMarkazId}`);
    console.log(`Percentage: ${((totalWithMarkazId / grandTotal) * 100).toFixed(1)}%`);
    
    if (totalWithMarkazId > 0) {
      console.log(`✓ SUCCESS: ${totalWithMarkazId} teachers now have markaz_id!`);
    } else {
      console.log(`❌ ISSUE: No teachers have markaz_id. Update may have failed.`);
    }
    
    // 4. Sample of teachers showing updated data
    console.log('\n\n3. SAMPLE OF 10 TEACHERS (Showing Updated Data):');
    console.log('='.repeat(80));
    
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
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
      ORDER BY 
        CASE 
          WHEN markaz_name IS NOT NULL AND markaz_id IS NOT NULL THEN 1
          WHEN markaz_name IS NOT NULL THEN 2
          WHEN markaz_id IS NOT NULL THEN 3
          ELSE 4
        END,
        name
      LIMIT 10
    `;
    
    sampleTeachers.forEach((teacher: any, idx: number) => {
      console.log(`\n${idx + 1}. ${teacher.name}`);
      console.log(`   Role: ${teacher.role}`);
      console.log(`   Phone: ${teacher.phone_number || 'N/A'}`);
      console.log(`   School: ${teacher.school_name || 'N/A'}`);
      console.log(`   Status: ${teacher.status}`);
      console.log(`   ---`);
      console.log(`   markaz_name: ${teacher.markaz_name || '❌ NOT SET'}`);
      console.log(`   markaz_id: ${teacher.markaz_id ? '✓ ' + teacher.markaz_id.substring(0, 36) : '❌ NOT SET'}`);
      
      // Check if update was successful
      if (teacher.markaz_name && teacher.markaz_id) {
        console.log(`   ✓ FULLY UPDATED - AEO can now see this user!`);
      } else if (teacher.markaz_name || teacher.markaz_id) {
        console.log(`   ⚠️  PARTIALLY UPDATED - Missing ${!teacher.markaz_name ? 'markaz_name' : 'markaz_id'}`);
      } else {
        console.log(`   ❌ NOT UPDATED - Still missing both fields`);
      }
    });
    
    // 5. Count teachers by markaz (distribution)
    console.log('\n\n4. TEACHER DISTRIBUTION BY MARKAZ:');
    console.log('='.repeat(80));
    
    const markazDistribution = await client`
      SELECT 
        markaz_name,
        COUNT(*) as teacher_count,
        COUNT(CASE WHEN role = 'TEACHER' THEN 1 END) as teachers,
        COUNT(CASE WHEN role = 'HEAD_TEACHER' THEN 1 END) as head_teachers
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
        AND markaz_name IS NOT NULL
        AND markaz_name != ''
      GROUP BY markaz_name
      ORDER BY teacher_count DESC
    `;
    
    if (markazDistribution.length > 0) {
      console.log(`\nFound ${markazDistribution.length} markazes with teachers assigned:\n`);
      
      markazDistribution.forEach((markaz: any, idx: number) => {
        console.log(`${idx + 1}. ${markaz.markaz_name}`);
        console.log(`   Total Staff: ${markaz.teacher_count}`);
        console.log(`   - Teachers: ${markaz.teachers}`);
        console.log(`   - Head Teachers: ${markaz.head_teachers}`);
        console.log('');
      });
      
      console.log('='.repeat(80));
      console.log('DISTRIBUTION SUMMARY:');
      console.log(`Total Markazes with Staff: ${markazDistribution.length}`);
      console.log(`Total Staff Assigned: ${markazDistribution.reduce((sum: number, m: any) => sum + parseInt(m.teacher_count), 0)}`);
    } else {
      console.log('\n❌ No teachers found with markaz assignments');
      console.log('   The UPDATE query may not have executed successfully');
    }
    
    // 6. Check for teachers still missing markaz
    const stillMissing = await client`
      SELECT COUNT(*) as count
      FROM users
      WHERE role IN ('TEACHER', 'HEAD_TEACHER')
        AND (markaz_name IS NULL OR markaz_name = '')
    `;
    
    const missingCount = parseInt(stillMissing[0].count);
    
    console.log('\n\n' + '='.repeat(80));
    console.log('FINAL VERIFICATION SUMMARY:');
    console.log('='.repeat(80));
    
    console.log(`\nTotal Teachers/Head Teachers: ${grandTotal}`);
    console.log(`\nAfter UPDATE:`);
    console.log(`  ✓ With markaz_name: ${totalWithMarkaz} (${((totalWithMarkaz/grandTotal)*100).toFixed(1)}%)`);
    console.log(`  ✓ With markaz_id: ${totalWithMarkazId} (${((totalWithMarkazId/grandTotal)*100).toFixed(1)}%)`);
    console.log(`  ❌ Still missing markaz: ${missingCount} (${((missingCount/grandTotal)*100).toFixed(1)}%)`);
    
    if (totalWithMarkaz === grandTotal) {
      console.log('\n✅ PERFECT: All teachers now have markaz assignments!');
      console.log('   AEOs should now be able to see teachers in User Management');
    } else if (totalWithMarkaz > 0 && totalWithMarkaz < grandTotal) {
      console.log(`\n⚠️  PARTIAL SUCCESS: ${totalWithMarkaz}/${grandTotal} teachers updated`);
      console.log(`   ${missingCount} teachers still need markaz assignments`);
      console.log('   Possible reasons:');
      console.log('   - Their schools may not have markaz_id assigned');
      console.log('   - They may not have school_id assigned');
    } else {
      console.log('\n❌ UPDATE FAILED: No teachers have markaz assignments');
      console.log('   Please check the UPDATE query and try again');
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyUpdate();
