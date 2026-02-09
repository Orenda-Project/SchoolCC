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

BEGIN;

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
SET name = 'GPS KALRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330349';

-- Update: GES KHASALAA KALLAN (EMIS: 37330350)
UPDATE schools
SET name = 'GES KHASALAA KALLAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330350';

-- Update: GPS KHATANA (EMIS: 37330687)
UPDATE schools
SET name = 'GPS KHATANA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA'
      LIMIT 1
    )
WHERE emis_number = '37330687';

-- Update: GES DODHAR NAJJAR (EMIS: 37330125)
UPDATE schools
SET name = 'GES DODHAR NAJJAR',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330125';

-- Update: GES MUJAHID GANGAL RAWALPINDI (EMIS: 37330128)
UPDATE schools
SET name = 'GES MUJAHID GANGAL RAWALPINDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330128';

-- Update: GES MAL JANJAL (EMIS: 37330132)
UPDATE schools
SET name = 'GES MAL JANJAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330132';

-- Update: GPS GOHRA RAMIAL (EMIS: 37330271)
UPDATE schools
SET name = 'GPS GOHRA RAMIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330271';

-- Update: GPS KHAI AWAN (EMIS: 37330275)
UPDATE schools
SET name = 'GPS KHAI AWAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330275';

-- Update: GPS GHROLI (EMIS: 37330283)
UPDATE schools
SET name = 'GPS GHROLI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330283';

-- Update: GPS GHORA GUJRAN (EMIS: 37330284)
UPDATE schools
SET name = 'GPS GHORA GUJRAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330284';

-- Update: GPS KALRI (EMIS: 37330285)
UPDATE schools
SET name = 'GPS KALRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330285';

-- Update: GPS BAGGA SHEIKHAN (EMIS: 37330289)
UPDATE schools
SET name = 'GPS BAGGA SHEIKHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330289';

-- Update: GPS BANGIAL SAWAN (EMIS: 37330292)
UPDATE schools
SET name = 'GPS BANGIAL SAWAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330292';

-- Update: GPS BASSALI (EMIS: 37330293)
UPDATE schools
SET name = 'GPS BASSALI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330293';

-- Update: GPS CHAK KHAS (EMIS: 37330294)
UPDATE schools
SET name = 'GPS CHAK KHAS',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330294';

-- Update: GES CHANI ALAM SHER (EMIS: 37330295)
UPDATE schools
SET name = 'GES CHANI ALAM SHER',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI'
      LIMIT 1
    )
WHERE emis_number = '37330295';

-- Update: GPS CHAKLALA RAWALPNDI (EMIS: 37330203)
UPDATE schools
SET name = 'GPS CHAKLALA RAWALPNDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330203';

-- Update: GPS DHOK ROSHAN DIN RAWALPINDI (EMIS: 37330207)
UPDATE schools
SET name = 'GPS DHOK ROSHAN DIN RAWALPINDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330207';

-- Update: GPS QUMI PAY JHANDA CHACHI (EMIS: 37330219)
UPDATE schools
SET name = 'GPS QUMI PAY JHANDA CHACHI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330219';

-- Update: GPS TANVEER-UL-ISLAM DHOKE HUKAM DAD RWP (EMIS: 37330225)
UPDATE schools
SET name = 'GPS TANVEER-UL-ISLAM DHOKE HUKAM DAD RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330225';

-- Update: GPS MC QASIMABAD STREET NO. 6 RWP (EMIS: 37330233)
UPDATE schools
SET name = 'GPS MC QASIMABAD STREET NO. 6 RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330233';

-- Update: GPS JHANDA CHICHI (EMIS: 37330238)
UPDATE schools
SET name = 'GPS JHANDA CHICHI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330238';

-- Update: GPS DHOK MUNSHI (EMIS: 37330322)
UPDATE schools
SET name = 'GPS DHOK MUNSHI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330322';

-- Update: GPS REHMAT ABAD (EMIS: 37330333)
UPDATE schools
SET name = 'GPS REHMAT ABAD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330333';

-- Update: GPS MORGAH (EMIS: 37330359)
UPDATE schools
SET name = 'GPS MORGAH',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330359';

-- Update: GPS KOT JABBI (EMIS: 37330688)
UPDATE schools
SET name = 'GPS KOT JABBI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA'
      LIMIT 1
    )
WHERE emis_number = '37330688';

-- Update: GPS DHOK RAJA HASSO KHAN (EMIS: 37330332)
UPDATE schools
SET name = 'GPS DHOK RAJA HASSO KHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330332';

-- Update: GPS DHOK KHASALA (EMIS: 37330321)
UPDATE schools
SET name = 'GPS DHOK KHASALA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330321';

-- Update: GPS MAIRA KHURD (EMIS: 37330253)
UPDATE schools
SET name = 'GPS MAIRA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330253';

-- Update: GPS CHACH RAWAN (EMIS: 37330716)
UPDATE schools
SET name = 'GPS CHACH RAWAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330716';

-- Update: GPS SAROBA (EMIS: 37330334)
UPDATE schools
SET name = 'GPS SAROBA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330334';

-- Update: GPS SHARIFABAD (EMIS: 37330336)
UPDATE schools
SET name = 'GPS SHARIFABAD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330336';

-- Update: GPS CHAK DENAL (EMIS: 37330312)
UPDATE schools
SET name = 'GPS CHAK DENAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330312';

-- Update: GPS DAHRI (EMIS: 37330401)
UPDATE schools
SET name = 'GPS DAHRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330401';

-- Update: GES RAJAR (EMIS: 37330140)
UPDATE schools
SET name = 'GES RAJAR',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330140';

-- Update: GES MUJAHID (EMIS: 37330138)
UPDATE schools
SET name = 'GES MUJAHID',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330138';

-- Update: GES SANGRAL (EMIS: 37330142)
UPDATE schools
SET name = 'GES SANGRAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330142';

-- Update: GES DHULIAL (EMIS: 37330259)
UPDATE schools
SET name = 'GES DHULIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330259';

-- Update: GES KOLIAN HAMEED (EMIS: 37330352)
UPDATE schools
SET name = 'GES KOLIAN HAMEED',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330352';

-- Update: GES GHEELA KALAN (EMIS: 37330361)
UPDATE schools
SET name = 'GES GHEELA KALAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI'
      LIMIT 1
    )
WHERE emis_number = '37330361';

-- Update: GES HOON (EMIS: 37330145)
UPDATE schools
SET name = 'GES HOON',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330145';

-- Update: GPS GHILWAL (EMIS: 37330339)
UPDATE schools
SET name = 'GPS GHILWAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330339';

-- Update: GPS KOLIAN GOHRU (EMIS: 37330371)
UPDATE schools
SET name = 'GPS KOLIAN GOHRU',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330371';

-- Update: GES MIANA MOHRA (EMIS: 37330377)
UPDATE schools
SET name = 'GES MIANA MOHRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330377';

-- Update: GPS PAPIAN (EMIS: 37330383)
UPDATE schools
SET name = 'GPS PAPIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330383';

-- Update: GES RAIKA MIRA (EMIS: 37330385)
UPDATE schools
SET name = 'GES RAIKA MIRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330385';

-- Update: GES THALLA KHURD (EMIS: 37330392)
UPDATE schools
SET name = 'GES THALLA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330392';

-- Update: GPS ADHAWAL (EMIS: 37330393)
UPDATE schools
SET name = 'GPS ADHAWAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330393';

-- Update: GES CHAK BELI KHAN (EMIS: 37330396)
UPDATE schools
SET name = 'GES CHAK BELI KHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA'
      LIMIT 1
    )
WHERE emis_number = '37330396';

-- Update: GES JAWA (EMIS: 37330130)
UPDATE schools
SET name = 'GES JAWA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330130';

-- Update: GES KURI KHUDA BUKSH (EMIS: 37330131)
UPDATE schools
SET name = 'GES KURI KHUDA BUKSH',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330131';

-- Update: GPS SHEIKH ZADA (EMIS: 37330266)
UPDATE schools
SET name = 'GPS SHEIKH ZADA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330266';

-- Update: GPS TAKHTI (EMIS: 37330267)
UPDATE schools
SET name = 'GPS TAKHTI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330267';

-- Update: GPS JHARKAY (EMIS: 37330273)
UPDATE schools
SET name = 'GPS JHARKAY',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330273';

-- Update: GPS MIAN AHMEDA (EMIS: 37330280)
UPDATE schools
SET name = 'GPS MIAN AHMEDA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330280';

-- Update: GES BAGH SANGRA (EMIS: 37330288)
UPDATE schools
SET name = 'GES BAGH SANGRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330288';

-- Update: GPS DHOK HAMMIT (EMIS: 37330298)
UPDATE schools
SET name = 'GPS DHOK HAMMIT',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330298';

-- Update: GPS MALANA (EMIS: 37330302)
UPDATE schools
SET name = 'GPS MALANA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330302';

-- Update: GPS UN PUR (EMIS: 37330303)
UPDATE schools
SET name = 'GPS UN PUR',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330303';

-- Update: GPS GANDIAN (EMIS: 37330715)
UPDATE schools
SET name = 'GPS GANDIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL'
      LIMIT 1
    )
WHERE emis_number = '37330715';

-- Update: GPS POSTAL COLONY (EMIS: 37330218)
UPDATE schools
SET name = 'GPS POSTAL COLONY',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330218';

-- Update: GPS WESTRIDGE-I (EMIS: 37330227)
UPDATE schools
SET name = 'GPS WESTRIDGE-I',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330227';

-- Update: GES BANGUSH COLONY (EMIS: 37330201)
UPDATE schools
SET name = 'GES BANGUSH COLONY',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330201';

-- Update: GPS NEW PUBLIC RAWALPINDI (EMIS: 37330216)
UPDATE schools
SET name = 'GPS NEW PUBLIC RAWALPINDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330216';

-- Update: GPS STANDARD MUSLIM (EMIS: 37330222)
UPDATE schools
SET name = 'GPS STANDARD MUSLIM',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330222';

-- Update: GPS MC MOHALLAH WORKSHOPI RWP (EMIS: 37330231)
UPDATE schools
SET name = 'GPS MC MOHALLAH WORKSHOPI RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330231';

-- Update: GPS HAMIDIA (EMIS: 37330235)
UPDATE schools
SET name = 'GPS HAMIDIA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330235';

-- Update: GPS DHOK HASSO (EMIS: 37330205)
UPDATE schools
SET name = 'GPS DHOK HASSO',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330205';

-- Update: GPS RATTA AMRAL (EMIS: 37330221)
UPDATE schools
SET name = 'GPS RATTA AMRAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330221';

-- Update: GPS MC ARJAN NAGAR RWP (EMIS: 37330228)
UPDATE schools
SET name = 'GPS MC ARJAN NAGAR RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330228';

-- Update: GPS ISLAMIA RATTA (EMIS: 37330237)
UPDATE schools
SET name = 'GPS ISLAMIA RATTA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI'
      LIMIT 1
    )
WHERE emis_number = '37330237';

-- Update: GPS BAKRA MANDI (EMIS: 37330200)
UPDATE schools
SET name = 'GPS BAKRA MANDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330200';

