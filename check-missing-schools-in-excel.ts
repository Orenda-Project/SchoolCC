import XLSX from 'xlsx';
import * as path from 'path';

const missingSchools = [
  'GGES DHOK KALA KHAN',
  'GBES kuri khuda baksh Rawalpindi',
  'GMPS Waryam',
  'GMES gulshanabad',
  'GGES Dhoke kala khan rwp',
  'GPS Adhwal'
];

interface SchoolData {
  schoolName: string;
  emisCode: string;
  markaz: string;
  file: string;
}

function normalizeSchoolName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readExcelFile(filePath: string, fileName: string): SchoolData[] {
  const workbook = XLSX.readFile(filePath);
  const schools: SchoolData[] = [];

  // Try different possible sheet names
  const sheetNames = workbook.SheetNames;
  console.log(`\n📄 Reading ${fileName}...`);
  console.log(`   Sheets found: ${sheetNames.join(', ')}`);

  for (const sheetName of sheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    // Find header row
    let headerRowIndex = -1;
    let schoolNameCol = -1;
    let emisCol = -1;
    let markazCol = -1;

    for (let i = 0; i < Math.min(10, data.length); i++) {
      const row = data[i];
      if (!row) continue;

      for (let j = 0; j < row.length; j++) {
        const cell = String(row[j] || '').toLowerCase();
        if (cell.includes('school') && cell.includes('name')) {
          schoolNameCol = j;
        }
        if (cell.includes('emis')) {
          emisCol = j;
        }
        if (cell.includes('markaz') || cell.includes('cluster')) {
          markazCol = j;
        }
      }

      if (schoolNameCol >= 0 && emisCol >= 0 && markazCol >= 0) {
        headerRowIndex = i;
        break;
      }
    }

    if (headerRowIndex === -1) {
      console.log(`   ⚠️  Sheet "${sheetName}": Could not find headers`);
      continue;
    }

    console.log(`   ✓ Sheet "${sheetName}": Found headers at row ${headerRowIndex + 1}`);
    console.log(`     School Name: Column ${schoolNameCol + 1}`);
    console.log(`     EMIS: Column ${emisCol + 1}`);
    console.log(`     Markaz: Column ${markazCol + 1}`);

    // Process data rows
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!row) continue;

      const schoolName = row[schoolNameCol];
      const emisCode = row[emisCol];
      const markaz = row[markazCol];

      if (schoolName && emisCode) {
        schools.push({
          schoolName: String(schoolName).trim(),
          emisCode: String(emisCode).trim(),
          markaz: String(markaz || '').trim(),
          file: fileName
        });
      }
    }
  }

  console.log(`   Total schools found: ${schools.length}\n`);
  return schools;
}

async function checkMissingSchools() {
  console.log('🔍 Checking if missing schools exist in Excel files...\n');
  console.log('='.repeat(100));

  const maleFile = path.join(process.cwd(), 'List of Schools Tehsil RWP MALE.xlsx');
  const femaleFile = path.join(process.cwd(), 'List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx');

  // Read both files
  const maleSchools = readExcelFile(maleFile, 'MALE Schools');
  const femaleSchools = readExcelFile(femaleFile, 'FEMALE Schools');

  const allSchools = [...maleSchools, ...femaleSchools];

  console.log('='.repeat(100));
  console.log('\n📊 SEARCH RESULTS:\n');
  console.log('='.repeat(100));

  let foundCount = 0;
  let notFoundCount = 0;

  for (const missingSchool of missingSchools) {
    console.log(`\n🔎 Searching for: "${missingSchool}"`);

    const normalized = normalizeSchoolName(missingSchool);

    // Try exact match first
    let matches = allSchools.filter(s =>
      normalizeSchoolName(s.schoolName) === normalized
    );

    // If no exact match, try partial match
    if (matches.length === 0) {
      matches = allSchools.filter(s => {
        const norm = normalizeSchoolName(s.schoolName);
        return norm.includes(normalized) || normalized.includes(norm);
      });
    }

    if (matches.length > 0) {
      console.log(`   ✅ FOUND! (${matches.length} match${matches.length > 1 ? 'es' : ''})`);
      foundCount++;

      matches.forEach((match, idx) => {
        console.log(`\n   Match ${idx + 1}:`);
        console.log(`      Excel Name: ${match.schoolName}`);
        console.log(`      EMIS Code: ${match.emisCode}`);
        console.log(`      Markaz: ${match.markaz || 'N/A'}`);
        console.log(`      File: ${match.file}`);
      });
    } else {
      console.log(`   ❌ NOT FOUND in Excel files`);
      notFoundCount++;

      // Try to find similar names
      const similar = allSchools.filter(s => {
        const norm = normalizeSchoolName(s.schoolName);
        const words = normalized.split(' ');
        return words.some(word => word.length > 3 && norm.includes(word));
      }).slice(0, 3);

      if (similar.length > 0) {
        console.log(`   \n   Similar schools found:`);
        similar.forEach((s, idx) => {
          console.log(`      ${idx + 1}. ${s.schoolName} (EMIS: ${s.emisCode}, Markaz: ${s.markaz})`);
        });
      }
    }
  }

  console.log('\n' + '='.repeat(100));
  console.log('SUMMARY:');
  console.log('='.repeat(100));
  console.log(`   Schools searched: ${missingSchools.length}`);
  console.log(`   Found in Excel: ${foundCount}`);
  console.log(`   Not found in Excel: ${notFoundCount}`);
  console.log('='.repeat(100));

  console.log('\n💡 NEXT STEPS:');
  console.log('   • For schools FOUND in Excel: Add them to database with correct EMIS and markaz');
  console.log('   • For schools NOT FOUND: These may be typos or renamed schools - check with teachers');
  console.log('='.repeat(100));
}

checkMissingSchools().catch(console.error);
