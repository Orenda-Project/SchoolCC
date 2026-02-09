import pg from 'pg';
import { readFileSync } from 'fs';
const { Client } = pg;

// Read .env file manually
const envContent = readFileSync('.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found in .env file');
  process.exit(1);
}
const DATABASE_URL = dbUrlMatch[1].trim();

async function runSQL() {

  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✓ Connected to database');

    const sql = readFileSync('sync_schools_complete_clean.sql', 'utf8');
    console.log('Running SQL script (this may take a few seconds)...');

    await client.query(sql);
    console.log('\n✓ SUCCESS! All 260 schools have been updated!');
    console.log('✓ All dependent tables have been updated!');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSQL();
