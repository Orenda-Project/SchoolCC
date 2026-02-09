import { db } from './server/db';
import { schools } from './shared/schema';
import { sql } from 'drizzle-orm';

const emisNumbersFromFile = [
  '37330118', '37330121', '37330125', '37330128', '37330130', '37330131', '37330132', '37330138',
  '37330140', '37330142', '37330145', '37330199', '37330200', '37330201', '37330203', '37330204',
  '37330205', '37330206', '37330207', '37330208', '37330209', '37330216', '37330218', '37330219',
  '37330221', '37330222', '37330223', '37330225', '37330226', '37330227', '37330228', '37330229',
  '37330230', '37330231', '37330233', '37330234', '37330235', '37330236', '37330237', '37330238',
  '37330240', '37330241', '37330242', '37330244', '37330245', '37330249', '37330250', '37330251',
  '37330253', '37330254', '37330257', '37330258', '37330259', '37330266', '37330267', '37330271',
  '37330273', '37330275', '37330280', '37330283', '37330284', '37330285', '37330288', '37330289',
  '37330292', '37330293', '37330294', '37330295', '37330298', '37330302', '37330303', '37330305',
  '37330307', '37330309', '37330312', '37330315', '37330317', '37330318', '37330321', '37330322',
  '37330332', '37330333', '37330334', '37330335', '37330336', '37330339', '37330349', '37330350',
  '37330352', '37330359', '37330361', '37330371', '37330377', '37330383', '37330385', '37330392',
  '37330393', '37330396', '37330401', '37330687', '37330688', '37330715', '37330716'
];

async function checkSchools() {
  try {
    console.log('📊 Checking schools in production database...\n');

    // Get total schools in database
    const totalResult = await db.execute(sql`SELECT COUNT(*) as count FROM schools`);
    const totalSchools = totalResult[0].count;
    console.log(`Total schools in database: ${totalSchools}`);
    console.log(`Schools in your SQL file: ${emisNumbersFromFile.length}\n`);

    // Check which schools from the list exist
    const existingSchools = await db.execute(sql`
      SELECT emis_number, name, markaz_id
      FROM schools
      WHERE emis_number IN (${sql.join(emisNumbersFromFile.map(e => sql`${e}`), sql`, `)})
      ORDER BY emis_number
    `);

    const existingEmis = new Set(existingSchools.map((s: any) => s.emis_number));
    const missingEmis = emisNumbersFromFile.filter(emis => !existingEmis.has(emis));

    console.log(`✅ Schools found in database: ${existingSchools.length}`);
    console.log(`❌ Schools NOT in database: ${missingEmis.length}\n`);

    if (missingEmis.length > 0) {
      console.log('Missing EMIS numbers:');
      missingEmis.forEach(emis => console.log(`  - ${emis}`));
    }

    // Get all schools to find if there are any not in your list
    const allSchools = await db.execute(sql`
      SELECT emis_number
      FROM schools
      WHERE emis_number IS NOT NULL
      ORDER BY emis_number
    `);

    const allEmisInDb = new Set(allSchools.map((s: any) => s.emis_number));
    const inDbButNotInFile = Array.from(allEmisInDb).filter(emis => !emisNumbersFromFile.includes(emis));

    if (inDbButNotInFile.length > 0) {
      console.log(`\n📝 Schools in database but NOT in your SQL file: ${inDbButNotInFile.length}`);
      console.log('First 20 examples:');
      inDbButNotInFile.slice(0, 20).forEach(emis => console.log(`  - ${emis}`));
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

checkSchools();
