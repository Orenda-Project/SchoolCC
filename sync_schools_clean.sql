-- ============================================
-- School Data Sync from Excel Files (Clean Version)
-- ============================================
-- Generated: 2026-02-02
-- Total schools: 260
-- Source: Male and Female AEO school lists
--
-- WARNING: This will update school names and markaz assignments
-- in the schools table AND cascade updates to all dependent tables.
--
-- Note: Drizzle Studio automatically wraps queries in transactions
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

-- ============================================
-- PART 2: CASCADE UPDATE dependent tables
-- ============================================

-- Update users.school_name
UPDATE users
SET school_name = (
  SELECT name FROM schools WHERE id = users.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update request_assignees.school_name
UPDATE request_assignees
SET school_name = (
  SELECT name FROM schools WHERE id = request_assignees.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update teacher_leaves.school_name
UPDATE teacher_leaves
SET school_name = (
  SELECT name FROM schools WHERE id = teacher_leaves.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update visit_logs.school_name
UPDATE visit_logs
SET school_name = (
  SELECT name FROM schools WHERE id = visit_logs.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update school_albums.school_name
UPDATE school_albums
SET school_name = (
  SELECT name FROM schools WHERE id = school_albums.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update monitoring_visits.school_name
UPDATE monitoring_visits
SET school_name = (
  SELECT name FROM schools WHERE id = monitoring_visits.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update mentoring_visits.school_name
UPDATE mentoring_visits
SET school_name = (
  SELECT name FROM schools WHERE id = mentoring_visits.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update visit_sessions.school_name
UPDATE visit_sessions
SET school_name = (
  SELECT name FROM schools WHERE id = visit_sessions.school_id
)
WHERE school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- Update queries.sender_school_name
UPDATE queries
SET sender_school_name = (
  SELECT name FROM schools WHERE id = queries.sender_school_id
)
WHERE sender_school_id IN (
  SELECT id FROM schools WHERE emis_number IN (
    '37330250', '37330254', '37330305', '37330307', '37330309', '37330315', '37330317', '37330335',
    '37330349', '37330350', '37330687', '37330125', '37330128', '37330132', '37330271', '37330275',
    '37330283', '37330284', '37330285', '37330289', '37330292', '37330293', '37330294', '37330295'
  )
);

-- ============================================
-- END OF SCRIPT
-- ============================================
