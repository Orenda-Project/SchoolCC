import XLSX from 'xlsx';
import * as fs from 'fs';

interface SchoolRow {
  schoolName: string;
  emisNumber: string;
  markaz: string;
  aeo?: string;
}

function readExcelFile(filePath: string): SchoolRow[] {
  console.log(`Reading: ${filePath}`);

  const workbook = XLSX.readFile(filePath);

  // Find the sheet with school data (skip SUMMARY sheet)
  const sheetName = workbook.SheetNames.find(name =>
    name.toLowerCase().includes('list') || name.toLowerCase().includes('school')
  ) || workbook.SheetNames[1] || workbook.SheetNames[0];

  console.log(`Using sheet: ${sheetName}`);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find the header row (look for row with multiple columns including EMIS CODE or MARKAZ NAME)
  let headerRowIdx = 0;
  let headers: string[] = [];

  for (let i = 0; i < Math.min(10, data.length); i++) {
    const row = data[i] as any[];
    if (!row) continue;

    const rowText = row.map(c => (c?.toString() || '').toLowerCase());
    const hasEMIS = rowText.some(t => t.includes('emis'));
    const hasMarkaz = rowText.some(t => t.includes('markaz'));
    const hasSchool = rowText.some(t => t.includes('school') && t.includes('name'));

    // Must have at least EMIS and (Markaz or School name)
    if (hasEMIS && (hasMarkaz || hasSchool) && row.length > 3) {
      headers = row.map(c => c?.toString() || '');
      headerRowIdx = i;
      break;
    }
  }

  console.log(`Found headers at row ${headerRowIdx + 1}:`, headers);

  // Find column indices
  const schoolNameIdx = headers.findIndex(h =>
    h && h.toLowerCase().includes('school')
  );
  const emisIdx = headers.findIndex(h =>
    h && (h.toLowerCase().includes('emis') || h.toLowerCase().includes('code'))
  );
  const markazIdx = headers.findIndex(h =>
    h && h.toLowerCase().includes('markaz')
  );
  const aeoIdx = headers.findIndex(h =>
    h && h.toLowerCase().includes('aeo')
  );

  console.log(`Column indices - School: ${schoolNameIdx}, EMIS: ${emisIdx}, Markaz: ${markazIdx}, AEO: ${aeoIdx}`);

  const schools: SchoolRow[] = [];

  // Process data rows (start after header row)
  for (let i = headerRowIdx + 1; i < data.length; i++) {
    const row = data[i] as any[];
    if (!row || row.length === 0) continue;

    const schoolName = row[schoolNameIdx]?.toString().trim();
    const emisNumber = row[emisIdx]?.toString().trim();
    const markaz = row[markazIdx]?.toString().trim();
    const aeo = aeoIdx >= 0 ? row[aeoIdx]?.toString().trim() : undefined;

    if (schoolName && emisNumber && markaz) {
      schools.push({
        schoolName,
        emisNumber,
        markaz,
        aeo
      });
    }
  }

  console.log(`Found ${schools.length} schools in ${filePath}\n`);
  return schools;
}

function generateSQL(schools: SchoolRow[], fileLabel: string): string {
  let sql = `-- ============================================\n`;
  sql += `-- ${fileLabel}\n`;
  sql += `-- Total schools: ${schools.length}\n`;
  sql += `-- ============================================\n\n`;

  schools.forEach(school => {
    // Clean school name: remove newlines, tabs, and extra spaces
    const cleanSchoolName = school.schoolName
      .replace(/[\r\n\t]+/g, ' ')  // Replace newlines and tabs with space
      .replace(/\s+/g, ' ')          // Replace multiple spaces with single space
      .trim()
      .replace(/'/g, "''");          // Escape single quotes for SQL

    // Clean markaz name similarly
    const cleanMarkazName = school.markaz
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()
      .replace(/'/g, "''");

    sql += `-- Update: ${cleanSchoolName} (EMIS: ${school.emisNumber})\n`;
    sql += `UPDATE schools\n`;
    sql += `SET name = '${cleanSchoolName}',\n`;
    sql += `    markaz_id = (\n`;
    sql += `      SELECT id FROM markazes\n`;
    sql += `      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\\.+$', ''))) = '${cleanMarkazName}'\n`;
    sql += `      LIMIT 1\n`;
    sql += `    )\n`;
    sql += `WHERE emis_number = '${school.emisNumber}';\n\n`;
  });

  return sql;
}

async function main() {
  try {
    console.log('📊 Generating complete school sync SQL from both Excel files...\n');

    // Read both Excel files
    const maleSchools = readExcelFile('List of Schools Tehsil RWP MALE.xlsx');
    const femaleSchools = readExcelFile('List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx');

    const allSchools = [...maleSchools, ...femaleSchools];

    console.log('='.repeat(100));
    console.log(`Total schools from both files: ${allSchools.length}`);
    console.log(`  Male schools: ${maleSchools.length}`);
    console.log(`  Female schools: ${femaleSchools.length}`);
    console.log('='.repeat(100) + '\n');

    // Group by markaz
    const byMarkaz: Record<string, number> = {};
    allSchools.forEach(s => {
      byMarkaz[s.markaz] = (byMarkaz[s.markaz] || 0) + 1;
    });

    console.log('Schools by Markaz:');
    Object.entries(byMarkaz).sort((a, b) => b[1] - a[1]).forEach(([markaz, count]) => {
      console.log(`  ${markaz}: ${count} schools`);
    });
    console.log('');

    // Generate SQL
    let fullSQL = `-- ============================================\n`;
    fullSQL += `-- Complete School Data Sync from Excel Files\n`;
    fullSQL += `-- ============================================\n`;
    fullSQL += `-- Generated: ${new Date().toISOString().split('T')[0]}\n`;
    fullSQL += `-- Total schools: ${allSchools.length}\n`;
    fullSQL += `-- Source: Male (${maleSchools.length}) and Female (${femaleSchools.length}) school lists\n`;
    fullSQL += `--\n`;
    fullSQL += `-- This will update school names and markaz assignments\n`;
    fullSQL += `-- ============================================\n\n`;

    fullSQL += generateSQL(maleSchools, 'Male Schools');
    fullSQL += generateSQL(femaleSchools, 'Female Schools');

    // Write to file
    fs.writeFileSync('sync_schools_complete.sql', fullSQL);

    console.log('✅ Generated: sync_schools_complete.sql');
    console.log(`   Contains ${allSchools.length} school updates\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
