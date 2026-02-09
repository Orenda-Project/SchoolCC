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

async function fullInvestigation() {
  try {
    console.log('COMPREHENSIVE INVESTIGATION: RAIKA MAIRA MARKAZ');
    console.log('='.repeat(80));
    
    // 1. Check if markaz exists
    const markazInfo = await client`
      SELECT id, name, tehsil_id, district_id, created_at
      FROM markazes
      WHERE UPPER(name) = 'RAIKA MAIRA'
    `;
    
    if (markazInfo.length === 0) {
      console.log('Markaz "RAIKA MAIRA" does not exist');
      process.exit(0);
    }
    
    console.log('\n1. MARKAZ INFORMATION:');
    console.log('='.repeat(80));
    console.log(`Name: ${markazInfo[0].name}`);
    console.log(`ID: ${markazInfo[0].id}`);
    console.log(`Tehsil ID: ${markazInfo[0].tehsil_id}`);
    console.log(`District ID: ${markazInfo[0].district_id}`);
    console.log(`Created: ${markazInfo[0].created_at}`);
    
    const markazId = markazInfo[0].id;
    
    // 2. Check schools by markaz_id
    const schoolsByMarkazId = await client`
      SELECT COUNT(*) as count
      FROM schools
      WHERE markaz_id = ${markazId}
    `;
    
    console.log('\n2. SCHOOLS LINKED BY markaz_id:');
    console.log('='.repeat(80));
    console.log(`Count: ${schoolsByMarkazId[0].count}`);
    
    // 3. Check if any schools reference this markaz in their name or other fields
    const schoolsLikeRaika = await client`
      SELECT id, name, emis_number, code, markaz_id, address
      FROM schools
      WHERE UPPER(name) LIKE '%RAIKA%'
         OR UPPER(address) LIKE '%RAIKA%'
      ORDER BY name
    `;
    
    console.log('\n3. SCHOOLS WITH "RAIKA" IN NAME OR ADDRESS:');
    console.log('='.repeat(80));
    console.log(`Found: ${schoolsLikeRaika.length}`);
    
    if (schoolsLikeRaika.length > 0) {
      schoolsLikeRaika.forEach((school: any, idx: number) => {
        console.log(`\n${idx + 1}. ${school.name}`);
        console.log(`   EMIS: ${school.emis_number}`);
        console.log(`   Markaz ID: ${school.markaz_id || 'NOT SET'}`);
        console.log(`   Address: ${school.address || 'N/A'}`);
      });
    }
    
    // 4. Check users with markaz_name = RAIKA MAIRA
    const usersByMarkazName = await client`
      SELECT id, name, role, markaz_name, school_id, phone_number
      FROM users
      WHERE UPPER(markaz_name) = 'RAIKA MAIRA'
      ORDER BY role, name
    `;
    
    console.log('\n\n4. USERS WITH markaz_name = "RAIKA MAIRA":');
    console.log('='.repeat(80));
    console.log(`Found: ${usersByMarkazName.length}`);
    
    if (usersByMarkazName.length > 0) {
      const groupedByRole = usersByMarkazName.reduce((acc: any, user: any) => {
        if (!acc[user.role]) acc[user.role] = [];
        acc[user.role].push(user);
        return acc;
      }, {});
      
      Object.keys(groupedByRole).forEach((role: string) => {
        console.log(`\n${role}: ${groupedByRole[role].length}`);
        groupedByRole[role].forEach((user: any, idx: number) => {
          console.log(`   ${idx + 1}. ${user.name} (Phone: ${user.phone_number})`);
          console.log(`      School ID: ${user.school_id || 'NOT SET'}`);
        });
      });
    }
    
    // 5. Check users by markaz_id
    const usersByMarkazId = await client`
      SELECT id, name, role, markaz_id, markaz_name, school_id, phone_number
      FROM users
      WHERE markaz_id = ${markazId}
      ORDER BY role, name
    `;
    
    console.log('\n\n5. USERS WITH markaz_id = ' + markazId + ':');
    console.log('='.repeat(80));
    console.log(`Found: ${usersByMarkazId.length}`);
    
    if (usersByMarkazId.length > 0) {
      const groupedByRole = usersByMarkazId.reduce((acc: any, user: any) => {
        if (!acc[user.role]) acc[user.role] = [];
        acc[user.role].push(user);
        return acc;
      }, {});
      
      Object.keys(groupedByRole).forEach((role: string) => {
        console.log(`\n${role}: ${groupedByRole[role].length}`);
        groupedByRole[role].forEach((user: any, idx: number) => {
          console.log(`   ${idx + 1}. ${user.name} (Phone: ${user.phone_number})`);
          console.log(`      School ID: ${user.school_id || 'NOT SET'}`);
          console.log(`      Markaz Name: ${user.markaz_name || 'NOT SET'}`);
        });
      });
    }
    
    // 6. Final Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('FINAL SUMMARY:');
    console.log('='.repeat(80));
    console.log(`Markaz exists: YES (ID: ${markazId})`);
    console.log(`Schools with markaz_id: ${schoolsByMarkazId[0].count}`);
    console.log(`Schools with "RAIKA" in name/address: ${schoolsLikeRaika.length}`);
    console.log(`Users with markaz_name "RAIKA MAIRA": ${usersByMarkazName.length}`);
    console.log(`Users with markaz_id: ${usersByMarkazId.length}`);
    
    if (schoolsByMarkazId[0].count === '0' && usersByMarkazName.length > 0) {
      console.log('\n⚠️  ISSUE IDENTIFIED:');
      console.log('   The markaz exists and has users assigned to it,');
      console.log('   but no schools are linked to this markaz.');
      console.log('   This could mean:');
      console.log('   - Schools need to be assigned to this markaz');
      console.log('   - The markaz was created but schools are in a different markaz');
      console.log('   - There is a data inconsistency that needs to be resolved');
    }
    
  } catch (error: any) {
    console.error('\nERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fullInvestigation();
