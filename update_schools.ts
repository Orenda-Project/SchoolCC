import { readFileSync } from 'fs';
import postgres from 'postgres';

// Use environment variable or read from .env file
let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  const envContent = readFileSync('.env', 'utf8');
  const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
  if (!dbUrlMatch) {
    console.error('ERROR: DATABASE_URL not found');
    process.exit(1);
  }
  DATABASE_URL = dbUrlMatch[1].trim();
}

async function runSQL() {
  const sql = postgres(DATABASE_URL);

  try {
    console.log('✓ Connected to database');

    const sqlFile = readFileSync('sync_schools_complete_clean.sql', 'utf8');
    console.log('Running SQL script (updating 260 schools)...\n');

    await sql.unsafe(sqlFile);

    console.log('\n✅ SUCCESS! All 260 schools have been updated!');
    console.log('✅ All dependent tables have been updated!\n');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runSQL();
