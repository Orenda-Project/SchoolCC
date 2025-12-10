// Real schools and AEOs data for the system

export const realSchools = [
  { emisNumber: '37330227', name: 'GGPS Chakra', code: 'SCH-001' },
  { emisNumber: '37330433', name: 'GGPS Carriage Factory', code: 'SCH-002' },
  { emisNumber: '37330130', name: 'GES JAWA', code: 'SCH-003' },
  { emisNumber: '37330322', name: 'GGPS Dhok Munshi', code: 'SCH-004' },
  { emisNumber: '37330209', name: 'GBPS Dhoke Ziarat', code: 'SCH-005' },
  { emisNumber: '37330172', name: 'GPS MILLAT ISLAMIA', code: 'SCH-006' },
  { emisNumber: '37330598', name: 'GGPS Westridge 1', code: 'SCH-007' },
  { emisNumber: '37330317', name: 'GPS DHAMIAL', code: 'SCH-008' },
  { emisNumber: '37330172-A', name: 'GGPS ARAZI SOHAL', code: 'SCH-009' }, // Note: Duplicate EMIS, added suffix
  { emisNumber: '37330612', name: 'GGES Pind Habtal', code: 'SCH-010' },
  { emisNumber: '37330410', name: 'GMPS Khabba Barala', code: 'SCH-011' },
  { emisNumber: '37330312', name: 'GPS CHAK DENAL', code: 'SCH-012' },
  { emisNumber: '37330383', name: 'GPS REHMATABAD', code: 'SCH-013' },
  { emisNumber: '37330151', name: 'GGES Anwar ul Islam Kamalabad', code: 'SCH-014' },
  { emisNumber: '37330561', name: 'GGES Kotha Kallan', code: 'SCH-015' },
  { emisNumber: '37330627', name: 'GGPS RAIKA MAIRA', code: 'SCH-016' },
];

export const realAEOs = [
  { name: 'Abdul Mateen Mughal', area: 'Jhatha Hathial', gender: 'Male', phoneNumber: '03001000001' },
  { name: 'Abdullah Raheem', area: 'Chountra', gender: 'Female', phoneNumber: '03001000002' },
  { name: 'Amir Aqeel Shah', area: 'RWP Cantt', gender: 'Male', phoneNumber: '03001000003' },
  { name: 'Muhammad Asif Jabbar', area: 'Adjala', gender: 'Male', phoneNumber: '03001000004' },
  { name: 'Muhammad Atif Minhas', area: 'Chakri', gender: 'Male', phoneNumber: '03001000005' },
  { name: 'Atiqa Tariq', area: 'Saddar Beroni', gender: 'Female', phoneNumber: '03001000006' },
  { name: 'Malik Nadeem Sultan', area: 'Raika Maira', gender: 'Female', phoneNumber: '03001000007' },
  { name: 'Nighat Noreen', area: 'RWP Cantt', gender: 'Female', phoneNumber: '03001000008' },
  { name: 'Rabia Rauf', area: 'Lodhran', gender: 'Female', phoneNumber: '03001000009' },
  { name: 'Sania Naseem', area: 'Pir Wadhai', gender: 'Female', phoneNumber: '03001000010' },
  { name: 'Sheraz Hussain', area: 'Chaklala', gender: 'Male', phoneNumber: '03001000011' },
  { name: 'Tasneem Shehzadi', area: 'Adyala', gender: 'Female', phoneNumber: '03001000012' },
  { name: 'Tauqeer Akbar', area: 'Chauntra', gender: 'Male', phoneNumber: '03001000013' },
  { name: 'Waheed Ahmed Butt', area: 'Shakrial', gender: 'Male', phoneNumber: '03001000014' },
  { name: 'Waseem Ashraf', area: 'Pir Wadhai', gender: 'Male', phoneNumber: '03001000015' },
  { name: 'Saima Bibi', area: 'Test Markaz', gender: 'Female', phoneNumber: '03001000016' },
];

// Map AEOs to clusters based on their areas
export const aeoClusterMapping = {
  'Jhatha Hathial': 'cluster-1',
  'Chountra': 'cluster-2',
  'RWP Cantt': 'cluster-3',
  'Adjala': 'cluster-4',
  'Chakri': 'cluster-5',
  'Saddar Beroni': 'cluster-6',
  'Raika Maira': 'cluster-7',
  'Lodhran': 'cluster-8',
  'Pir Wadhai': 'cluster-9',
  'Chaklala': 'cluster-10',
  'Adyala': 'cluster-11',
  'Shakrial': 'cluster-12',
  'Test Markaz': 'cluster-13',
};

// Map schools to clusters (for now, distribute them across clusters)
// You can update this mapping based on actual cluster assignments
export const schoolClusterMapping: Record<string, string> = {
  '37330227': 'cluster-1', // GGPS Chakra
  '37330433': 'cluster-2', // GGPS Carriage Factory
  '37330130': 'cluster-3', // GES JAWA
  '37330322': 'cluster-4', // GGPS Dhok Munshi
  '37330209': 'cluster-5', // GBPS Dhoke Ziarat
  '37330172': 'cluster-6', // GPS MILLAT ISLAMIA
  '37330598': 'cluster-7', // GGPS Westridge 1
  '37330317': 'cluster-8', // GPS DHAMIAL
  '37330172-A': 'cluster-9', // GGPS ARAZI SOHAL
  '37330612': 'cluster-10', // GGES Pind Habtal
  '37330410': 'cluster-11', // GMPS Khabba Barala
  '37330312': 'cluster-12', // GPS CHAK DENAL
  '37330383': 'cluster-13', // GPS REHMATABAD
  '37330151': 'cluster-1', // GGES Anwar ul Islam Kamalabad
  '37330561': 'cluster-2', // GGES Kotha Kallan
  '37330627': 'cluster-3', // GGPS RAIKA MAIRA
};