-- Update: GPS DHOK GUJRAN MISRIAL (EMIS: 37330204)
UPDATE schools
SET name = 'GPS DHOK GUJRAN MISRIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330204';

-- Update: GPS DHOK MISTRIAN (EMIS: 37330206)
UPDATE schools
SET name = 'GPS DHOK MISTRIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330206';

-- Update: GPS DHOKE SYEDAN (EMIS: 37330208)
UPDATE schools
SET name = 'GPS DHOKE SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330208';

-- Update: GPS DHOK ZIARAT (EMIS: 37330209)
UPDATE schools
SET name = 'GPS DHOK ZIARAT',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330209';

-- Update: GPS TULSA (EMIS: 37330226)
UPDATE schools
SET name = 'GPS TULSA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330226';

-- Update: GES LAKHAN (EMIS: 37330241)
UPDATE schools
SET name = 'GES LAKHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330241';

-- Update: GPS LIAQAT MODEL (EMIS: 37330242)
UPDATE schools
SET name = 'GPS LIAQAT MODEL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330242';

-- Update: GPS MOHRI GHAZAN (EMIS: 37330249)
UPDATE schools
SET name = 'GPS MOHRI GHAZAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330249';

-- Update: GES BAJNIAL (EMIS: 37330257)
UPDATE schools
SET name = 'GES BAJNIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330257';

-- Update: GPS CHAKRA (EMIS: 37330258)
UPDATE schools
SET name = 'GPS CHAKRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330258';

-- Update: GPS DHOK CHATTA (EMIS: 37330318)
UPDATE schools
SET name = 'GPS DHOK CHATTA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT'
      LIMIT 1
    )
WHERE emis_number = '37330318';

-- Update: GES MUSLIM GULSHAN ABAD (EMIS: 37330118)
UPDATE schools
SET name = 'GES MUSLIM GULSHAN ABAD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330118';

-- Update: GPS SHIMLA ISLAMIA RWP (EMIS: 37330121)
UPDATE schools
SET name = 'GPS SHIMLA ISLAMIA RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330121';

-- Update: GPS AMAR PURA (EMIS: 37330199)
UPDATE schools
SET name = 'GPS AMAR PURA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330199';

-- Update: GPS TAJ UL ISLAM (EMIS: 37330223)
UPDATE schools
SET name = 'GPS TAJ UL ISLAM',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330223';

-- Update: GPS MC DHOK PARACHA (EMIS: 37330229)
UPDATE schools
SET name = 'GPS MC DHOK PARACHA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330229';

-- Update: GPS MC FEROZABAD (EMIS: 37330230)
UPDATE schools
SET name = 'GPS MC FEROZABAD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330230';

-- Update: GPS MC MUSLIM TOWN (EMIS: 37330234)
UPDATE schools
SET name = 'GPS MC MUSLIM TOWN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330234';

-- Update: GPS IQBAL RAHIM TOWN (EMIS: 37330236)
UPDATE schools
SET name = 'GPS IQBAL RAHIM TOWN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330236';

-- Update: GPS KHAN ASGHAR MALL (EMIS: 37330240)
UPDATE schools
SET name = 'GPS KHAN ASGHAR MALL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330240';

-- Update: GPS MANZOOR MUSLIM (EMIS: 37330244)
UPDATE schools
SET name = 'GPS MANZOOR MUSLIM',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330244';

-- Update: GPS MILLAT ISLAMIA DHOK RAHEEM BAKHSH RAWALPINDI (EMIS: 37330245)
UPDATE schools
SET name = 'GPS MILLAT ISLAMIA DHOK RAHEEM BAKHSH RAWALPINDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330245';

-- Update: GPS JHANGIR ABAD SAID GUL TOWN RWP (EMIS: 37330251)
UPDATE schools
SET name = 'GPS JHANGIR ABAD SAID GUL TOWN RWP',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL'
      LIMIT 1
    )
WHERE emis_number = '37330251';

-- Update: GMPS PIAL (EMIS: 37330262)
UPDATE schools
SET name = 'GMPS PIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330262';

-- Update: GGPS SUMBAL (EMIS: 37330507)
UPDATE schools
SET name = 'GGPS SUMBAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330507';

-- Update: GGPS KALIAM MUGHAL (EMIS: 37330513)
UPDATE schools
SET name = 'GGPS KALIAM MUGHAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330513';

-- Update: GGPS MAIRA BHARTA (EMIS: 37330521)
UPDATE schools
SET name = 'GGPS MAIRA BHARTA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330521';

-- Update: GGPS CHANI ALAM SHER (EMIS: 37330529)
UPDATE schools
SET name = 'GGPS CHANI ALAM SHER',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330529';

-- Update: GGPS GOHRA BARATA (IASP) (EMIS: 37330542)
UPDATE schools
SET name = 'GGPS GOHRA BARATA (IASP)',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330542';

-- Update: GGPS BAGGA SHEIKHAN # 1 (EMIS: 37330548)
UPDATE schools
SET name = 'GGPS BAGGA SHEIKHAN # 1',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330548';

-- Update: GGPS BAGGA SANGRAL (EMIS: 37330549)
UPDATE schools
SET name = 'GGPS BAGGA SANGRAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330549';

-- Update: GGPS No. 2 BAGGA SHEIKHAN (EMIS: 37330704)
UPDATE schools
SET name = 'GGPS No. 2 BAGGA SHEIKHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330704';

-- Update: GGES HARRAKA (EMIS: 37330553)
UPDATE schools
SET name = 'GGES HARRAKA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN'
      LIMIT 1
    )
WHERE emis_number = '37330553';

-- Update: GMPS BARWALA (EMIS: 37330300)
UPDATE schools
SET name = 'GMPS BARWALA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330300';

-- Update: GMPS SAGRI (EMIS: 37330504)
UPDATE schools
SET name = 'GMPS SAGRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330504';

-- Update: GMPS LOHDRA (EMIS: 37330519)
UPDATE schools
SET name = 'GMPS LOHDRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330519';

-- Update: GGPS CHATRO (EMIS: 37330530)
UPDATE schools
SET name = 'GGPS CHATRO',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330530';

-- Update: GGPS GHORA RAMIAL (EMIS: 37330531)
UPDATE schools
SET name = 'GGPS GHORA RAMIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330531';

-- Update: GGPS DADHAR NAJJAR (EMIS: 37330532)
UPDATE schools
SET name = 'GGPS DADHAR NAJJAR',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330532';

-- Update: GMPS DAWRI (EMIS: 37330534)
UPDATE schools
SET name = 'GMPS DAWRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330534';

-- Update: GMPS ABAN CHAK (EMIS: 37330547)
UPDATE schools
SET name = 'GMPS ABAN CHAK',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330547';

-- Update: GGCMS MOHRI KHAMBAL (EMIS: 37330556)
UPDATE schools
SET name = 'GGCMS MOHRI KHAMBAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330556';

-- Update: GGES ARAZI SOHAL (EMIS: 37330172)
UPDATE schools
SET name = 'GGES ARAZI SOHAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330172';

-- Update: GGES DADHOCHA (EMIS: 37330175)
UPDATE schools
SET name = 'GGES DADHOCHA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330175';

-- Update: GGES DHAKALA (EMIS: 37330176)
UPDATE schools
SET name = 'GGES DHAKALA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330176';

-- Update: GGES JHUMMAT MUGHAL (EMIS: 37330512)
UPDATE schools
SET name = 'GGES JHUMMAT MUGHAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330512';

-- Update: GMPS MOHRA BHATAN (EMIS: 37330281)
UPDATE schools
SET name = 'GMPS MOHRA BHATAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330281';

-- Update: GMPS GAHI SYEDAN (EMIS: 37330325)
UPDATE schools
SET name = 'GMPS GAHI SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330325';

-- Update: GMPS GANG (EMIS: 37330327)
UPDATE schools
SET name = 'GMPS GANG',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330327';

-- Update: GMPS GHELLA KHURD (EMIS: 37330362)
UPDATE schools
SET name = 'GMPS GHELLA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330362';

-- Update: GMPS HARNIALI SYEDAN (EMIS: 37330364)
UPDATE schools
SET name = 'GMPS HARNIALI SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330364';

-- Update: GMPS DHANDI GUJRAN (EMIS: 37330400)
UPDATE schools
SET name = 'GMPS DHANDI GUJRAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330400';

-- Update: GGPS TATRAL (EMIS: 37330657)
UPDATE schools
SET name = 'GGPS TATRAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330657';

-- Update: GGES MOHRA (EMIS: 37330380)
UPDATE schools
SET name = 'GGES MOHRA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330380';

-- Update: GGES DHERI (EMIS: 37330634)
UPDATE schools
SET name = 'GGES DHERI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330634';

-- Update: GGES GHELLA KALAN (EMIS: 37330643)
UPDATE schools
SET name = 'GGES GHELLA KALAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330643';

-- Update: GMPS JASWAL (EMIS: 37330661)
UPDATE schools
SET name = 'GMPS JASWAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330661';

-- Update: GMPS Kali Pari (EMIS: 37330369)
UPDATE schools
SET name = 'GMPS Kali Pari',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330369';

-- Update: GGPS Unpur (EMIS: 37330511)
UPDATE schools
SET name = 'GGPS Unpur',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330511';

-- Update: GGPS Kharakan (EMIS: 37330515)
UPDATE schools
SET name = 'GGPS Kharakan',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330515';

-- Update: GGPS Khinger Kalan (EMIS: 37330516)
UPDATE schools
SET name = 'GGPS Khinger Kalan',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330516';

-- Update: GGPS Lilakamalpur (EMIS: 37330518)
UPDATE schools
SET name = 'GGPS Lilakamalpur',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330518';

-- Update: GGPS Dhudian (EMIS: 37330538)
UPDATE schools
SET name = 'GGPS Dhudian',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330538';

-- Update: GGPS Ferozy (EMIS: 37330539)
UPDATE schools
SET name = 'GGPS Ferozy',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330539';

-- Update: GMPS Gangal (EMIS: 37330540)
UPDATE schools
SET name = 'GMPS Gangal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330540';

-- Update: GGES Jabber Miana (EMIS: 37330129)
UPDATE schools
SET name = 'GGES Jabber Miana',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330129';

-- Update: GGES Dhoke Budhal (EMIS: 37330537)
UPDATE schools
SET name = 'GGES Dhoke Budhal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330537';

-- Update: GGES Hoshial (EMIS: 37330554)
UPDATE schools
SET name = 'GGES Hoshial',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330554';

-- Update: GGES Mohra (EMIS: 37330629)
UPDATE schools
SET name = 'GGES Mohra',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330629';

-- Update: GGES Nikrali (EMIS: 37330706)
UPDATE schools
SET name = 'GGES Nikrali',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330706';

-- Update: GMPS HAKIMAL (EMIS: 37330363)
UPDATE schools
SET name = 'GMPS HAKIMAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330363';

-- Update: GMPS JHANGI DAIM (EMIS: 37330368)
UPDATE schools
SET name = 'GMPS JHANGI DAIM',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330368';

