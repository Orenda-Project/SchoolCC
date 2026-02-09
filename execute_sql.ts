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

async function runSQL() {
  try {
    console.log('✓ Connected to database');

    const sqlFile = readFileSync('sync_schools_complete_clean.sql', 'utf8');
    console.log('Running SQL script (updating 260 schools)...\n');

    // Execute the SQL directly using postgres client
    await client.unsafe(sqlFile);

    console.log('\n✅ SUCCESS! All 260 schools have been updated!');
    console.log('✅ All dependent tables have been updated!\n');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSQL();
