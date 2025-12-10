// Real schools and AEOs data for the system

export interface RealSchool {
  emisNumber: string;
  name: string;
  code: string;
  clusterId?: string;
  districtId?: string;
}

export interface RealAEO {
  id: string;
  name: string;
  area: string;
  gender: string;
  phoneNumber: string;
  role: 'AEO';
  clusterId?: string;
}

export const realSchools: RealSchool[] = [
  { emisNumber: '37330227', name: 'GGPS Chakra', code: 'SCH-001', clusterId: 'cluster-1', districtId: 'district-1' },
  { emisNumber: '37330433', name: 'GGPS Carriage Factory', code: 'SCH-002', clusterId: 'cluster-2', districtId: 'district-1' },
  { emisNumber: '37330130', name: 'GES JAWA', code: 'SCH-003', clusterId: 'cluster-3', districtId: 'district-1' },
  { emisNumber: '37330322', name: 'GGPS Dhok Munshi', code: 'SCH-004', clusterId: 'cluster-4', districtId: 'district-1' },
  { emisNumber: '37330209', name: 'GBPS Dhoke Ziarat', code: 'SCH-005', clusterId: 'cluster-5', districtId: 'district-1' },
  { emisNumber: '37330172', name: 'GPS MILLAT ISLAMIA', code: 'SCH-006', clusterId: 'cluster-6', districtId: 'district-1' },
  { emisNumber: '37330598', name: 'GGPS Westridge 1', code: 'SCH-007', clusterId: 'cluster-7', districtId: 'district-1' },
  { emisNumber: '37330317', name: 'GPS DHAMIAL', code: 'SCH-008', clusterId: 'cluster-8', districtId: 'district-1' },
  { emisNumber: '37330172-A', name: 'GGPS ARAZI SOHAL', code: 'SCH-009', clusterId: 'cluster-9', districtId: 'district-1' }, // Note: Duplicate EMIS, added suffix
  { emisNumber: '37330612', name: 'GGES Pind Habtal', code: 'SCH-010', clusterId: 'cluster-10', districtId: 'district-1' },
  { emisNumber: '37330410', name: 'GMPS Khabba Barala', code: 'SCH-011', clusterId: 'cluster-11', districtId: 'district-1' },
  { emisNumber: '37330312', name: 'GPS CHAK DENAL', code: 'SCH-012', clusterId: 'cluster-12', districtId: 'district-1' },
  { emisNumber: '37330383', name: 'GPS REHMATABAD', code: 'SCH-013', clusterId: 'cluster-13', districtId: 'district-1' },
  { emisNumber: '37330151', name: 'GGES Anwar ul Islam Kamalabad', code: 'SCH-014', clusterId: 'cluster-1', districtId: 'district-1' },
  { emisNumber: '37330561', name: 'GGES Kotha Kallan', code: 'SCH-015', clusterId: 'cluster-2', districtId: 'district-1' },
  { emisNumber: '37330627', name: 'GGPS RAIKA MAIRA', code: 'SCH-016', clusterId: 'cluster-7', districtId: 'district-1' },
];