-- Update: GMPS PINDORI (EMIS: 37330384)
UPDATE schools
SET name = 'GMPS PINDORI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330384';

-- Update: GMPS RUPPER KHURD (EMIS: 37330388)
UPDATE schools
SET name = 'GMPS RUPPER KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330388';

-- Update: GGPS DK ALI BHADUR (EMIS: 37330639)
UPDATE schools
SET name = 'GGPS DK ALI BHADUR',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330639';

-- Update: GMPS DK BHATIAN (EMIS: 37330640)
UPDATE schools
SET name = 'GMPS DK BHATIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330640';

-- Update: GGMPS THALLA KALAN (EMIS: 37330658)
UPDATE schools
SET name = 'GGMPS THALLA KALAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330658';

-- Update: GMPS MEHMOODA (EMIS: 37330667)
UPDATE schools
SET name = 'GMPS MEHMOODA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330667';

-- Update: GGES BAINS (EMIS: 37330411)
UPDATE schools
SET name = 'GGES BAINS',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330411';

-- Update: GGES THALLA KHURD (EMIS: 37330659)
UPDATE schools
SET name = 'GGES THALLA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330659';

-- Update: GMPS Las Mali (EMIS: 37330374)
UPDATE schools
SET name = 'GMPS Las Mali',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330374';

-- Update: GMPS Guggan (EMIS: 37330409)
UPDATE schools
SET name = 'GMPS Guggan',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330409';

-- Update: GMPS Talla Bajar (EMIS: 37330390)
UPDATE schools
SET name = 'GMPS Talla Bajar',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330390';

-- Update: GGPS Hoon (EMIS: 37330649)
UPDATE schools
SET name = 'GGPS Hoon',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330649';

-- Update: GMPS Gangal (EMIS: 37330410)
UPDATE schools
SET name = 'GMPS Gangal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330410';

-- Update: GMPS Chokar (EMIS: 37330633)
UPDATE schools
SET name = 'GMPS Chokar',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330633';

-- Update: GMPS Dhok Adrana (EMIS: 37330638)
UPDATE schools
SET name = 'GMPS Dhok Adrana',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330638';

-- Update: GMPS Khabba Barala (EMIS: 37330370)
UPDATE schools
SET name = 'GMPS Khabba Barala',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330370';

-- Update: GMPS Chak Sigho (EMIS: 37330397)
UPDATE schools
SET name = 'GMPS Chak Sigho',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330397';

-- Update: GGES Dhok Mureed (EMIS: 37330637)
UPDATE schools
SET name = 'GGES Dhok Mureed',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330637';

-- Update: GGES Bodial (EMIS: 37330621)
UPDATE schools
SET name = 'GGES Bodial',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330621';

-- Update: GGES Salmoon (EMIS: 37330389)
UPDATE schools
SET name = 'GGES Salmoon',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330389';

-- Update: GGES Mohri Khattran (EMIS: 37330585)
UPDATE schools
SET name = 'GGES Mohri Khattran',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330585';

-- Update: GGES GULAM SARWAR BRITISH HOMES (EMIS: 37330717)
UPDATE schools
SET name = 'GGES GULAM SARWAR BRITISH HOMES',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330717';

-- Update: GGPS Berket (EMIS: 37330618)
UPDATE schools
SET name = 'GGPS Berket',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330618';

-- Update: GMPS Dhumma (EMIS: 37330608)
UPDATE schools
SET name = 'GMPS Dhumma',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330608';

-- Update: GMPS Gurbal (EMIS: 37330342)
UPDATE schools
SET name = 'GMPS Gurbal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330342';

-- Update: GMPS Pind Ranjha (EMIS: 37330255)
UPDATE schools
SET name = 'GMPS Pind Ranjha',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330255';

-- Update: GGPS Chakara (EMIS: 37330598)
UPDATE schools
SET name = 'GGPS Chakara',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330598';

-- Update: GGPS Lakhoo (EMIS: 37330576)
UPDATE schools
SET name = 'GGPS Lakhoo',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330576';

-- Update: GMPS Jattal (EMIS: 37330345)
UPDATE schools
SET name = 'GMPS Jattal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330345';

-- Update: GMPS Pind Malhu (EMIS: 37330331)
UPDATE schools
SET name = 'GMPS Pind Malhu',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330331';

-- Update: GMPS Jhandu Syedan (EMIS: 37330346)
UPDATE schools
SET name = 'GMPS Jhandu Syedan',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330346';

-- Update: GMPS Dhok Chehr (EMIS: 37330606)
UPDATE schools
SET name = 'GMPS Dhok Chehr',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI'
      LIMIT 1
    )
WHERE emis_number = '37330606';

-- Update: GGPS DHOK MALKAN (EMIS: 37330607)
UPDATE schools
SET name = 'GGPS DHOK MALKAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330607';

-- Update: GMPS BAGRA SYEDAN (EMIS: 37330256)
UPDATE schools
SET name = 'GMPS BAGRA SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330256';

-- Update: GMPS JADA (EMIS: 37330613)
UPDATE schools
SET name = 'GMPS JADA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330613';

-- Update: GGES MUJAHID (EMIS: 37330587)
UPDATE schools
SET name = 'GGES MUJAHID',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330587';

-- Update: GGES PIND HABTAL  RAWALPINDI (EMIS: 37330612)
UPDATE schools
SET name = 'GGES PIND HABTAL  RAWALPINDI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330612';

-- Update: GGES DHOKE CHACH (EMIS: 37330605)
UPDATE schools
SET name = 'GGES DHOKE CHACH',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330605';

-- Update: GGES MERA Mohra (EMIS: 37330524)
UPDATE schools
SET name = 'GGES MERA Mohra',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330524';

-- Update: GGES Jharaki (EMIS: 37330555)
UPDATE schools
SET name = 'GGES Jharaki',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330555';

-- Update: GGES Banda (EMIS: 37330551)
UPDATE schools
SET name = 'GGES Banda',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330551';

-- Update: Gges Mujahid Gangal (EMIS: 37330179)
UPDATE schools
SET name = 'Gges Mujahid Gangal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330179';

-- Update: Ggps sarhdnay (EMIS: 37330505)
UPDATE schools
SET name = 'Ggps sarhdnay',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330505';

-- Update: Ggps Jabber Dervaish (EMIS: 37330546)
UPDATE schools
SET name = 'Ggps Jabber Dervaish',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330546';

-- Update: GMPS Saffair (EMIS: 37330263)
UPDATE schools
SET name = 'GMPS Saffair',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330263';

-- Update: Ggps Darogha Hassan Ali (EMIS: 37330544)
UPDATE schools
SET name = 'Ggps Darogha Hassan Ali',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330544';

-- Update: Ggps Timber ratial (EMIS: 37330509)
UPDATE schools
SET name = 'Ggps Timber ratial',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330509';

-- Update: GMPS samlal (EMIS: 37330264)
UPDATE schools
SET name = 'GMPS samlal',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330264';

-- Update: GMPS WARYAMA (EMIS: 37330546)
UPDATE schools
SET name = 'GMPS WARYAMA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330546';

-- Update: GGPS Mari Bangial (EMIS: 37330522)
UPDATE schools
SET name = 'GGPS Mari Bangial',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330522';

-- Update: GGPS Mohra sowian (EMIS: 37330527)
UPDATE schools
SET name = 'GGPS Mohra sowian',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330527';

-- Update: Ggps sarhandi (EMIS: 37330497)
UPDATE schools
SET name = 'Ggps sarhandi',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330497';

-- Update: GGES KOTHA KALLAN (EMIS: 37330561)
UPDATE schools
SET name = 'GGES KOTHA KALLAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330561';

-- Update: GGES JAIL COLONY (EMIS: 37330614)
UPDATE schools
SET name = 'GGES JAIL COLONY',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330614';

-- Update: GMPS KHINGER (EMIS: 37330351)
UPDATE schools
SET name = 'GMPS KHINGER',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330351';

-- Update: GGPS KALAS (EMIS: 37330568)
UPDATE schools
SET name = 'GGPS KALAS',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330568';

-- Update: GGPS KHASALA KHURD (EMIS: 37330571)
UPDATE schools
SET name = 'GGPS KHASALA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330571';

-- Update: GGPS KOHALA KALLAN (EMIS: 37330572)
UPDATE schools
SET name = 'GGPS KOHALA KALLAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330572';

-- Update: GGPS KOHALA SYEDAN (EMIS: 37330573)
UPDATE schools
SET name = 'GGPS KOHALA SYEDAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330573';

-- Update: GMPS LADIAN (EMIS: 37330574)
UPDATE schools
SET name = 'GMPS LADIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330574';

-- Update: GGPS MAIRA KHURD (EMIS: 37330583)
UPDATE schools
SET name = 'GGPS MAIRA KHURD',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330583';

-- Update: GGPS MORGAH (EMIS: 37330586)
UPDATE schools
SET name = 'GGPS MORGAH',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330586';

-- Update: GGPS DK KAMMAN KHAN (EMIS: 37330604)
UPDATE schools
SET name = 'GGPS DK KAMMAN KHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330604';

-- Update: GGPS DK BABA (EMIS: 37330708)
UPDATE schools
SET name = 'GGPS DK BABA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330708';

-- Update: GGES DHOKE KALA KHAN (EMIS: 37330599)
UPDATE schools
SET name = 'GGES DHOKE KALA KHAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330599';

-- Update: GGES New Sarfraz Road Rwp (EMIS: 37330157)
UPDATE schools
SET name = 'GGES New Sarfraz Road Rwp',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330157';

-- Update: GGES DHOKE PARACHA (EMIS: 37330455)
UPDATE schools
SET name = 'GGES DHOKE PARACHA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330455';

-- Update: GGES Murree Road Rawalpindi (EMIS: 37330161)
UPDATE schools
SET name = 'GGES Murree Road Rawalpindi',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330161';

-- Update: GGPS Rehmania (EMIS: 37330473)
UPDATE schools
SET name = 'GGPS Rehmania',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330473';

-- Update: GGPS MC bangush colony (EMIS: 37330451)
UPDATE schools
SET name = 'GGPS MC bangush colony',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330451';

-- Update: GGPS Carriage Factory (EMIS: 37330433)
UPDATE schools
SET name = 'GGPS Carriage Factory',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330433';

-- Update: GGPS MC Dhoke hassu (EMIS: 37330452)
UPDATE schools
SET name = 'GGPS MC Dhoke hassu',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330452';

-- Update: MC GGPS ward 28 Ratta Amral (EMIS: 37330458)
UPDATE schools
SET name = 'MC GGPS ward 28 Ratta Amral',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330458';

-- Update: GGPS  Mangtal 1 (EMIS: 37330440)
UPDATE schools
SET name = 'GGPS  Mangtal 1',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330440';

-- Update: GGPS Akhtar 
islamia (EMIS: 37330150)
UPDATE schools
SET name = 'GGPS Akhtar 
islamia',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330150';

-- Update: MC GGPS Chittian Hattian (EMIS: 37330459)
UPDATE schools
SET name = 'MC GGPS Chittian Hattian',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330459';

