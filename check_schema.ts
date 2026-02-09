import { readFileSync } from 'fs';
import postgres from "postgres";

const envContent = readFileSync('.env', 'utf8');
const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!dbUrlMatch) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const connectionString = dbUrlMatch[1].trim();
const client = postgres(connectionString);

async function checkSchema() {
  try {
    console.log('Checking actual database schema...\n');
    
    // Check schools table columns
    const schoolsColumns = await client`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'schools'
      ORDER BY ordinal_position
    `;
    
    console.log('SCHOOLS TABLE COLUMNS:');
    console.log('='.repeat(60));
    schoolsColumns.forEach((col: any) => {
      console.log(`${col.column_name} (${col.data_type})`);
    });
    
    // Check users table columns
    const usersColumns = await client`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;
    
    console.log('\n\nUSERS TABLE COLUMNS:');
    console.log('='.repeat(60));
    usersColumns.forEach((col: any) => {
      console.log(`${col.column_name} (${col.data_type})`);
    });
    
  } catch (error: any) {
    console.error('ERROR:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

checkSchema();
