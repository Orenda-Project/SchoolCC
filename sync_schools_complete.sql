-- ============================================
-- Complete School Data Sync from Excel Files
-- ============================================
-- Generated: 2026-02-06
-- Total schools: 260
-- Source: Male (103) and Female (157) school lists
--
-- This will update school names and markaz assignments
-- ============================================

-- ============================================
-- Male Schools
-- Total schools: 103
-- ============================================

-- Update: GPS HAYAL. (EMIS: 37330250)
UPDATE schools
SET name = 'GPS HAYAL.',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'ADYALA.'
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
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI.'
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
-- Female Schools
-- Total schools: 157
-- ============================================

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

-- Update: GGES PIND HABTAL RAWALPINDI (EMIS: 37330612)
UPDATE schools
SET name = 'GGES PIND HABTAL RAWALPINDI',
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

-- Update: GGPS Mangtal 1 (EMIS: 37330440)
UPDATE schools
SET name = 'GGPS Mangtal 1',
    markaz_id = (
      SELECT id FROM markazes
      WHERE UPPER(TRIM(REGEXP_REPLACE(name, '\.+$', ''))) = 'PIR WADHAI FEMALE'
      LIMIT 1
    )
WHERE emis_number = '37330440';

-- Update: GGPS Akhtar islamia (EMIS: 37330150)
UPDATE schools
SET name = 'GGPS Akhtar islamia',
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

-- Update: GGES No 2 Siham (EMIS: 37330479)
UPDATE schools
SET name = 'GGES No 2 Siham',
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