-- Update: GGPS MC PIR WADHAL (EMIS: 37330454)
UPDATE schools
SET name = 'GGPS MC PIR WADHAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330454';

-- Update: GGPS NEW PHAGWARI (EMIS: 37330457)
UPDATE schools
SET name = 'GGPS NEW PHAGWARI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330457';

-- Update: MC GGPS DK hukamdad (EMIS: 37330453)
UPDATE schools
SET name = 'MC GGPS DK hukamdad',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330453';

-- Update: GGES DHUDHUMBER (EMIS: 37330630)
UPDATE schools
SET name = 'GGES DHUDHUMBER',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330630';

-- Update: GGES GANGAWALA (EMIS: 37330610)
UPDATE schools
SET name = 'GGES GANGAWALA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330610';

-- Update: GGPS KHILRI (EMIS: 37330569)
UPDATE schools
SET name = 'GGPS KHILRI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330569';

-- Update: GMPS BILAWAL (EMIS: 37330620)
UPDATE schools
SET name = 'GMPS BILAWAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330620';

-- Update: GMPS CHAKRAN (EMIS: 37330599)
UPDATE schools
SET name = 'GMPS CHAKRAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330599';

-- Update: GMPS CHOORA (EMIS: 37330314)
UPDATE schools
SET name = 'GMPS CHOORA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330314';

-- Update: GMPS MALUKAL (EMIS: 37330580)
UPDATE schools
SET name = 'GMPS MALUKAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED'
      LIMIT 1
    )
WHERE emis_number = '37330580';

-- Update: GGES Naseerabad (EMIS: 37330461)
UPDATE schools
SET name = 'GGES Naseerabad',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330461';

-- Update: GGES Shoukat Saddar (EMIS: 37330165)
UPDATE schools
SET name = 'GGES Shoukat Saddar',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330165';

-- Update: GGES No  2 Siham (EMIS: 37330479)
UPDATE schools
SET name = 'GGES No  2 Siham',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330479';

-- Update: GGES Anwarulislam kamalabad (EMIS: 37330151)
UPDATE schools
SET name = 'GGES Anwarulislam kamalabad',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330151';

-- Update: GGPS Dohk Ziarat (EMIS: 37330710)
UPDATE schools
SET name = 'GGPS Dohk Ziarat',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330710';

-- Update: GGPS ARIYA MOHALLAH (EMIS: 37330450)
UPDATE schools
SET name = 'GGPS ARIYA MOHALLAH',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330450';

-- Update: GGPS Jhawra (EMIS: 37330488)
UPDATE schools
SET name = 'GGPS Jhawra',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330488';

-- Update: GGPS liaqat colony (EMIS: 37330578)
UPDATE schools
SET name = 'GGPS liaqat colony',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330578';

-- Update: GGPS MC chamanzar (EMIS: 37330446)
UPDATE schools
SET name = 'GGPS MC chamanzar',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330446';

-- Update: GGPS Mohra Tullah (EMIS: 37330584)
UPDATE schools
SET name = 'GGPS Mohra Tullah',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330584';

-- Update: GGPS JORIAN (EMIS: 37330565)
UPDATE schools
SET name = 'GGPS JORIAN',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330565';

-- Update: GGPS DK Rahim baksh (EMIS: 37330443)
UPDATE schools
SET name = 'GGPS DK Rahim baksh',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330443';

-- Update: GGPS Lakhan (EMIS: 37330575)
UPDATE schools
SET name = 'GGPS Lakhan',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330575';

-- Update: GGPS BANDA NAGIAL (EMIS: 37330709)
UPDATE schools
SET name = 'GGPS BANDA NAGIAL',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330709';

-- Update: GGPS Raika Maira (EMIS: 37330654)
UPDATE schools
SET name = 'GGPS Raika Maira',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330654';

-- Update: GMPS JARA (EMIS: 37330366)
UPDATE schools
SET name = 'GMPS JARA',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330366';

-- Update: GMPS MOJHANG (EMIS: 37330381)
UPDATE schools
SET name = 'GMPS MOJHANG',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330381';

-- Update: GMPS Banian (EMIS: 37330623)
UPDATE schools
SET name = 'GMPS Banian',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330623';

-- Update: GGES KARAHI (EMIS: 37330195)
UPDATE schools
SET name = 'GGES KARAHI',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330195';

-- Update: GGES Dhoke Gujri (EMIS: 37330627)
UPDATE schools
SET name = 'GGES Dhoke Gujri',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330627';

-- Update: GGES Misrial (EMIS: 37330669)
UPDATE schools
SET name = 'GGES Misrial',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330669';

-- Update: GGES Kurar (EMIS: 37330664)
UPDATE schools
SET name = 'GGES Kurar',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA'
      LIMIT 1
    )
WHERE emis_number = '37330664';


-- ============================================
-- PART 2: CASCADE UPDATE dependent tables
-- ============================================
-- Update schoolName in all dependent tables to match schools table
-- This ensures data consistency across the system
-- ============================================

-- Update users.school_name
UPDATE users
SET school_name = (
  SELECT name FROM schools WHERE id = users.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update request_assignees.school_name
UPDATE request_assignees
SET school_name = (
  SELECT name FROM schools WHERE id = request_assignees.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update teacher_leaves.school_name
UPDATE teacher_leaves
SET school_name = (
  SELECT name FROM schools WHERE id = teacher_leaves.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update visit_logs.school_name
UPDATE visit_logs
SET school_name = (
  SELECT name FROM schools WHERE id = visit_logs.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update school_albums.school_name
UPDATE school_albums
SET school_name = (
  SELECT name FROM schools WHERE id = school_albums.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update monitoring_visits.school_name
UPDATE monitoring_visits
SET school_name = (
  SELECT name FROM schools WHERE id = monitoring_visits.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update mentoring_visits.school_name
UPDATE mentoring_visits
SET school_name = (
  SELECT name FROM schools WHERE id = mentoring_visits.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update visit_sessions.school_name
UPDATE visit_sessions
SET school_name = (
  SELECT name FROM schools WHERE id = visit_sessions.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);

-- Update queries.sender_school_name
UPDATE queries
SET sender_school_name = (
  SELECT name FROM schools WHERE id = queries.sender_school_id
)
WHERE sender_school_id IN (
  SELECT id FROM schools WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335', '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275', '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295', '37330203', '37330207', '37330219', '37330225', '37330233', '37330238', '37330322', '37330333', '37330359', '37330688', '37330332', '37330321', '37330253', '37330716', '37330334', '37330336', '37330312', '37330401', '37330140', '37330138', '37330142', '37330259', '37330352', '37330361', '37330145', '37330339', '37330371', '37330377', '37330383', '37330385', '37330392', '37330393', '37330396', '37330130', '37330131', '37330266', '37330267', '37330273', '37330280', '37330288', '37330298', '37330302', '37330303', '37330715', '37330218', '37330227', '37330201', '37330216', '37330222', '37330231', '37330235', '37330205', '37330221', '37330228', '37330237', '37330200', '37330204', '37330206', '37330208', '37330209', '37330226', '37330241', '37330242', '37330249', '37330257', '37330258', '37330318', '37330118', '37330121', '37330199', '37330223', '37330229', '37330230', '37330234', '37330236', '37330240', '37330244', '37330245', '37330251', '37330262', '37330507', '37330513', '37330521', '37330529', '37330542', '37330548', '37330549', '37330704', '37330553', '37330300', '37330504', '37330519', '37330530', '37330531', '37330532', '37330534', '37330547', '37330556', '37330172', '37330175', '37330176', '37330512', '37330281', '37330325', '37330327', '37330362', '37330364', '37330400', '37330657', '37330380', '37330634', '37330643', '37330661', '37330369', '37330511', '37330515', '37330516', '37330518', '37330538', '37330539', '37330540', '37330129', '37330537', '37330554', '37330629', '37330706', '37330363', '37330368', '37330384', '37330388', '37330639', '37330640', '37330658', '37330667', '37330411', '37330659', '37330374', '37330409', '37330390', '37330649', '37330410', '37330633', '37330638', '37330370', '37330397', '37330637', '37330621', '37330389', '37330585', '37330717', '37330618', '37330608', '37330342', '37330255', '37330598', '37330576', '37330345', '37330331', '37330346', '37330606', '37330607', '37330256', '37330613', '37330587', '37330612', '37330605', '37330524', '37330555', '37330551', '37330179', '37330505', '37330546', '37330263', '37330544', '37330509', '37330264', '37330546', '37330522', '37330527', '37330497', '37330561', '37330614', '37330351', '37330568', '37330571', '37330572', '37330573', '37330574', '37330583', '37330586', '37330604', '37330708', '37330599', '37330157', '37330455', '37330161', '37330473', '37330451', '37330433', '37330452', '37330458', '37330440', '37330150', '37330459', '37330454', '37330457', '37330453', '37330630', '37330610', '37330569', '37330620', '37330599', '37330314', '37330580', '37330461', '37330165', '37330479', '37330151', '37330710', '37330450', '37330488', '37330578', '37330446', '37330584', '37330565', '37330443', '37330575', '37330709', '37330654', '37330366', '37330381', '37330623', '37330195', '37330627', '37330669', '37330664')
);


-- ============================================
-- PART 3: Insert new schools (if any)
-- ============================================
-- Note: Schools with EMIS codes that don't exist will be inserted
-- These inserts will only run if the school doesn't already exist
-- ============================================

-- Insert if not exists: GPS HAYAL. (EMIS: 37330250)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS HAYAL.',
  'SCH-37330250',
  '37330250',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330250'
);

-- Insert if not exists: GPS MISRIOT (EMIS: 37330254)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MISRIOT',
  'SCH-37330254',
  '37330254',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330254'
);

-- Insert if not exists: GPS CENTRAL JAIL RWP (EMIS: 37330305)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CENTRAL JAIL RWP',
  'SCH-37330305',
  '37330305',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330305'
);

-- Insert if not exists: GPS DHALA (EMIS: 37330307)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHALA',
  'SCH-37330307',
  '37330307',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330307'
);

-- Insert if not exists: GPS BODIAL (EMIS: 37330309)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS BODIAL',
  'SCH-37330309',
  '37330309',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330309'
);

-- Insert if not exists: GPS DEGAL (EMIS: 37330315)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DEGAL',
  'SCH-37330315',
  '37330315',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330315'
);

-- Insert if not exists: GPS DHAMIAL (EMIS: 37330317)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHAMIAL',
  'SCH-37330317',
  '37330317',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330317'
);

-- Insert if not exists: GPS SHAHPUR SYEDAN (EMIS: 37330335)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS SHAHPUR SYEDAN',
  'SCH-37330335',
  '37330335',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330335'
);

-- Insert if not exists: GPS KALRI (EMIS: 37330349)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KALRI',
  'SCH-37330349',
  '37330349',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330349'
);

-- Insert if not exists: GES KHASALAA KALLAN (EMIS: 37330350)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES KHASALAA KALLAN',
  'SCH-37330350',
  '37330350',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330350'
);

-- Insert if not exists: GPS KHATANA (EMIS: 37330687)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KHATANA',
  'SCH-37330687',
  '37330687',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330687'
);

