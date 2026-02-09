const { Client } = require('pg');
const fs = require('fs');

async function runSQL() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const sql = fs.readFileSync('sync_schools_complete_clean.sql', 'utf8');
    console.log('Running SQL script...');

    await client.query(sql);
    console.log('✓ Successfully updated all 260 schools!');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

runSQL();
