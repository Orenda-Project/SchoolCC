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

