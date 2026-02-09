import XLSX from 'xlsx';
import * as fs from 'fs';

interface SchoolRow {
  'School Name'?: string;
  'EMIS Code'?: string;
  'Markaz'?: string;
  'Gender'?: string;
  'Name of AEO'?: string;
  [key: string]: any;
}

async function searchExcelFiles() {
  try {
    console.log('='.repeat(100));
    console.log('SEARCHING EXCEL FILES FOR MISSING SCHOOLS');
    console.log('='.repeat(100));

    const maleFile = 'List of Schools Tehsil RWP MALE.xlsx';
    const femaleFile = 'List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx';

    // Read male schools
    const maleWorkbook = XLSX.readFile(maleFile);
    const maleSheetName = maleWorkbook.SheetNames[0];
    const maleData: SchoolRow[] = XLSX.utils.sheet_to_json(maleWorkbook.Sheets[maleSheetName]);

    // Read female schools
    const femaleWorkbook = XLSX.readFile(femaleFile);
    const femaleSheetName = femaleWorkbook.SheetNames[0];
    const femaleData: SchoolRow[] = XLSX.utils.sheet_to_json(femaleWorkbook.Sheets[femaleSheetName]);

    const allSchools = [...maleData, ...femaleData];

    console.log(`\nMale schools file: ${maleData.length} rows`);
    console.log(`Female schools file: ${femaleData.length} rows`);
    console.log(`Total combined: ${allSchools.length} schools\n`);

    // Display column names
    if (allSchools.length > 0) {
      console.log('Available columns:');
      Object.keys(allSchools[0]).forEach((col, i) => {
        console.log(`  ${i + 1}. ${col}`);
      });
    }

    // SEARCH 1: GPS HAYAL
    console.log('\n' + '='.repeat(100));
    console.log('SEARCH 1: GPS HAYAL (EMIS: 37330250)');
    console.log('='.repeat(100));

    const hayalResults = allSchools.filter(school =>
      school['EMIS Code']?.toString().includes('37330250')
    );

    if (hayalResults.length > 0) {
      console.log(`\n✅ FOUND ${hayalResults.length} match(es):\n`);
      hayalResults.forEach(school => {
        console.log(`School Name: ${school['School Name'] || 'N/A'}`);
        console.log(`EMIS Code: ${school['EMIS Code'] || 'N/A'}`);
        console.log(`Markaz: ${school['Markaz'] || 'N/A'}`);
        console.log(`Gender: ${school['Gender'] || 'N/A'}`);
        console.log(`AEO: ${school['Name of AEO'] || 'N/A'}`);
        console.log();
      });
    } else {
      console.log('❌ Not found by EMIS');
      // Try by name
      const hayalByName = allSchools.filter(school =>
        school['School Name']?.toString().toLowerCase().includes('hayal')
      );
      if (hayalByName.length > 0) {
        console.log(`\n🔍 Found ${hayalByName.length} similar by name:`);
        hayalByName.forEach(school => {
          console.log(`  - ${school['School Name']} (EMIS: ${school['EMIS Code']}, Markaz: ${school['Markaz'] || 'N/A'})`);
        });
      }
    }

    // SEARCH 2: GBES kuri khuda baksh
    console.log('\n' + '='.repeat(100));
    console.log('SEARCH 2: GBES kuri khuda baksh Rawalpindi');
    console.log('='.repeat(100));

    const kuriResults = allSchools.filter(school => {
      const name = school['School Name']?.toString().toLowerCase() || '';
      return name.includes('kuri') || name.includes('khuda') || name.includes('baksh');
    });

    if (kuriResults.length > 0) {
      console.log(`\n✅ FOUND ${kuriResults.length} potential match(es):\n`);
      kuriResults.forEach(school => {
        console.log(`School Name: ${school['School Name'] || 'N/A'}`);
        console.log(`EMIS Code: ${school['EMIS Code'] || 'N/A'}`);
        console.log(`Markaz: ${school['Markaz'] || 'N/A'}`);
        console.log(`Gender: ${school['Gender'] || 'N/A'}`);
        console.log(`AEO: ${school['Name of AEO'] || 'N/A'}`);
        console.log();
      });
    } else {
      console.log('❌ Not found');
    }

    // SEARCH 3: GMES gulshanabad
    console.log('\n' + '='.repeat(100));
    console.log('SEARCH 3: GMES gulshanabad');
    console.log('='.repeat(100));

    const gulshanResults = allSchools.filter(school => {
      const name = school['School Name']?.toString().toLowerCase() || '';
      return name.includes('gulshan');
    });

    if (gulshanResults.length > 0) {
      console.log(`\n✅ FOUND ${gulshanResults.length} potential match(es):\n`);
      gulshanResults.forEach(school => {
        console.log(`School Name: ${school['School Name'] || 'N/A'}`);
        console.log(`EMIS Code: ${school['EMIS Code'] || 'N/A'}`);
        console.log(`Markaz: ${school['Markaz'] || 'N/A'}`);
        console.log(`Gender: ${school['Gender'] || 'N/A'}`);
        console.log(`AEO: ${school['Name of AEO'] || 'N/A'}`);
        console.log();
      });
    } else {
      console.log('❌ Not found');
    }

    // SEARCH 4: GPS Adhwal
    console.log('\n' + '='.repeat(100));
    console.log('SEARCH 4: GPS Adhwal');
    console.log('='.repeat(100));

    const adhwalResults = allSchools.filter(school => {
      const name = school['School Name']?.toString().toLowerCase() || '';
      return name.includes('adhwal') || name.includes('adwal');
    });

    if (adhwalResults.length > 0) {
      console.log(`\n✅ FOUND ${adhwalResults.length} potential match(es):\n`);
      adhwalResults.forEach(school => {
        console.log(`School Name: ${school['School Name'] || 'N/A'}`);
        console.log(`EMIS Code: ${school['EMIS Code'] || 'N/A'}`);
        console.log(`Markaz: ${school['Markaz'] || 'N/A'}`);
        console.log(`Gender: ${school['Gender'] || 'N/A'}`);
        console.log(`AEO: ${school['Name of AEO'] || 'N/A'}`);
        console.log();
      });
    } else {
      console.log('❌ Not found');
    }

    // Summary
    console.log('\n' + '='.repeat(100));
    console.log('📊 SUMMARY');
    console.log('='.repeat(100));
    console.log('\nSearch completed for 4 schools.');
    console.log('Review results above to find markaz assignments.');
    console.log('='.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

searchExcelFiles();