-- Insert if not exists: GES DODHAR NAJJAR (EMIS: 37330125)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES DODHAR NAJJAR',
  'SCH-37330125',
  '37330125',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330125'
);

-- Insert if not exists: GES MUJAHID GANGAL RAWALPINDI (EMIS: 37330128)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES MUJAHID GANGAL RAWALPINDI',
  'SCH-37330128',
  '37330128',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330128'
);

-- Insert if not exists: GES MAL JANJAL (EMIS: 37330132)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES MAL JANJAL',
  'SCH-37330132',
  '37330132',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330132'
);

-- Insert if not exists: GPS GOHRA RAMIAL (EMIS: 37330271)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS GOHRA RAMIAL',
  'SCH-37330271',
  '37330271',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330271'
);

-- Insert if not exists: GPS KHAI AWAN (EMIS: 37330275)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KHAI AWAN',
  'SCH-37330275',
  '37330275',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330275'
);

-- Insert if not exists: GPS GHROLI (EMIS: 37330283)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS GHROLI',
  'SCH-37330283',
  '37330283',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330283'
);

-- Insert if not exists: GPS GHORA GUJRAN (EMIS: 37330284)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS GHORA GUJRAN',
  'SCH-37330284',
  '37330284',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330284'
);

-- Insert if not exists: GPS KALRI (EMIS: 37330285)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KALRI',
  'SCH-37330285',
  '37330285',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330285'
);

-- Insert if not exists: GPS BAGGA SHEIKHAN (EMIS: 37330289)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS BAGGA SHEIKHAN',
  'SCH-37330289',
  '37330289',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330289'
);

-- Insert if not exists: GPS BANGIAL SAWAN (EMIS: 37330292)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS BANGIAL SAWAN',
  'SCH-37330292',
  '37330292',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330292'
);

-- Insert if not exists: GPS BASSALI (EMIS: 37330293)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS BASSALI',
  'SCH-37330293',
  '37330293',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330293'
);

-- Insert if not exists: GPS CHAK KHAS (EMIS: 37330294)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CHAK KHAS',
  'SCH-37330294',
  '37330294',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330294'
);

-- Insert if not exists: GES CHANI ALAM SHER (EMIS: 37330295)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES CHANI ALAM SHER',
  'SCH-37330295',
  '37330295',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330295'
);

-- Insert if not exists: GPS CHAKLALA RAWALPNDI (EMIS: 37330203)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CHAKLALA RAWALPNDI',
  'SCH-37330203',
  '37330203',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330203'
);

-- Insert if not exists: GPS DHOK ROSHAN DIN RAWALPINDI (EMIS: 37330207)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK ROSHAN DIN RAWALPINDI',
  'SCH-37330207',
  '37330207',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330207'
);

-- Insert if not exists: GPS QUMI PAY JHANDA CHACHI (EMIS: 37330219)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS QUMI PAY JHANDA CHACHI',
  'SCH-37330219',
  '37330219',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330219'
);

-- Insert if not exists: GPS TANVEER-UL-ISLAM DHOKE HUKAM DAD RWP (EMIS: 37330225)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS TANVEER-UL-ISLAM DHOKE HUKAM DAD RWP',
  'SCH-37330225',
  '37330225',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330225'
);

-- Insert if not exists: GPS MC QASIMABAD STREET NO. 6 RWP (EMIS: 37330233)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC QASIMABAD STREET NO. 6 RWP',
  'SCH-37330233',
  '37330233',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330233'
);

-- Insert if not exists: GPS JHANDA CHICHI (EMIS: 37330238)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS JHANDA CHICHI',
  'SCH-37330238',
  '37330238',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330238'
);

-- Insert if not exists: GPS DHOK MUNSHI (EMIS: 37330322)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK MUNSHI',
  'SCH-37330322',
  '37330322',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330322'
);

-- Insert if not exists: GPS REHMAT ABAD (EMIS: 37330333)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS REHMAT ABAD',
  'SCH-37330333',
  '37330333',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330333'
);

-- Insert if not exists: GPS MORGAH (EMIS: 37330359)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MORGAH',
  'SCH-37330359',
  '37330359',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330359'
);

-- Insert if not exists: GPS KOT JABBI (EMIS: 37330688)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KOT JABBI',
  'SCH-37330688',
  '37330688',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKLALA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330688'
);

-- Insert if not exists: GPS DHOK RAJA HASSO KHAN (EMIS: 37330332)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK RAJA HASSO KHAN',
  'SCH-37330332',
  '37330332',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330332'
);

-- Insert if not exists: GPS DHOK KHASALA (EMIS: 37330321)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK KHASALA',
  'SCH-37330321',
  '37330321',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330321'
);

-- Insert if not exists: GPS MAIRA KHURD (EMIS: 37330253)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MAIRA KHURD',
  'SCH-37330253',
  '37330253',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330253'
);

-- Insert if not exists: GPS CHACH RAWAN (EMIS: 37330716)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CHACH RAWAN',
  'SCH-37330716',
  '37330716',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330716'
);

-- Insert if not exists: GPS SAROBA (EMIS: 37330334)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS SAROBA',
  'SCH-37330334',
  '37330334',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330334'
);

-- Insert if not exists: GPS SHARIFABAD (EMIS: 37330336)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS SHARIFABAD',
  'SCH-37330336',
  '37330336',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330336'
);

-- Insert if not exists: GPS CHAK DENAL (EMIS: 37330312)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CHAK DENAL',
  'SCH-37330312',
  '37330312',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330312'
);

-- Insert if not exists: GPS DAHRI (EMIS: 37330401)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DAHRI',
  'SCH-37330401',
  '37330401',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330401'
);

-- Insert if not exists: GES RAJAR (EMIS: 37330140)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES RAJAR',
  'SCH-37330140',
  '37330140',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330140'
);

-- Insert if not exists: GES MUJAHID (EMIS: 37330138)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES MUJAHID',
  'SCH-37330138',
  '37330138',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330138'
);

-- Insert if not exists: GES SANGRAL (EMIS: 37330142)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES SANGRAL',
  'SCH-37330142',
  '37330142',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330142'
);

-- Insert if not exists: GES DHULIAL (EMIS: 37330259)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES DHULIAL',
  'SCH-37330259',
  '37330259',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330259'
);

-- Insert if not exists: GES KOLIAN HAMEED (EMIS: 37330352)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES KOLIAN HAMEED',
  'SCH-37330352',
  '37330352',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330352'
);

-- Insert if not exists: GES GHEELA KALAN (EMIS: 37330361)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES GHEELA KALAN',
  'SCH-37330361',
  '37330361',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330361'
);

-- Insert if not exists: GES HOON (EMIS: 37330145)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES HOON',
  'SCH-37330145',
  '37330145',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330145'
);

-- Insert if not exists: GPS GHILWAL (EMIS: 37330339)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS GHILWAL',
  'SCH-37330339',
  '37330339',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330339'
);

-- Insert if not exists: GPS KOLIAN GOHRU (EMIS: 37330371)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KOLIAN GOHRU',
  'SCH-37330371',
  '37330371',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330371'
);

-- Insert if not exists: GES MIANA MOHRA (EMIS: 37330377)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES MIANA MOHRA',
  'SCH-37330377',
  '37330377',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330377'
);

-- Insert if not exists: GPS PAPIAN (EMIS: 37330383)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS PAPIAN',
  'SCH-37330383',
  '37330383',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330383'
);

-- Insert if not exists: GES RAIKA MIRA (EMIS: 37330385)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES RAIKA MIRA',
  'SCH-37330385',
  '37330385',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330385'
);

-- Insert if not exists: GES THALLA KHURD (EMIS: 37330392)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES THALLA KHURD',
  'SCH-37330392',
  '37330392',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330392'
);

-- Insert if not exists: GPS ADHAWAL (EMIS: 37330393)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS ADHAWAL',
  'SCH-37330393',
  '37330393',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330393'
);

-- Insert if not exists: GES CHAK BELI KHAN (EMIS: 37330396)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES CHAK BELI KHAN',
  'SCH-37330396',
  '37330396',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAUNTRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330396'
);

-- Insert if not exists: GES JAWA (EMIS: 37330130)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES JAWA',
  'SCH-37330130',
  '37330130',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330130'
);

-- Insert if not exists: GES KURI KHUDA BUKSH (EMIS: 37330131)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES KURI KHUDA BUKSH',
  'SCH-37330131',
  '37330131',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330131'
);

-- Insert if not exists: GPS SHEIKH ZADA (EMIS: 37330266)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS SHEIKH ZADA',
  'SCH-37330266',
  '37330266',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330266'
);

-- Insert if not exists: GPS TAKHTI (EMIS: 37330267)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS TAKHTI',
  'SCH-37330267',
  '37330267',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330267'
);

-- Insert if not exists: GPS JHARKAY (EMIS: 37330273)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS JHARKAY',
  'SCH-37330273',
  '37330273',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330273'
);

-- Insert if not exists: GPS MIAN AHMEDA (EMIS: 37330280)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MIAN AHMEDA',
  'SCH-37330280',
  '37330280',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330280'
);

-- Insert if not exists: GES BAGH SANGRA (EMIS: 37330288)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES BAGH SANGRA',
  'SCH-37330288',
  '37330288',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330288'
);

-- Insert if not exists: GPS DHOK HAMMIT (EMIS: 37330298)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK HAMMIT',
  'SCH-37330298',
  '37330298',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330298'
);

-- Insert if not exists: GPS MALANA (EMIS: 37330302)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MALANA',
  'SCH-37330302',
  '37330302',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330302'
);

-- Insert if not exists: GPS UN PUR (EMIS: 37330303)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS UN PUR',
  'SCH-37330303',
  '37330303',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330303'
);

-- Insert if not exists: GPS GANDIAN (EMIS: 37330715)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS GANDIAN',
  'SCH-37330715',
  '37330715',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330715'
);

-- Insert if not exists: GPS POSTAL COLONY (EMIS: 37330218)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS POSTAL COLONY',
  'SCH-37330218',
  '37330218',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330218'
);

-- Insert if not exists: GPS WESTRIDGE-I (EMIS: 37330227)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS WESTRIDGE-I',
  'SCH-37330227',
  '37330227',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330227'
);

-- Insert if not exists: GES BANGUSH COLONY (EMIS: 37330201)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES BANGUSH COLONY',
  'SCH-37330201',
  '37330201',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330201'
);

-- Insert if not exists: GPS NEW PUBLIC RAWALPINDI (EMIS: 37330216)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS NEW PUBLIC RAWALPINDI',
  'SCH-37330216',
  '37330216',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330216'
);

-- Insert if not exists: GPS STANDARD MUSLIM (EMIS: 37330222)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS STANDARD MUSLIM',
  'SCH-37330222',
  '37330222',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330222'
);

-- Insert if not exists: GPS MC MOHALLAH WORKSHOPI RWP (EMIS: 37330231)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC MOHALLAH WORKSHOPI RWP',
  'SCH-37330231',
  '37330231',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330231'
);

