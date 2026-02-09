import { db } from './server/db';
import { sql } from 'drizzle-orm';
import XLSX from 'xlsx';

interface SchoolRow {
  markaz: string;
}

function extractMarkazes(filePath: string): Set<string> {
  console.log(`Reading: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames.find(name =>
    name.toLowerCase().includes('list') || name.toLowerCase().includes('school')
  ) || workbook.SheetNames[1] || workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find header row
  let headerRowIdx = 0;
  let headers: string[] = [];

  for (let i = 0; i < Math.min(10, data.length); i++) {
    const row = data[i] as any[];
    if (!row) continue;

    const rowText = row.map(c => (c?.toString() || '').toLowerCase());
    const hasMarkaz = rowText.some(t => t.includes('markaz'));

    if (hasMarkaz && row.length > 3) {
      headers = row.map(c => c?.toString() || '');
      headerRowIdx = i;
      break;
    }
  }

  const markazIdx = headers.findIndex(h => h && h.toLowerCase().includes('markaz'));

  const markazes = new Set<string>();

  for (let i = headerRowIdx + 1; i < data.length; i++) {
    const row = data[i] as any[];
    if (!row || row.length === 0) continue;

    const markaz = row[markazIdx]?.toString().trim();
    if (markaz) {
      // Clean the markaz name
      const cleanMarkaz = markaz
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\.$/, '');  // Remove trailing period

      markazes.add(cleanMarkaz);
    }
  }

  return markazes;
}

async function createMissingMarkazes() {
  try {
    console.log('📊 Finding and creating missing markazes...\n');

    // Extract markazes from both Excel files
    const maleMarkazes = extractMarkazes('List of Schools Tehsil RWP MALE.xlsx');
    const femaleMarkazes = extractMarkazes('List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx');

    const allMarkazes = new Set([...maleMarkazes, ...femaleMarkazes]);

    console.log(`\nTotal unique markazes in Excel files: ${allMarkazes.size}`);
    console.log('Markazes from Excel:');
    Array.from(allMarkazes).sort().forEach(m => console.log(`  - ${m}`));

    // Get existing markazes from database
    const existing = await db.execute(sql`SELECT name FROM markazes`);
    const existingNames = new Set(existing.map((m: any) => m.name));

    console.log(`\nExisting markazes in database: ${existingNames.size}`);

    // Find missing markazes (case-insensitive comparison)
    const missing: string[] = [];
    allMarkazes.forEach(markaz => {
      const exists = Array.from(existingNames).some(existing =>
        existing.toUpperCase() === markaz.toUpperCase()
      );
      if (!exists) {
        missing.push(markaz);
      }
    });

    console.log(`\n${'='.repeat(80)}`);
    console.log(`Missing markazes that need to be created: ${missing.length}`);
    console.log('='.repeat(80));

    if (missing.length === 0) {
      console.log('✅ All markazes already exist!');
      process.exit(0);
    }

    missing.sort().forEach(m => console.log(`  - ${m}`));

    // Get Rawalpindi tehsil and district IDs from an existing markaz
    const existingMarkaz = await db.execute(sql`
      SELECT tehsil_id, district_id
      FROM markazes
      WHERE tehsil_id IS NOT NULL AND district_id IS NOT NULL
      LIMIT 1
    `);

    if (existingMarkaz.length === 0) {
      console.log('❌ Error: Could not find existing markaz with tehsil_id and district_id');
      process.exit(1);
    }

    const tehsilId = existingMarkaz[0].tehsil_id;
    const districtId = existingMarkaz[0].district_id;
    console.log(`Using tehsil ID: ${tehsilId}`);
    console.log(`Using district ID: ${districtId}`);

    console.log(`\n🔄 Creating ${missing.length} missing markazes...`);

    // Create missing markazes
    for (const markaz of missing) {
      await db.execute(sql`
        INSERT INTO markazes (id, name, tehsil_id, district_id)
        VALUES (gen_random_uuid(), ${markaz}, ${tehsilId}, ${districtId})
      `);
      console.log(`  ✓ Created: ${markaz}`);
    }

    console.log(`\n✅ Successfully created ${missing.length} new markazes!`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

createMissingMarkazes();
