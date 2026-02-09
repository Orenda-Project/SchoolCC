import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function matchTeachersSchools() {
  try {
    console.log('🔍 DETAILED ANALYSIS: Teachers Without Markaz\n');
    console.log('='.repeat(100));

    // 1. Check the specific school with EMIS number
    console.log('\n1️⃣ GPS HAYAL (HAS EMIS: 37330250)');
    console.log('-'.repeat(100));

    const hayalSchool = await db.execute(sql`
      SELECT
        s.id,
        s.name,
        s.emis_number,
        s.markaz_id,
        s.markaz_name,
        m.name as markaz_from_relation,
        t.name as tehsil_name,
        d.name as district_name
      FROM schools s
      LEFT JOIN markazes m ON s.markaz_id = m.id
      LEFT JOIN tehsils t ON s.tehsil_id = t.id
      LEFT JOIN districts d ON s.district_id = d.id
      WHERE s.emis_number = '37330250'
    `);

    if (hayalSchool.length > 0) {
      const school = hayalSchool[0];
      console.log(`Found school in database:`);
      console.log(`  Name: ${school.name}`);
      console.log(`  EMIS: ${school.emis_number}`);
      console.log(`  Markaz ID: ${school.markaz_id || 'NULL'}`);
      console.log(`  Markaz Name: ${school.markaz_name || 'NULL'}`);
      console.log(`  Markaz from Relation: ${school.markaz_from_relation || 'NULL'}`);
      console.log(`  Tehsil: ${school.tehsil_name || 'NULL'}`);
      console.log(`  District: ${school.district_name || 'NULL'}`);

      // Get teachers for this school
      const teachers = await db.execute(sql`
        SELECT name, role, phone_number, markaz_id, school_id
        FROM users
        WHERE school_id = 'a07c55c9-25ed-4caf-89da-8159112e8c14'
        ORDER BY role DESC, name
      `);

      console.log(`\n  Teachers (${teachers.length}):`);
      teachers.forEach((t: any) => {
        console.log(`    - ${t.name} (${t.role}) - Markaz: ${t.markaz_id || 'NULL'}`);
      });
    } else {
      console.log('❌ School not found in database! Need to add it.');
    }

    // 2. Check for the problematic schools
    console.log('\n\n2️⃣ GBES kuri khuda baksh Rawalpindi (8 teachers, NO EMIS)');
    console.log('-'.repeat(100));

    const kuriSchool = await db.execute(sql`
      SELECT
        s.id,
        s.name,
        s.emis_number,
        s.markaz_id,
        s.markaz_name
      FROM schools s
      WHERE s.id = '01cc0cd7-974b-4402-9dee-974b0739cacb'
    `);

    if (kuriSchool.length > 0) {
      const school = kuriSchool[0];
      console.log(`School exists in database:`);
      console.log(`  ID: ${school.id}`);
      console.log(`  Name: ${school.name}`);
      console.log(`  EMIS: ${school.emis_number || 'NULL - MISSING!'}`);
      console.log(`  Markaz ID: ${school.markaz_id || 'NULL'}`);
      console.log(`  Markaz Name: ${school.markaz_name || 'NULL'}`);

      // Search for similar school names in the Excel data markazes
      console.log(`\n  Searching for possible matches in markaz names...`);
      const possibleMatches = await db.execute(sql`
        SELECT DISTINCT markaz_name, COUNT(*) as school_count
        FROM schools
        WHERE markaz_name IS NOT NULL
        AND (
          markaz_name ILIKE '%kuri%'
          OR markaz_name ILIKE '%khuda%'
          OR markaz_name ILIKE '%baksh%'
        )
        GROUP BY markaz_name
      `);

      if (possibleMatches.length > 0) {
        console.log(`  Found possible markaz matches:`);
        possibleMatches.forEach((m: any) => {
          console.log(`    - ${m.markaz_name} (${m.school_count} schools)`);
        });
      } else {
        console.log(`  ❌ No obvious markaz matches found`);
      }
    } else {
      console.log('❌ School not found in database!');
    }

    // 3. GMES gulshanabad
    console.log('\n\n3️⃣ GMES gulshanabad (2 teachers, NO EMIS)');
    console.log('-'.repeat(100));

    const gulshanSchool = await db.execute(sql`
      SELECT
        s.id,
        s.name,
        s.emis_number,
        s.markaz_id,
        s.markaz_name
      FROM schools s
      WHERE s.id = 'a927c0bd-c3c8-483d-aa35-0c174d85563f'
    `);

    if (gulshanSchool.length > 0) {
      const school = gulshanSchool[0];
      console.log(`School exists in database:`);
      console.log(`  ID: ${school.id}`);
      console.log(`  Name: ${school.name}`);
      console.log(`  EMIS: ${school.emis_number || 'NULL - MISSING!'}`);
      console.log(`  Markaz ID: ${school.markaz_id || 'NULL'}`);
      console.log(`  Markaz Name: ${school.markaz_name || 'NULL'}`);

      // Search for similar
      console.log(`\n  Searching for 'gulshan' in schools table...`);
      const similarSchools = await db.execute(sql`
        SELECT name, emis_number, markaz_name
        FROM schools
        WHERE name ILIKE '%gulshan%'
        LIMIT 5
      `);

      if (similarSchools.length > 0) {
        console.log(`  Similar schools:`);
        similarSchools.forEach((s: any) => {
          console.log(`    - ${s.name} (EMIS: ${s.emis_number}, Markaz: ${s.markaz_name || 'N/A'})`);
        });
      }
    } else {
      console.log('❌ School not found in database!');
    }

    // 4. GPS Adhwal
    console.log('\n\n4️⃣ GPS Adhwal (1 teacher, NO EMIS)');
    console.log('-'.repeat(100));

    const adhwalSchool = await db.execute(sql`
      SELECT
        s.id,
        s.name,
        s.emis_number,
        s.markaz_id,
        s.markaz_name
      FROM schools s
      WHERE s.id = 'bc17707c-3beb-4663-b6d4-8895fd9d89f7'
    `);

    if (adhwalSchool.length > 0) {
      const school = adhwalSchool[0];
      console.log(`School exists in database:`);
      console.log(`  ID: ${school.id}`);
      console.log(`  Name: ${school.name}`);
      console.log(`  EMIS: ${school.emis_number || 'NULL - MISSING!'}`);
      console.log(`  Markaz ID: ${school.markaz_id || 'NULL'}`);
      console.log(`  Markaz Name: ${school.markaz_name || 'NULL'}`);

      // Search for similar
      console.log(`\n  Searching for 'adhwal' in schools table...`);
      const similarSchools = await db.execute(sql`
        SELECT name, emis_number, markaz_name
        FROM schools
        WHERE name ILIKE '%adhwal%'
        OR name ILIKE '%adwal%'
        LIMIT 5
      `);

      if (similarSchools.length > 0) {
        console.log(`  Similar schools:`);
        similarSchools.forEach((s: any) => {
          console.log(`    - ${s.name} (EMIS: ${s.emis_number}, Markaz: ${s.markaz_name || 'N/A'})`);
        });
      }
    } else {
      console.log('❌ School not found in database!');
    }

    // 5. Summary and recommendations
    console.log('\n\n' + '='.repeat(100));
    console.log('📊 SUMMARY & RECOMMENDATIONS');
    console.log('='.repeat(100));

    // Check if these schools exist in the Excel files we have
    console.log('\n💡 Next Steps:');
    console.log('1. GPS HAYAL - Has EMIS 37330250, should be in Excel data');
    console.log('2. GBES kuri khuda baksh - Need to find EMIS from Excel or contact teachers');
    console.log('3. GMES gulshanabad - Need to find EMIS from Excel or contact teachers');
    console.log('4. GPS Adhwal - Need to find EMIS from Excel or contact teachers');
    console.log('\n💡 We should check the Excel files for these schools by searching for:');
    console.log('   - "hayal" (EMIS: 37330250)');
    console.log('   - "kuri" or "khuda baksh"');
    console.log('   - "gulshan" or "gulshanabad"');
    console.log('   - "adhwal"');
    console.log('='.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

matchTeachersSchools();
