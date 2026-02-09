import XLSX from 'xlsx';

interface SchoolData {
  emisCode: string;
  schoolName: string;
  markazName: string;
  aeoName: string;
  aeoContact: string;
  gender: string;
}

async function findSchools() {
  try {
    console.log('🔍 SEARCHING FOR MISSING SCHOOLS IN EXCEL FILES\n');
    console.log('='.repeat(100));

    const schools: SchoolData[] = [];

    // Read Male file
    const maleWorkbook = XLSX.readFile('List of Schools Tehsil RWP MALE.xlsx');
    const maleSheet = maleWorkbook.Sheets['LIST OF SCHOOLS MALE'];
    const maleData: any[][] = XLSX.utils.sheet_to_json(maleSheet, { header: 1 });

    // Process male schools (skip first 2 header rows)
    for (let i = 2; i < maleData.length; i++) {
      const row = maleData[i];
      if (row && row.length > 5 && row[4]) {
        schools.push({
          emisCode: String(row[4] || '').trim(),
          schoolName: String(row[5] || '').trim(),
          markazName: String(row[1] || '').trim(),
          aeoName: String(row[2] || '').trim(),
          aeoContact: String(row[3] || '').trim(),
          gender: 'MALE'
        });
      }
    }

    // Read Female file
    const femaleWorkbook = XLSX.readFile('List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx');
    const femaleSheet = femaleWorkbook.Sheets['LIST OF FEMALE SCHOOLS'];
    const femaleData: any[][] = XLSX.utils.sheet_to_json(femaleSheet, { header: 1 });

    // Process female schools (skip first 1 header row)
    for (let i = 1; i < femaleData.length; i++) {
      const row = femaleData[i];
      if (row && row.length > 5 && row[4]) {
        schools.push({
          emisCode: String(row[4] || '').trim(),
          schoolName: String(row[5] || '').trim(),
          markazName: String(row[1] || '').trim(),
          aeoName: String(row[2] || '').trim(),
          aeoContact: String(row[3] || '').trim(),
          gender: 'FEMALE'
        });
      }
    }

    console.log(`\nLoaded ${schools.length} schools from Excel files\n`);

    // Search for our 4 schools
    const searchTerms = [
      { emis: '37330250', name: 'GPS HAYAL', userSchoolName: 'GPS HAYAL.' },
      { emis: null, name: 'GBES kuri khuda baksh', userSchoolName: 'GBES kuri khuda baksh Rawalpindi' },
      { emis: null, name: 'GMES gulshanabad', userSchoolName: 'GMES gulshanabad' },
      { emis: null, name: 'GPS Adhwal', userSchoolName: 'GPS Adhwal' }
    ];

    searchTerms.forEach((term, idx) => {
      console.log('\n' + '='.repeat(100));
      console.log(`SEARCH ${idx + 1}: ${term.name}`);
      if (term.emis) {
        console.log(`EMIS: ${term.emis}`);
      }
      console.log(`User School Name: ${term.userSchoolName}`);
      console.log('='.repeat(100));

      // Search by EMIS first
      if (term.emis) {
        const byEmis = schools.filter(s => s.emisCode === term.emis);
        if (byEmis.length > 0) {
          console.log(`\n✅ FOUND by EMIS: ${byEmis.length} match(es)\n`);
          byEmis.forEach(school => {
            console.log(`  School Name: ${school.schoolName}`);
            console.log(`  EMIS Code: ${school.emisCode}`);
            console.log(`  Markaz: ${school.markazName}`);
            console.log(`  AEO: ${school.aeoName}`);
            console.log(`  AEO Contact: ${school.aeoContact}`);
            console.log(`  Gender: ${school.gender}`);
            console.log();
          });
        } else {
          console.log(`\n❌ Not found by EMIS: ${term.emis}`);
        }
      }

      // Search by name
      const searchWords = term.userSchoolName.toLowerCase().split(' ').filter(w => w.length > 2);
      const byName = schools.filter(school => {
        const schoolNameLower = school.schoolName.toLowerCase();
        return searchWords.some(word => schoolNameLower.includes(word));
      });

      if (byName.length > 0) {
        console.log(`\n🔍 Found ${byName.length} schools with similar names:\n`);
        byName.forEach(school => {
          console.log(`  School Name: ${school.schoolName}`);
          console.log(`  EMIS Code: ${school.emisCode}`);
          console.log(`  Markaz: ${school.markazName}`);
          console.log(`  AEO: ${school.aeoName}`);
          console.log(`  AEO Contact: ${school.aeoContact}`);
          console.log(`  Gender: ${school.gender}`);
          console.log();
        });
      } else if (!term.emis || byEmis.length === 0) {
        console.log(`\n❌ No schools found matching "${term.userSchoolName}"`);
      }
    });

    console.log('\n' + '='.repeat(100));
    console.log('📊 SUMMARY');
    console.log('='.repeat(100));
    console.log(`\nTotal schools in Excel: ${schools.length}`);
    console.log('Male schools: ' + schools.filter(s => s.gender === 'MALE').length);
    console.log('Female schools: ' + schools.filter(s => s.gender === 'FEMALE').length);
    console.log('\nUnique Markazes:');
    const uniqueMarkazes = [...new Set(schools.map(s => s.markazName))].sort();
    uniqueMarkazes.forEach(m => {
      const count = schools.filter(s => s.markazName === m).length;
      console.log(`  - ${m} (${count} schools)`);
    });
    console.log('='.repeat(100));

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

findSchools();
