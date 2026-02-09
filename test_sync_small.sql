-- ============================================
-- School Data Sync from Excel Files
-- ============================================
-- Generated: 2026-02-02T08:06:09.743Z
-- Total schools: 260
-- Source: Male and Female AEO school lists
--
-- WARNING: This will update school names and markaz assignments
-- in the schools table AND cascade updates to all dependent tables.
--
-- BACKUP YOUR DATABASE BEFORE RUNNING THIS SCRIPT!
-- ============================================


-- ============================================
-- PART 1: Update existing schools
-- ============================================

-- Update: GPS HAYAL. (EMIS: 37330250)
UPDATE schools
SET name = 'GPS HAYAL.',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330250';

-- Update: GPS MISRIOT (EMIS: 37330254)
UPDATE schools
SET name = 'GPS MISRIOT',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330254';

-- Update: GPS CENTRAL JAIL RWP (EMIS: 37330305)
UPDATE schools
SET name = 'GPS CENTRAL JAIL RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330305';

-- Update: GPS DHALA (EMIS: 37330307)
UPDATE schools
SET name = 'GPS DHALA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330307';

-- Update: GPS BODIAL (EMIS: 37330309)
UPDATE schools
SET name = 'GPS BODIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330309';

-- Update: GPS DEGAL (EMIS: 37330315)
UPDATE schools
SET name = 'GPS DEGAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330315';

-- Update: GPS DHAMIAL (EMIS: 37330317)
UPDATE schools
SET name = 'GPS DHAMIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330317';

-- Update: GPS SHAHPUR SYEDAN (EMIS: 37330335)
UPDATE schools
SET name = 'GPS SHAHPUR SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330335';

-- Update: GPS KALRI (EMIS: 37330349)
UPDATE schools

-- Test with first 5 schools only