export const realAEOs: RealAEO[] = [
  { id: 'aeo-1', name: 'Abdul Mateen Mughal', area: 'Jhatha Hathial', gender: 'Male', phoneNumber: '03001000001', role: 'AEO', clusterId: 'cluster-1' },
  { id: 'aeo-2', name: 'Abdullah Raheem', area: 'Chountra', gender: 'Female', phoneNumber: '03001000002', role: 'AEO', clusterId: 'cluster-2' },
  { id: 'aeo-3', name: 'Amir Aqeel Shah', area: 'RWP Cantt', gender: 'Male', phoneNumber: '03001000003', role: 'AEO', clusterId: 'cluster-3' },
  { id: 'aeo-4', name: 'Muhammad Asif Jabbar', area: 'Adjala', gender: 'Male', phoneNumber: '03001000004', role: 'AEO', clusterId: 'cluster-4' },
  { id: 'aeo-5', name: 'Muhammad Atif Minhas', area: 'Chakri', gender: 'Male', phoneNumber: '03001000005', role: 'AEO', clusterId: 'cluster-5' },
  { id: 'aeo-6', name: 'Atiqa Tariq', area: 'Saddar Beroni', gender: 'Female', phoneNumber: '03001000006', role: 'AEO', clusterId: 'cluster-6' },
  { id: 'aeo-7', name: 'Malik Nadeem Sultan', area: 'Raika Maira', gender: 'Female', phoneNumber: '03001000007', role: 'AEO', clusterId: 'cluster-7' },
  { id: 'aeo-8', name: 'Nighat Noreen', area: 'RWP Cantt', gender: 'Female', phoneNumber: '03001000008', role: 'AEO', clusterId: 'cluster-3' },
  { id: 'aeo-9', name: 'Rabia Rauf', area: 'Lodhran', gender: 'Female', phoneNumber: '03001000009', role: 'AEO', clusterId: 'cluster-8' },
  { id: 'aeo-10', name: 'Sania Naseem', area: 'Pir Wadhai', gender: 'Female', phoneNumber: '03001000010', role: 'AEO', clusterId: 'cluster-9' },
  { id: 'aeo-11', name: 'Sheraz Hussain', area: 'Chaklala', gender: 'Male', phoneNumber: '03001000011', role: 'AEO', clusterId: 'cluster-10' },
  { id: 'aeo-12', name: 'Tasneem Shehzadi', area: 'Adyala', gender: 'Female', phoneNumber: '03001000012', role: 'AEO', clusterId: 'cluster-11' },
  { id: 'aeo-13', name: 'Tauqeer Akbar', area: 'Chauntra', gender: 'Male', phoneNumber: '03001000013', role: 'AEO', clusterId: 'cluster-2' },
  { id: 'aeo-14', name: 'Waheed Ahmed Butt', area: 'Shakrial', gender: 'Male', phoneNumber: '03001000014', role: 'AEO', clusterId: 'cluster-12' },
  { id: 'aeo-15', name: 'Waseem Ashraf', area: 'Pir Wadhai', gender: 'Male', phoneNumber: '03001000015', role: 'AEO', clusterId: 'cluster-9' },
  { id: 'aeo-16', name: 'Saima Bibi', area: 'Test Markaz', gender: 'Female', phoneNumber: '03001000016', role: 'AEO', clusterId: 'cluster-13' },
];

// Get schools by cluster
export function getSchoolsByCluster(clusterId: string): RealSchool[] {
  return realSchools.filter(school => school.clusterId === clusterId);
}

// Get AEO by cluster
export function getAEOByCluster(clusterId: string): RealAEO | undefined {
  return realAEOs.find(aeo => aeo.clusterId === clusterId);
}

// Get all AEOs for assignment dropdowns
export function getAllAEOsForAssignment() {
  return realAEOs.map(aeo => ({
    id: aeo.id,
    name: `${aeo.name} (${aeo.area})`,
    role: 'AEO' as const,
    school: aeo.area,
  }));
}

// Headmaster interface
export interface RealHeadmaster {
  id: string;
  name: string;
  phoneNumber: string;
  role: 'HEAD_TEACHER';
  schoolId: string;
  schoolName: string;
  schoolEmisNumber: string;
  clusterId: string;
  districtId: string;
}

