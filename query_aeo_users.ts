import { readFileSync } from 'fs';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Read .env manually
const envContent = readFileSync('.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const connectionString = dbUrlMatch[1].trim();
const client = postgres(connectionString);
const db = drizzle(client);

async function queryAEOUsers() {
  try {
    console.log('✓ Connected to database\n');

    const query = `
      SELECT
        aeo.name as aeo_name,
        aeo.markaz_name,
        COUNT(DISTINCT CASE WHEN t.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher') AND t.status = 'active' THEN t.id END) as active_teachers,
        COUNT(DISTINCT CASE WHEN t.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher') AND t.status = 'pending' THEN t.id END) as pending_teachers
      FROM users aeo
      LEFT JOIN users t ON t.markaz_name = aeo.markaz_name AND t.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher')
      WHERE aeo.role = 'AEO'
      GROUP BY aeo.id, aeo.name, aeo.markaz_name
      HAVING COUNT(DISTINCT CASE WHEN t.role IN ('TEACHER', 'HEAD_TEACHER', 'Teacher', 'Head Teacher') THEN t.id END) > 0
      ORDER BY active_teachers DESC
      LIMIT 10;
    `;

    console.log('Executing query: Top 10 AEOs with their visible teachers\n');

    const results = await client.unsafe(query);

    console.log('Results:');
    console.log('========================================');
    console.log(`Found ${results.length} AEOs with assigned teachers\n`);

    if (results.length > 0) {
      // Print header
      console.log('AEO Name'.padEnd(30) + 'Markaz'.padEnd(25) + 'Active'.padEnd(10) + 'Pending');
      console.log('-'.repeat(75));

      // Print results
      results.forEach((row: any) => {
        console.log(
          (row.aeo_name || 'N/A').padEnd(30) +
          (row.markaz_name || 'N/A').padEnd(25) +
          String(row.active_teachers).padEnd(10) +
          String(row.pending_teachers)
        );
      });

      console.log('-'.repeat(75));

      // Summary statistics
      const totalActive = results.reduce((sum: number, row: any) => sum + parseInt(row.active_teachers), 0);
      const totalPending = results.reduce((sum: number, row: any) => sum + parseInt(row.pending_teachers), 0);

      console.log(`\nSummary:`);
      console.log(`  Total Active Teachers: ${totalActive}`);
      console.log(`  Total Pending Teachers: ${totalPending}`);
      console.log(`  Total Teachers: ${totalActive + totalPending}`);
    } else {
      console.log('⚠️  No AEOs found with assigned teachers');
    }

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

queryAEOUsers();
