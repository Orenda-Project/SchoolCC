import { readFileSync } from 'fs';
import postgres from 'postgres';

const envContent = readFileSync('/home/taleemabad/taleemabad/SchoolCC/.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const connectionString = dbUrlMatch[1].trim();
const client = postgres(connectionString, { idle_timeout: 10 });

async function queryAEOUsers() {
  try {
    // Query 1: All AEO users with details, sorted by name
    const aeoUsers = await client.unsafe(`
      SELECT
        name,
        phone_number,
        status,
        markaz_name,
        assigned_schools
      FROM users
      WHERE role = 'AEO'
      ORDER BY name ASC
    `);

    console.log('=== ALL AEO USERS ===');
    console.log(`Total AEO users found: ${aeoUsers.length}\n`);

    // Print header
    const header =
      '#'.padEnd(4) +
      'Name'.padEnd(30) +
      'Phone Number'.padEnd(18) +
      'Status'.padEnd(15) +
      'Markaz Name'.padEnd(35) +
      'Assigned Schools';
    console.log(header);
    console.log('-'.repeat(header.length + 5));

    // Print each user
    aeoUsers.forEach((row: any, idx: number) => {
      let assignedSchools: any[] = [];
      try {
        if (typeof row.assigned_schools === 'string') {
          assignedSchools = JSON.parse(row.assigned_schools);
        } else if (Array.isArray(row.assigned_schools)) {
          assignedSchools = row.assigned_schools;
        }
      } catch {
        assignedSchools = [];
      }

      console.log(
        String(idx + 1).padEnd(4) +
        (row.name || 'N/A').padEnd(30) +
        (row.phone_number || 'N/A').padEnd(18) +
        (row.status || 'N/A').padEnd(15) +
        (row.markaz_name || 'N/A').padEnd(35) +
        String(assignedSchools.length)
      );
    });

    console.log('-'.repeat(header.length + 5));

    // Query 2: Status breakdown
    const statusBreakdown = await client.unsafe(`
      SELECT
        status,
        COUNT(*) as count
      FROM users
      WHERE role = 'AEO'
      GROUP BY status
      ORDER BY count DESC
    `);

    console.log('\n=== STATUS BREAKDOWN ===');
    console.log('Status'.padEnd(20) + 'Count');
    console.log('-'.repeat(30));
    let total = 0;
    statusBreakdown.forEach((row: any) => {
      console.log(
        (row.status || 'NULL').padEnd(20) +
        String(row.count)
      );
      total += parseInt(row.count);
    });
    console.log('-'.repeat(30));
    console.log('TOTAL'.padEnd(20) + String(total));

  } catch (error: any) {
    console.error('ERROR:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

queryAEOUsers();
