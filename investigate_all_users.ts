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

async function investigateAllUsers() {
  try {
    console.log('COMPLETE USER INVESTIGATION');
    console.log('='.repeat(80));
    
    // 1. Total count of ALL users
    const totalUsers = await client`
      SELECT COUNT(*) as count FROM users
    `;
    
    console.log(`\nTotal Users in System: ${totalUsers[0].count}`);
    
    // 2. Breakdown by role
    const roleBreakdown = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      GROUP BY role
      ORDER BY count DESC, role
    `;
    
    console.log('\n1. USER BREAKDOWN BY ROLE:');
    console.log('='.repeat(80));
    
    roleBreakdown.forEach((row: any) => {
      console.log(`${row.role}: ${row.count}`);
    });
    
    // 3. Check for various role naming variations
    console.log('\n\n2. CHECKING FOR ROLE NAMING VARIATIONS:');
    console.log('='.repeat(80));
    
    const roleVariations = await client`
      SELECT DISTINCT role FROM users ORDER BY role
    `;
    
    console.log('All distinct role values in database:');
    roleVariations.forEach((row: any, idx: number) => {
      console.log(`${idx + 1}. "${row.role}"`);
    });
    
    // 4. Sample users from each major role
    console.log('\n\n3. SAMPLE USERS FROM EACH ROLE (2 per role):');
    console.log('='.repeat(80));
    
    for (const roleRow of roleBreakdown) {
      const role = roleRow.role;
      const sampleUsers = await client`
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
        WHERE role = ${role}
        LIMIT 2
      `;
      
      console.log(`\n${role.toUpperCase()} (Total: ${roleRow.count}):`);
      console.log('-'.repeat(80));
      
      sampleUsers.forEach((user: any, idx: number) => {
        console.log(`\n  ${idx + 1}. ${user.name}`);
        console.log(`     Phone: ${user.phone_number || 'N/A'}`);
        console.log(`     Status: ${user.status}`);
        console.log(`     markaz_name: ${user.markaz_name || 'NOT SET'}`);
        console.log(`     markaz_id: ${user.markaz_id || 'NOT SET'}`);
        console.log(`     school_id: ${user.school_id || 'NOT SET'}`);
        console.log(`     school_name: ${user.school_name || 'NOT SET'}`);
      });
    }
    
    // 5. Check if there might be case sensitivity issues
    console.log('\n\n4. CHECKING FOR CASE VARIATIONS OF "Teacher" and "Head Teacher":');
    console.log('='.repeat(80));
    
    const teacherVariations = await client`
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      WHERE LOWER(role) LIKE '%teacher%'
      GROUP BY role
      ORDER BY count DESC
    `;
    
    if (teacherVariations.length > 0) {
      console.log('Found roles containing "teacher":');
      teacherVariations.forEach((row: any) => {
        console.log(`  "${row.role}": ${row.count}`);
      });
    } else {
      console.log('❌ NO ROLES containing "teacher" found in the system');
      console.log('   This confirms there are ZERO teachers in the database');
    }
    
    // 6. Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('CRITICAL FINDINGS:');
    console.log('='.repeat(80));
    
    console.log(`\nTotal Users: ${totalUsers[0].count}`);
    console.log(`Distinct Roles: ${roleBreakdown.length}`);
    
    const teacherCount = teacherVariations.reduce((sum: number, row: any) => 
      sum + parseInt(row.count), 0
    );
    
    if (teacherCount === 0) {
      console.log('\n🚨 CRITICAL ISSUE IDENTIFIED:');
      console.log('   NO TEACHERS OR HEAD TEACHERS EXIST IN THE DATABASE');
      console.log('\n   This explains why AEOs cannot see any teachers:');
      console.log('   → There are literally no teacher users to display');
      console.log('   → The system has AEOs assigned to markazes');
      console.log('   → The system has schools');
      console.log('   → BUT: No teacher/head teacher users have been created');
      console.log('\n   REQUIRED ACTION:');
      console.log('   → Import or create teacher user accounts');
      console.log('   → Assign them to appropriate schools (school_id)');
      console.log('   → Assign them to appropriate markazes (markaz_name, markaz_id)');
      console.log('   → Set their role to "Teacher" or "Head Teacher"');
    } else {
      console.log(`\n✓ Found ${teacherCount} users with teacher-related roles`);
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

investigateAllUsers();
