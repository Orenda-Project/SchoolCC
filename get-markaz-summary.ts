import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

async function getMarkazSummary() {
  try {
    console.log('📊 Generating Markaz Summary Report...\n');

    // Get all markazes with school counts and AEO assignments
    const markazData = await db.execute(sql`
      SELECT
        m.id as markaz_id,
        m.name as markaz_name,
        t.name as tehsil_name,
        COUNT(DISTINCT s.id) as school_count,
        COUNT(DISTINCT u.id) as aeo_count,
        STRING_AGG(DISTINCT u.name, '; ') as aeo_names,
        STRING_AGG(DISTINCT u.phone_number, '; ') as aeo_phones
      FROM markazes m
      LEFT JOIN schools s ON s.markaz_id = m.id
      LEFT JOIN users u ON u.markaz_name = m.name AND u.role = 'AEO'
      GROUP BY m.id, m.name, t.name
      ORDER BY school_count DESC, m.name
    `);

    console.log(`Total markazes: ${markazData.length}\n`);

    console.log('='.repeat(150));
    console.log('MARKAZ SUMMARY');
    console.log('='.repeat(150));

    let totalSchools = 0;
    let markazesWithAEO = 0;
    let markazesWithoutAEO = 0;

    markazData.forEach((markaz: any, index: number) => {
      totalSchools += Number(markaz.school_count);
      if (Number(markaz.aeo_count) > 0) {
        markazesWithAEO++;
      } else {
        markazesWithoutAEO++;
      }

      console.log(`\n${index + 1}. ${markaz.markaz_name}`);
      console.log(`   Schools: ${markaz.school_count}`);
      console.log(`   AEOs: ${markaz.aeo_count}`);
      if (markaz.aeo_names) {
        console.log(`   AEO Names: ${markaz.aeo_names}`);
        console.log(`   AEO Phones: ${markaz.aeo_phones}`);
      } else {
        console.log(`   ⚠️  NO AEO ASSIGNED`);
      }
    });

    console.log('\n' + '='.repeat(150));
    console.log('SUMMARY STATISTICS');
    console.log('='.repeat(150));
    console.log(`Total Markazes: ${markazData.length}`);
    console.log(`Markazes with AEO: ${markazesWithAEO}`);
    console.log(`Markazes without AEO: ${markazesWithoutAEO}`);
    console.log(`Total Schools across all Markazes: ${totalSchools}`);
    console.log('='.repeat(150));

    // Generate CSV
    const csvHeaders = 'Markaz ID,Markaz Name,Tehsil,School Count,AEO Count,AEO Names,AEO Phones\n';
    const csvRows = markazData.map((markaz: any) => {
      return [
        markaz.markaz_id,
        `"${markaz.markaz_name}"`,
        `"${markaz.tehsil_name || ''}"`,
        markaz.school_count,
        markaz.aeo_count,
        `"${markaz.aeo_names || ''}"`,
        `"${markaz.aeo_phones || ''}"`
      ].join(',');
    });

    const csvContent = csvHeaders + csvRows.join('\n');
    fs.writeFileSync('markaz_summary.csv', csvContent);

    console.log('\n✅ Markaz summary report generated!');
    console.log('   File: markaz_summary.csv');
    console.log(`   Total markazes: ${markazData.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

getMarkazSummary();