// Headmasters - one for each school
export const realHeadmasters: RealHeadmaster[] = [
  { id: 'ht-1', name: 'Headmaster - GGPS Chakra', phoneNumber: '03002000001', role: 'HEAD_TEACHER', schoolId: 'SCH-001', schoolName: 'GGPS Chakra', schoolEmisNumber: '37330227', clusterId: 'cluster-1', districtId: 'district-1' },
  { id: 'ht-2', name: 'Headmaster - GGPS Carriage Factory', phoneNumber: '03002000002', role: 'HEAD_TEACHER', schoolId: 'SCH-002', schoolName: 'GGPS Carriage Factory', schoolEmisNumber: '37330433', clusterId: 'cluster-2', districtId: 'district-1' },
  { id: 'ht-3', name: 'Headmaster - GES JAWA', phoneNumber: '03002000003', role: 'HEAD_TEACHER', schoolId: 'SCH-003', schoolName: 'GES JAWA', schoolEmisNumber: '37330130', clusterId: 'cluster-3', districtId: 'district-1' },
  { id: 'ht-4', name: 'Headmaster - GGPS Dhok Munshi', phoneNumber: '03002000004', role: 'HEAD_TEACHER', schoolId: 'SCH-004', schoolName: 'GGPS Dhok Munshi', schoolEmisNumber: '37330322', clusterId: 'cluster-4', districtId: 'district-1' },
  { id: 'ht-5', name: 'Headmaster - GBPS Dhoke Ziarat', phoneNumber: '03002000005', role: 'HEAD_TEACHER', schoolId: 'SCH-005', schoolName: 'GBPS Dhoke Ziarat', schoolEmisNumber: '37330209', clusterId: 'cluster-5', districtId: 'district-1' },
  { id: 'ht-6', name: 'Headmaster - GPS MILLAT ISLAMIA', phoneNumber: '03002000006', role: 'HEAD_TEACHER', schoolId: 'SCH-006', schoolName: 'GPS MILLAT ISLAMIA', schoolEmisNumber: '37330172', clusterId: 'cluster-6', districtId: 'district-1' },
  { id: 'ht-7', name: 'Headmaster - GGPS Westridge 1', phoneNumber: '03002000007', role: 'HEAD_TEACHER', schoolId: 'SCH-007', schoolName: 'GGPS Westridge 1', schoolEmisNumber: '37330598', clusterId: 'cluster-7', districtId: 'district-1' },
  { id: 'ht-8', name: 'Headmaster - GPS DHAMIAL', phoneNumber: '03002000008', role: 'HEAD_TEACHER', schoolId: 'SCH-008', schoolName: 'GPS DHAMIAL', schoolEmisNumber: '37330317', clusterId: 'cluster-8', districtId: 'district-1' },
  { id: 'ht-9', name: 'Headmaster - GGPS ARAZI SOHAL', phoneNumber: '03002000009', role: 'HEAD_TEACHER', schoolId: 'SCH-009', schoolName: 'GGPS ARAZI SOHAL', schoolEmisNumber: '37330172-A', clusterId: 'cluster-9', districtId: 'district-1' },
  { id: 'ht-10', name: 'Headmaster - GGES Pind Habtal', phoneNumber: '03002000010', role: 'HEAD_TEACHER', schoolId: 'SCH-010', schoolName: 'GGES Pind Habtal', schoolEmisNumber: '37330612', clusterId: 'cluster-10', districtId: 'district-1' },
  { id: 'ht-11', name: 'Headmaster - GMPS Khabba Barala', phoneNumber: '03002000011', role: 'HEAD_TEACHER', schoolId: 'SCH-011', schoolName: 'GMPS Khabba Barala', schoolEmisNumber: '37330410', clusterId: 'cluster-11', districtId: 'district-1' },
  { id: 'ht-12', name: 'Headmaster - GPS CHAK DENAL', phoneNumber: '03002000012', role: 'HEAD_TEACHER', schoolId: 'SCH-012', schoolName: 'GPS CHAK DENAL', schoolEmisNumber: '37330312', clusterId: 'cluster-12', districtId: 'district-1' },
  { id: 'ht-13', name: 'Headmaster - GPS REHMATABAD', phoneNumber: '03002000013', role: 'HEAD_TEACHER', schoolId: 'SCH-013', schoolName: 'GPS REHMATABAD', schoolEmisNumber: '37330383', clusterId: 'cluster-13', districtId: 'district-1' },
  { id: 'ht-14', name: 'Headmaster - GGES Anwar ul Islam Kamalabad', phoneNumber: '03002000014', role: 'HEAD_TEACHER', schoolId: 'SCH-014', schoolName: 'GGES Anwar ul Islam Kamalabad', schoolEmisNumber: '37330151', clusterId: 'cluster-1', districtId: 'district-1' },
  { id: 'ht-15', name: 'Headmaster - GGES Kotha Kallan', phoneNumber: '03002000015', role: 'HEAD_TEACHER', schoolId: 'SCH-015', schoolName: 'GGES Kotha Kallan', schoolEmisNumber: '37330561', clusterId: 'cluster-2', districtId: 'district-1' },
  { id: 'ht-16', name: 'Headmaster - GGPS RAIKA MAIRA', phoneNumber: '03002000016', role: 'HEAD_TEACHER', schoolId: 'SCH-016', schoolName: 'GGPS RAIKA MAIRA', schoolEmisNumber: '37330627', clusterId: 'cluster-7', districtId: 'district-1' },
];

// Get headmaster by school
export function getHeadmasterBySchool(schoolId: string): RealHeadmaster | undefined {
  return realHeadmasters.find(hm => hm.schoolId === schoolId);
}

// Get headmaster by EMIS number
export function getHeadmasterByEmis(emisNumber: string): RealHeadmaster | undefined {
  return realHeadmasters.find(hm => hm.schoolEmisNumber === emisNumber);
}
