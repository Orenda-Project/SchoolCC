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

