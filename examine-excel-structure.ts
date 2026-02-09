import XLSX from 'xlsx';

async function examineExcel() {
  try {
    console.log('🔍 Examining Excel file structure\n');
    console.log('='.repeat(100));

    const maleFile = 'List of Schools Tehsil RWP MALE.xlsx';
    const femaleFile = 'List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx';

    // Male file
    console.log('\n📄 MALE FILE:');
    console.log('-'.repeat(100));
    const maleWorkbook = XLSX.readFile(maleFile);
    console.log(`Sheets: ${maleWorkbook.SheetNames.join(', ')}`);

    maleWorkbook.SheetNames.forEach((sheetName) => {
      console.log(`\nSheet: "${sheetName}"`);
      const worksheet = maleWorkbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(`  Total rows: ${data.length}`);
      console.log(`\n  First 10 rows:`);
      data.slice(0, 10).forEach((row: any, idx: number) => {
        console.log(`    Row ${idx}: ${JSON.stringify(row)}`);
      });
    });

    // Female file
    console.log('\n\n📄 FEMALE FILE:');
    console.log('-'.repeat(100));
    const femaleWorkbook = XLSX.readFile(femaleFile);
    console.log(`Sheets: ${femaleWorkbook.SheetNames.join(', ')}`);

    femaleWorkbook.SheetNames.forEach((sheetName) => {
      console.log(`\nSheet: "${sheetName}"`);
      const worksheet = femaleWorkbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(`  Total rows: ${data.length}`);
      console.log(`\n  First 10 rows:`);
      data.slice(0, 10).forEach((row: any, idx: number) => {
        console.log(`    Row ${idx}: ${JSON.stringify(row)}`);
      });
    });

    console.log('\n' + '='.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

examineExcel();
