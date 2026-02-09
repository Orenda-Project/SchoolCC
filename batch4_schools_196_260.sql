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