-- Insert if not exists: GPS HAMIDIA (EMIS: 37330235)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS HAMIDIA',
  'SCH-37330235',
  '37330235',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330235'
);

-- Insert if not exists: GPS DHOK HASSO (EMIS: 37330205)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK HASSO',
  'SCH-37330205',
  '37330205',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330205'
);

-- Insert if not exists: GPS RATTA AMRAL (EMIS: 37330221)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS RATTA AMRAL',
  'SCH-37330221',
  '37330221',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330221'
);

-- Insert if not exists: GPS MC ARJAN NAGAR RWP (EMIS: 37330228)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC ARJAN NAGAR RWP',
  'SCH-37330228',
  '37330228',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330228'
);

-- Insert if not exists: GPS ISLAMIA RATTA (EMIS: 37330237)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS ISLAMIA RATTA',
  'SCH-37330237',
  '37330237',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330237'
);

-- Insert if not exists: GPS BAKRA MANDI (EMIS: 37330200)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS BAKRA MANDI',
  'SCH-37330200',
  '37330200',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330200'
);

-- Insert if not exists: GPS DHOK GUJRAN MISRIAL (EMIS: 37330204)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK GUJRAN MISRIAL',
  'SCH-37330204',
  '37330204',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330204'
);

-- Insert if not exists: GPS DHOK MISTRIAN (EMIS: 37330206)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK MISTRIAN',
  'SCH-37330206',
  '37330206',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330206'
);

-- Insert if not exists: GPS DHOKE SYEDAN (EMIS: 37330208)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOKE SYEDAN',
  'SCH-37330208',
  '37330208',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330208'
);

-- Insert if not exists: GPS DHOK ZIARAT (EMIS: 37330209)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK ZIARAT',
  'SCH-37330209',
  '37330209',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330209'
);

-- Insert if not exists: GPS TULSA (EMIS: 37330226)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS TULSA',
  'SCH-37330226',
  '37330226',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330226'
);

-- Insert if not exists: GES LAKHAN (EMIS: 37330241)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES LAKHAN',
  'SCH-37330241',
  '37330241',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330241'
);

-- Insert if not exists: GPS LIAQAT MODEL (EMIS: 37330242)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS LIAQAT MODEL',
  'SCH-37330242',
  '37330242',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330242'
);

-- Insert if not exists: GPS MOHRI GHAZAN (EMIS: 37330249)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MOHRI GHAZAN',
  'SCH-37330249',
  '37330249',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330249'
);

-- Insert if not exists: GES BAJNIAL (EMIS: 37330257)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES BAJNIAL',
  'SCH-37330257',
  '37330257',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330257'
);

-- Insert if not exists: GPS CHAKRA (EMIS: 37330258)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS CHAKRA',
  'SCH-37330258',
  '37330258',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330258'
);

-- Insert if not exists: GPS DHOK CHATTA (EMIS: 37330318)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS DHOK CHATTA',
  'SCH-37330318',
  '37330318',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330318'
);

-- Insert if not exists: GES MUSLIM GULSHAN ABAD (EMIS: 37330118)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GES MUSLIM GULSHAN ABAD',
  'SCH-37330118',
  '37330118',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330118'
);

-- Insert if not exists: GPS SHIMLA ISLAMIA RWP (EMIS: 37330121)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS SHIMLA ISLAMIA RWP',
  'SCH-37330121',
  '37330121',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330121'
);

-- Insert if not exists: GPS AMAR PURA (EMIS: 37330199)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS AMAR PURA',
  'SCH-37330199',
  '37330199',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330199'
);

-- Insert if not exists: GPS TAJ UL ISLAM (EMIS: 37330223)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS TAJ UL ISLAM',
  'SCH-37330223',
  '37330223',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330223'
);

-- Insert if not exists: GPS MC DHOK PARACHA (EMIS: 37330229)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC DHOK PARACHA',
  'SCH-37330229',
  '37330229',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330229'
);

-- Insert if not exists: GPS MC FEROZABAD (EMIS: 37330230)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC FEROZABAD',
  'SCH-37330230',
  '37330230',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330230'
);

-- Insert if not exists: GPS MC MUSLIM TOWN (EMIS: 37330234)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MC MUSLIM TOWN',
  'SCH-37330234',
  '37330234',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330234'
);

-- Insert if not exists: GPS IQBAL RAHIM TOWN (EMIS: 37330236)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS IQBAL RAHIM TOWN',
  'SCH-37330236',
  '37330236',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330236'
);

-- Insert if not exists: GPS KHAN ASGHAR MALL (EMIS: 37330240)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS KHAN ASGHAR MALL',
  'SCH-37330240',
  '37330240',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330240'
);

-- Insert if not exists: GPS MANZOOR MUSLIM (EMIS: 37330244)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MANZOOR MUSLIM',
  'SCH-37330244',
  '37330244',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330244'
);

-- Insert if not exists: GPS MILLAT ISLAMIA DHOK RAHEEM BAKHSH RAWALPINDI (EMIS: 37330245)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS MILLAT ISLAMIA DHOK RAHEEM BAKHSH RAWALPINDI',
  'SCH-37330245',
  '37330245',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330245'
);

-- Insert if not exists: GPS JHANGIR ABAD SAID GUL TOWN RWP (EMIS: 37330251)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GPS JHANGIR ABAD SAID GUL TOWN RWP',
  'SCH-37330251',
  '37330251',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SHAKRIAL' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330251'
);

-- Insert if not exists: GMPS PIAL (EMIS: 37330262)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS PIAL',
  'SCH-37330262',
  '37330262',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330262'
);

-- Insert if not exists: GGPS SUMBAL (EMIS: 37330507)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS SUMBAL',
  'SCH-37330507',
  '37330507',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330507'
);

-- Insert if not exists: GGPS KALIAM MUGHAL (EMIS: 37330513)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KALIAM MUGHAL',
  'SCH-37330513',
  '37330513',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330513'
);

-- Insert if not exists: GGPS MAIRA BHARTA (EMIS: 37330521)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MAIRA BHARTA',
  'SCH-37330521',
  '37330521',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330521'
);

-- Insert if not exists: GGPS CHANI ALAM SHER (EMIS: 37330529)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS CHANI ALAM SHER',
  'SCH-37330529',
  '37330529',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330529'
);

-- Insert if not exists: GGPS GOHRA BARATA (IASP) (EMIS: 37330542)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS GOHRA BARATA (IASP)',
  'SCH-37330542',
  '37330542',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330542'
);

-- Insert if not exists: GGPS BAGGA SHEIKHAN # 1 (EMIS: 37330548)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS BAGGA SHEIKHAN # 1',
  'SCH-37330548',
  '37330548',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330548'
);

-- Insert if not exists: GGPS BAGGA SANGRAL (EMIS: 37330549)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS BAGGA SANGRAL',
  'SCH-37330549',
  '37330549',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330549'
);

-- Insert if not exists: GGPS No. 2 BAGGA SHEIKHAN (EMIS: 37330704)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS No. 2 BAGGA SHEIKHAN',
  'SCH-37330704',
  '37330704',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330704'
);

-- Insert if not exists: GGES HARRAKA (EMIS: 37330553)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES HARRAKA',
  'SCH-37330553',
  '37330553',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BAGGA SHEIKHAN' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330553'
);

-- Insert if not exists: GMPS BARWALA (EMIS: 37330300)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS BARWALA',
  'SCH-37330300',
  '37330300',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330300'
);

-- Insert if not exists: GMPS SAGRI (EMIS: 37330504)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS SAGRI',
  'SCH-37330504',
  '37330504',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330504'
);

-- Insert if not exists: GMPS LOHDRA (EMIS: 37330519)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS LOHDRA',
  'SCH-37330519',
  '37330519',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330519'
);

-- Insert if not exists: GGPS CHATRO (EMIS: 37330530)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS CHATRO',
  'SCH-37330530',
  '37330530',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330530'
);

-- Insert if not exists: GGPS GHORA RAMIAL (EMIS: 37330531)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS GHORA RAMIAL',
  'SCH-37330531',
  '37330531',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330531'
);

-- Insert if not exists: GGPS DADHAR NAJJAR (EMIS: 37330532)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DADHAR NAJJAR',
  'SCH-37330532',
  '37330532',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330532'
);

-- Insert if not exists: GMPS DAWRI (EMIS: 37330534)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS DAWRI',
  'SCH-37330534',
  '37330534',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330534'
);

-- Insert if not exists: GMPS ABAN CHAK (EMIS: 37330547)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS ABAN CHAK',
  'SCH-37330547',
  '37330547',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330547'
);

-- Insert if not exists: GGCMS MOHRI KHAMBAL (EMIS: 37330556)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGCMS MOHRI KHAMBAL',
  'SCH-37330556',
  '37330556',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330556'
);

-- Insert if not exists: GGES ARAZI SOHAL (EMIS: 37330172)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES ARAZI SOHAL',
  'SCH-37330172',
  '37330172',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330172'
);

-- Insert if not exists: GGES DADHOCHA (EMIS: 37330175)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DADHOCHA',
  'SCH-37330175',
  '37330175',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330175'
);

-- Insert if not exists: GGES DHAKALA (EMIS: 37330176)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHAKALA',
  'SCH-37330176',
  '37330176',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330176'
);

-- Insert if not exists: GGES JHUMMAT MUGHAL (EMIS: 37330512)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES JHUMMAT MUGHAL',
  'SCH-37330512',
  '37330512',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330512'
);

-- Insert if not exists: GMPS MOHRA BHATAN (EMIS: 37330281)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS MOHRA BHATAN',
  'SCH-37330281',
  '37330281',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'LOHDRAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330281'
);

-- Insert if not exists: GMPS GAHI SYEDAN (EMIS: 37330325)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS GAHI SYEDAN',
  'SCH-37330325',
  '37330325',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330325'
);

-- Insert if not exists: GMPS GANG (EMIS: 37330327)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS GANG',
  'SCH-37330327',
  '37330327',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330327'
);

-- Insert if not exists: GMPS GHELLA KHURD (EMIS: 37330362)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS GHELLA KHURD',
  'SCH-37330362',
  '37330362',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330362'
);

-- Insert if not exists: GMPS HARNIALI SYEDAN (EMIS: 37330364)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS HARNIALI SYEDAN',
  'SCH-37330364',
  '37330364',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330364'
);

-- Insert if not exists: GMPS DHANDI GUJRAN (EMIS: 37330400)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS DHANDI GUJRAN',
  'SCH-37330400',
  '37330400',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330400'
);

-- Insert if not exists: GGPS TATRAL (EMIS: 37330657)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS TATRAL',
  'SCH-37330657',
  '37330657',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330657'
);

-- Insert if not exists: GGES MOHRA (EMIS: 37330380)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES MOHRA',
  'SCH-37330380',
  '37330380',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330380'
);

-- Insert if not exists: GGES DHERI (EMIS: 37330634)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHERI',
  'SCH-37330634',
  '37330634',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330634'
);

-- Insert if not exists: GGES GHELLA KALAN (EMIS: 37330643)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES GHELLA KALAN',
  'SCH-37330643',
  '37330643',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330643'
);

-- Insert if not exists: GMPS JASWAL (EMIS: 37330661)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS JASWAL',
  'SCH-37330661',
  '37330661',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAKRI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330661'
);

-- Insert if not exists: GMPS Kali Pari (EMIS: 37330369)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Kali Pari',
  'SCH-37330369',
  '37330369',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330369'
);

-- Insert if not exists: GGPS Unpur (EMIS: 37330511)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Unpur',
  'SCH-37330511',
  '37330511',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330511'
);

-- Insert if not exists: GGPS Kharakan (EMIS: 37330515)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Kharakan',
  'SCH-37330515',
  '37330515',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330515'
);

-- Insert if not exists: GGPS Khinger Kalan (EMIS: 37330516)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Khinger Kalan',
  'SCH-37330516',
  '37330516',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330516'
);

-- Insert if not exists: GGPS Lilakamalpur (EMIS: 37330518)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Lilakamalpur',
  'SCH-37330518',
  '37330518',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330518'
);

-- Insert if not exists: GGPS Dhudian (EMIS: 37330538)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Dhudian',
  'SCH-37330538',
  '37330538',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330538'
);

-- Insert if not exists: GGPS Ferozy (EMIS: 37330539)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Ferozy',
  'SCH-37330539',
  '37330539',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330539'
);

-- Insert if not exists: GMPS Gangal (EMIS: 37330540)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Gangal',
  'SCH-37330540',
  '37330540',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330540'
);

-- Insert if not exists: GGES Jabber Miana (EMIS: 37330129)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Jabber Miana',
  'SCH-37330129',
  '37330129',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330129'
);

-- Insert if not exists: GGES Dhoke Budhal (EMIS: 37330537)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Dhoke Budhal',
  'SCH-37330537',
  '37330537',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330537'
);

-- Insert if not exists: GGES Hoshial (EMIS: 37330554)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Hoshial',
  'SCH-37330554',
  '37330554',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330554'
);

-- Insert if not exists: GGES Mohra (EMIS: 37330629)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Mohra',
  'SCH-37330629',
  '37330629',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330629'
);

-- Insert if not exists: GGES Nikrali (EMIS: 37330706)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Nikrali',
  'SCH-37330706',
  '37330706',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'JHATTA HATHIAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330706'
);

-- Insert if not exists: GMPS HAKIMAL (EMIS: 37330363)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS HAKIMAL',
  'SCH-37330363',
  '37330363',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330363'
);

-- Insert if not exists: GMPS JHANGI DAIM (EMIS: 37330368)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS JHANGI DAIM',
  'SCH-37330368',
  '37330368',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330368'
);

-- Insert if not exists: GMPS PINDORI (EMIS: 37330384)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS PINDORI',
  'SCH-37330384',
  '37330384',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330384'
);

-- Insert if not exists: GMPS RUPPER KHURD (EMIS: 37330388)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS RUPPER KHURD',
  'SCH-37330388',
  '37330388',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330388'
);

-- Insert if not exists: GGPS DK ALI BHADUR (EMIS: 37330639)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DK ALI BHADUR',
  'SCH-37330639',
  '37330639',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330639'
);

-- Insert if not exists: GMPS DK BHATIAN (EMIS: 37330640)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS DK BHATIAN',
  'SCH-37330640',
  '37330640',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330640'
);

-- Insert if not exists: GGMPS THALLA KALAN (EMIS: 37330658)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGMPS THALLA KALAN',
  'SCH-37330658',
  '37330658',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330658'
);

-- Insert if not exists: GMPS MEHMOODA (EMIS: 37330667)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS MEHMOODA',
  'SCH-37330667',
  '37330667',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330667'
);

-- Insert if not exists: GGES BAINS (EMIS: 37330411)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES BAINS',
  'SCH-37330411',
  '37330411',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330411'
);

-- Insert if not exists: GGES THALLA KHURD (EMIS: 37330659)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES THALLA KHURD',
  'SCH-37330659',
  '37330659',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHAK BELI KHAN FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330659'
);

-- Insert if not exists: GMPS Las Mali (EMIS: 37330374)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Las Mali',
  'SCH-37330374',
  '37330374',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330374'
);

-- Insert if not exists: GMPS Guggan (EMIS: 37330409)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Guggan',
  'SCH-37330409',
  '37330409',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330409'
);

-- Insert if not exists: GMPS Talla Bajar (EMIS: 37330390)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Talla Bajar',
  'SCH-37330390',
  '37330390',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330390'
);

-- Insert if not exists: GGPS Hoon (EMIS: 37330649)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Hoon',
  'SCH-37330649',
  '37330649',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330649'
);

-- Insert if not exists: GMPS Gangal (EMIS: 37330410)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Gangal',
  'SCH-37330410',
  '37330410',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330410'
);

-- Insert if not exists: GMPS Chokar (EMIS: 37330633)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Chokar',
  'SCH-37330633',
  '37330633',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330633'
);

-- Insert if not exists: GMPS Dhok Adrana (EMIS: 37330638)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Dhok Adrana',
  'SCH-37330638',
  '37330638',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330638'
);

-- Insert if not exists: GMPS Khabba Barala (EMIS: 37330370)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Khabba Barala',
  'SCH-37330370',
  '37330370',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330370'
);

-- Insert if not exists: GMPS Chak Sigho (EMIS: 37330397)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Chak Sigho',
  'SCH-37330397',
  '37330397',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330397'
);

-- Insert if not exists: GGES Dhok Mureed (EMIS: 37330637)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Dhok Mureed',
  'SCH-37330637',
  '37330637',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330637'
);

-- Insert if not exists: GGES Bodial (EMIS: 37330621)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Bodial',
  'SCH-37330621',
  '37330621',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330621'
);

-- Insert if not exists: GGES Salmoon (EMIS: 37330389)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Salmoon',
  'SCH-37330389',
  '37330389',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'CHOUNTRA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330389'
);

-- Insert if not exists: GGES Mohri Khattran (EMIS: 37330585)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Mohri Khattran',
  'SCH-37330585',
  '37330585',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330585'
);

-- Insert if not exists: GGES GULAM SARWAR BRITISH HOMES (EMIS: 37330717)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES GULAM SARWAR BRITISH HOMES',
  'SCH-37330717',
  '37330717',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330717'
);

-- Insert if not exists: GGPS Berket (EMIS: 37330618)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Berket',
  'SCH-37330618',
  '37330618',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330618'
);

-- Insert if not exists: GMPS Dhumma (EMIS: 37330608)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Dhumma',
  'SCH-37330608',
  '37330608',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330608'
);

-- Insert if not exists: GMPS Gurbal (EMIS: 37330342)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Gurbal',
  'SCH-37330342',
  '37330342',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330342'
);

-- Insert if not exists: GMPS Pind Ranjha (EMIS: 37330255)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Pind Ranjha',
  'SCH-37330255',
  '37330255',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330255'
);

-- Insert if not exists: GGPS Chakara (EMIS: 37330598)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Chakara',
  'SCH-37330598',
  '37330598',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330598'
);

-- Insert if not exists: GGPS Lakhoo (EMIS: 37330576)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Lakhoo',
  'SCH-37330576',
  '37330576',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330576'
);

-- Insert if not exists: GMPS Jattal (EMIS: 37330345)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Jattal',
  'SCH-37330345',
  '37330345',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330345'
);

-- Insert if not exists: GMPS Pind Malhu (EMIS: 37330331)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Pind Malhu',
  'SCH-37330331',
  '37330331',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330331'
);

-- Insert if not exists: GMPS Jhandu Syedan (EMIS: 37330346)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Jhandu Syedan',
  'SCH-37330346',
  '37330346',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330346'
);

-- Insert if not exists: GMPS Dhok Chehr (EMIS: 37330606)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Dhok Chehr',
  'SCH-37330606',
  '37330606',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SADDAR BERONI' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330606'
);

-- Insert if not exists: GGPS DHOK MALKAN (EMIS: 37330607)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DHOK MALKAN',
  'SCH-37330607',
  '37330607',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330607'
);

-- Insert if not exists: GMPS BAGRA SYEDAN (EMIS: 37330256)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS BAGRA SYEDAN',
  'SCH-37330256',
  '37330256',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330256'
);

-- Insert if not exists: GMPS JADA (EMIS: 37330613)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS JADA',
  'SCH-37330613',
  '37330613',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330613'
);

-- Insert if not exists: GGES MUJAHID (EMIS: 37330587)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES MUJAHID',
  'SCH-37330587',
  '37330587',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330587'
);

-- Insert if not exists: GGES PIND HABTAL  RAWALPINDI (EMIS: 37330612)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES PIND HABTAL  RAWALPINDI',
  'SCH-37330612',
  '37330612',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330612'
);

-- Insert if not exists: GGES DHOKE CHACH (EMIS: 37330605)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHOKE CHACH',
  'SCH-37330605',
  '37330605',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'SIHAL FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330605'
);

-- Insert if not exists: GGES MERA Mohra (EMIS: 37330524)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES MERA Mohra',
  'SCH-37330524',
  '37330524',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330524'
);

-- Insert if not exists: GGES Jharaki (EMIS: 37330555)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Jharaki',
  'SCH-37330555',
  '37330555',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330555'
);

-- Insert if not exists: GGES Banda (EMIS: 37330551)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Banda',
  'SCH-37330551',
  '37330551',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330551'
);

-- Insert if not exists: Gges Mujahid Gangal (EMIS: 37330179)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Gges Mujahid Gangal',
  'SCH-37330179',
  '37330179',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330179'
);

-- Insert if not exists: Ggps sarhdnay (EMIS: 37330505)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Ggps sarhdnay',
  'SCH-37330505',
  '37330505',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330505'
);

-- Insert if not exists: Ggps Jabber Dervaish (EMIS: 37330546)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Ggps Jabber Dervaish',
  'SCH-37330546',
  '37330546',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330546'
);

-- Insert if not exists: GMPS Saffair (EMIS: 37330263)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Saffair',
  'SCH-37330263',
  '37330263',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330263'
);

-- Insert if not exists: Ggps Darogha Hassan Ali (EMIS: 37330544)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Ggps Darogha Hassan Ali',
  'SCH-37330544',
  '37330544',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330544'
);

-- Insert if not exists: Ggps Timber ratial (EMIS: 37330509)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Ggps Timber ratial',
  'SCH-37330509',
  '37330509',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330509'
);

-- Insert if not exists: GMPS samlal (EMIS: 37330264)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS samlal',
  'SCH-37330264',
  '37330264',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330264'
);

-- Insert if not exists: GMPS WARYAMA (EMIS: 37330546)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS WARYAMA',
  'SCH-37330546',
  '37330546',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330546'
);

-- Insert if not exists: GGPS Mari Bangial (EMIS: 37330522)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Mari Bangial',
  'SCH-37330522',
  '37330522',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330522'
);

-- Insert if not exists: GGPS Mohra sowian (EMIS: 37330527)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Mohra sowian',
  'SCH-37330527',
  '37330527',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330527'
);

-- Insert if not exists: Ggps sarhandi (EMIS: 37330497)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'Ggps sarhandi',
  'SCH-37330497',
  '37330497',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'BASSALI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330497'
);

-- Insert if not exists: GGES KOTHA KALLAN (EMIS: 37330561)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES KOTHA KALLAN',
  'SCH-37330561',
  '37330561',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330561'
);

-- Insert if not exists: GGES JAIL COLONY (EMIS: 37330614)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES JAIL COLONY',
  'SCH-37330614',
  '37330614',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330614'
);

-- Insert if not exists: GMPS KHINGER (EMIS: 37330351)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS KHINGER',
  'SCH-37330351',
  '37330351',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330351'
);

-- Insert if not exists: GGPS KALAS (EMIS: 37330568)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KALAS',
  'SCH-37330568',
  '37330568',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330568'
);

-- Insert if not exists: GGPS KHASALA KHURD (EMIS: 37330571)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KHASALA KHURD',
  'SCH-37330571',
  '37330571',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330571'
);

-- Insert if not exists: GGPS KOHALA KALLAN (EMIS: 37330572)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KOHALA KALLAN',
  'SCH-37330572',
  '37330572',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330572'
);

-- Insert if not exists: GGPS KOHALA SYEDAN (EMIS: 37330573)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KOHALA SYEDAN',
  'SCH-37330573',
  '37330573',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330573'
);

-- Insert if not exists: GMPS LADIAN (EMIS: 37330574)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS LADIAN',
  'SCH-37330574',
  '37330574',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330574'
);

-- Insert if not exists: GGPS MAIRA KHURD (EMIS: 37330583)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MAIRA KHURD',
  'SCH-37330583',
  '37330583',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330583'
);

-- Insert if not exists: GGPS MORGAH (EMIS: 37330586)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MORGAH',
  'SCH-37330586',
  '37330586',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330586'
);

-- Insert if not exists: GGPS DK KAMMAN KHAN (EMIS: 37330604)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DK KAMMAN KHAN',
  'SCH-37330604',
  '37330604',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330604'
);

-- Insert if not exists: GGPS DK BABA (EMIS: 37330708)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DK BABA',
  'SCH-37330708',
  '37330708',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330708'
);

-- Insert if not exists: GGES DHOKE KALA KHAN (EMIS: 37330599)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHOKE KALA KHAN',
  'SCH-37330599',
  '37330599',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330599'
);

-- Insert if not exists: GGES New Sarfraz Road Rwp (EMIS: 37330157)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES New Sarfraz Road Rwp',
  'SCH-37330157',
  '37330157',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330157'
);

-- Insert if not exists: GGES DHOKE PARACHA (EMIS: 37330455)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHOKE PARACHA',
  'SCH-37330455',
  '37330455',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330455'
);

-- Insert if not exists: GGES Murree Road Rawalpindi (EMIS: 37330161)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Murree Road Rawalpindi',
  'SCH-37330161',
  '37330161',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330161'
);

-- Insert if not exists: GGPS Rehmania (EMIS: 37330473)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Rehmania',
  'SCH-37330473',
  '37330473',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330473'
);

-- Insert if not exists: GGPS MC bangush colony (EMIS: 37330451)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MC bangush colony',
  'SCH-37330451',
  '37330451',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330451'
);

-- Insert if not exists: GGPS Carriage Factory (EMIS: 37330433)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Carriage Factory',
  'SCH-37330433',
  '37330433',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330433'
);

-- Insert if not exists: GGPS MC Dhoke hassu (EMIS: 37330452)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MC Dhoke hassu',
  'SCH-37330452',
  '37330452',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330452'
);

-- Insert if not exists: MC GGPS ward 28 Ratta Amral (EMIS: 37330458)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'MC GGPS ward 28 Ratta Amral',
  'SCH-37330458',
  '37330458',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330458'
);

-- Insert if not exists: GGPS  Mangtal 1 (EMIS: 37330440)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS  Mangtal 1',
  'SCH-37330440',
  '37330440',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330440'
);

-- Insert if not exists: GGPS Akhtar 
islamia (EMIS: 37330150)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Akhtar 
islamia',
  'SCH-37330150',
  '37330150',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330150'
);

-- Insert if not exists: MC GGPS Chittian Hattian (EMIS: 37330459)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'MC GGPS Chittian Hattian',
  'SCH-37330459',
  '37330459',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330459'
);

-- Insert if not exists: GGPS MC PIR WADHAL (EMIS: 37330454)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MC PIR WADHAL',
  'SCH-37330454',
  '37330454',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330454'
);

-- Insert if not exists: GGPS NEW PHAGWARI (EMIS: 37330457)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS NEW PHAGWARI',
  'SCH-37330457',
  '37330457',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330457'
);

-- Insert if not exists: MC GGPS DK hukamdad (EMIS: 37330453)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'MC GGPS DK hukamdad',
  'SCH-37330453',
  '37330453',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330453'
);

-- Insert if not exists: GGES DHUDHUMBER (EMIS: 37330630)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES DHUDHUMBER',
  'SCH-37330630',
  '37330630',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330630'
);

-- Insert if not exists: GGES GANGAWALA (EMIS: 37330610)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES GANGAWALA',
  'SCH-37330610',
  '37330610',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330610'
);

-- Insert if not exists: GGPS KHILRI (EMIS: 37330569)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS KHILRI',
  'SCH-37330569',
  '37330569',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330569'
);

-- Insert if not exists: GMPS BILAWAL (EMIS: 37330620)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS BILAWAL',
  'SCH-37330620',
  '37330620',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330620'
);

-- Insert if not exists: GMPS CHAKRAN (EMIS: 37330599)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS CHAKRAN',
  'SCH-37330599',
  '37330599',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330599'
);

-- Insert if not exists: GMPS CHOORA (EMIS: 37330314)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS CHOORA',
  'SCH-37330314',
  '37330314',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330314'
);

-- Insert if not exists: GMPS MALUKAL (EMIS: 37330580)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS MALUKAL',
  'SCH-37330580',
  '37330580',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'KOLLIAN HAMEED' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330580'
);

-- Insert if not exists: GGES Naseerabad (EMIS: 37330461)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Naseerabad',
  'SCH-37330461',
  '37330461',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330461'
);

-- Insert if not exists: GGES Shoukat Saddar (EMIS: 37330165)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Shoukat Saddar',
  'SCH-37330165',
  '37330165',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330165'
);

-- Insert if not exists: GGES No  2 Siham (EMIS: 37330479)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES No  2 Siham',
  'SCH-37330479',
  '37330479',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330479'
);

-- Insert if not exists: GGES Anwarulislam kamalabad (EMIS: 37330151)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Anwarulislam kamalabad',
  'SCH-37330151',
  '37330151',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330151'
);

-- Insert if not exists: GGPS Dohk Ziarat (EMIS: 37330710)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Dohk Ziarat',
  'SCH-37330710',
  '37330710',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330710'
);

-- Insert if not exists: GGPS ARIYA MOHALLAH (EMIS: 37330450)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS ARIYA MOHALLAH',
  'SCH-37330450',
  '37330450',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330450'
);

-- Insert if not exists: GGPS Jhawra (EMIS: 37330488)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Jhawra',
  'SCH-37330488',
  '37330488',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330488'
);

-- Insert if not exists: GGPS liaqat colony (EMIS: 37330578)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS liaqat colony',
  'SCH-37330578',
  '37330578',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330578'
);

-- Insert if not exists: GGPS MC chamanzar (EMIS: 37330446)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS MC chamanzar',
  'SCH-37330446',
  '37330446',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330446'
);

-- Insert if not exists: GGPS Mohra Tullah (EMIS: 37330584)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Mohra Tullah',
  'SCH-37330584',
  '37330584',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330584'
);

-- Insert if not exists: GGPS JORIAN (EMIS: 37330565)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS JORIAN',
  'SCH-37330565',
  '37330565',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330565'
);

-- Insert if not exists: GGPS DK Rahim baksh (EMIS: 37330443)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS DK Rahim baksh',
  'SCH-37330443',
  '37330443',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330443'
);

-- Insert if not exists: GGPS Lakhan (EMIS: 37330575)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Lakhan',
  'SCH-37330575',
  '37330575',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330575'
);

-- Insert if not exists: GGPS BANDA NAGIAL (EMIS: 37330709)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS BANDA NAGIAL',
  'SCH-37330709',
  '37330709',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RWP CANTT FEMALE' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330709'
);

-- Insert if not exists: GGPS Raika Maira (EMIS: 37330654)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGPS Raika Maira',
  'SCH-37330654',
  '37330654',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330654'
);

-- Insert if not exists: GMPS JARA (EMIS: 37330366)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS JARA',
  'SCH-37330366',
  '37330366',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330366'
);

-- Insert if not exists: GMPS MOJHANG (EMIS: 37330381)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS MOJHANG',
  'SCH-37330381',
  '37330381',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330381'
);

-- Insert if not exists: GMPS Banian (EMIS: 37330623)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GMPS Banian',
  'SCH-37330623',
  '37330623',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330623'
);

-- Insert if not exists: GGES KARAHI (EMIS: 37330195)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES KARAHI',
  'SCH-37330195',
  '37330195',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330195'
);

-- Insert if not exists: GGES Dhoke Gujri (EMIS: 37330627)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Dhoke Gujri',
  'SCH-37330627',
  '37330627',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330627'
);

-- Insert if not exists: GGES Misrial (EMIS: 37330669)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Misrial',
  'SCH-37330669',
  '37330669',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330669'
);

-- Insert if not exists: GGES Kurar (EMIS: 37330664)
INSERT INTO schools (
  id, name, code, emis_number, cluster_id, district_id, markaz_id,
  address, created_at,
  total_students, present_students, absent_students,
  total_teachers, present_teachers, absent_teachers,
  total_toilets, working_toilets, broken_toilets,
  is_drinking_water_available
)
SELECT
  gen_random_uuid(),
  'GGES Kurar',
  'SCH-37330664',
  '37330664',
  (SELECT id FROM clusters WHERE code = 'RWP-C' LIMIT 1),
  (SELECT id FROM districts WHERE code = 'RWP' LIMIT 1),
  (SELECT id FROM markazes WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'RAIKAMAIRA' LIMIT 1),
  'Rawalpindi, Pakistan',
  NOW(),
  0, 0, 0, 0, 0, 0, 0, 0, 0, false
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE emis_number = '37330664'
);


-- ============================================
-- COMMIT TRANSACTION
-- ============================================
-- All updates complete. Committing transaction.
-- If there were any errors, the transaction would have rolled back.
-- ============================================

COMMIT;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these after the transaction commits to verify success
-- ============================================

-- Check total school count
SELECT COUNT(*) as total_schools FROM schools;

-- Check sample schools
SELECT emis_number, name, markaz_id
FROM schools
WHERE emis_number IN ('37330250', '37330254', '37330305', '37330307', '37330309')
ORDER BY emis_number;

-- Check for any mismatched schoolName in users table
SELECT COUNT(*) as mismatched_count
FROM users u
JOIN schools s ON u.school_id = s.id
WHERE u.school_name != s.name;
-- Expected: 0 (all should match)

-- ============================================
-- END OF SCRIPT
-- ============================================
