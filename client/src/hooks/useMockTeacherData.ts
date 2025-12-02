import { useState, useCallback } from 'react';

export interface Teacher {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
  subject: string;
  status: 'present' | 'on_leave' | 'absent';
}

export interface LeaveRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'special';
  startDate: Date;
  endDate: Date;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
  school: string;
}

export interface SchoolData {
  id: string;
  name: string;
  district: string;
  block: string;
  principalName: string;
  totalStudents: number;
  totalTeachers: number;
  infrastructure: {
    classrooms: number;
    toilets: number;
    waterSource: boolean;
    electricity: boolean;
  };
  enrollment: {
    boys: number;
    girls: number;
  };
  compliance: number; // percentage
}

const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Mr. Vikram Das', schoolId: 'school-1', schoolName: 'Government Primary School, Zone A', subject: 'Mathematics', status: 'present' },
  { id: 't2', name: 'Ms. Priya Verma', schoolId: 'school-1', schoolName: 'Government Primary School, Zone A', subject: 'English', status: 'present' },
  { id: 't3', name: 'Mr. Rajesh Kumar', schoolId: 'school-1', schoolName: 'Government Primary School, Zone A', subject: 'Science', status: 'on_leave' },
  { id: 't4', name: 'Mrs. Anjali Singh', schoolId: 'school-1', schoolName: 'Government Primary School, Zone A', subject: 'Social Studies', status: 'present' },
  { id: 't5', name: 'Mr. Ashok Yadav', schoolId: 'school-2', schoolName: 'Government Upper Primary School', subject: 'Hindi', status: 'absent' },
  { id: 't6', name: 'Ms. Sunita Sharma', schoolId: 'school-2', schoolName: 'Government Upper Primary School', subject: 'Mathematics', status: 'present' },
  { id: 't7', name: 'Mr. Rohan Patel', schoolId: 'school-3', schoolName: 'Government Secondary School', subject: 'Physics', status: 'on_leave' },
  { id: 't8', name: 'Mrs. Meera Desai', schoolId: 'school-3', schoolName: 'Government Secondary School', subject: 'Chemistry', status: 'present' },
  { id: 't9', name: 'Mr. Suresh Gupta', schoolId: 'school-3', schoolName: 'Government Secondary School', subject: 'Biology', status: 'present' },
  { id: 't10', name: 'Ms. Neha Kapoor', schoolId: 'school-2', schoolName: 'Government Upper Primary School', subject: 'English', status: 'on_leave' },
];

const mockLeaves: LeaveRecord[] = [
  { id: 'l1', teacherId: 't3', teacherName: 'Mr. Rajesh Kumar', leaveType: 'sick', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-03'), status: 'approved', reason: 'Fever', school: 'Government Primary School, Zone A' },
  { id: 'l2', teacherId: 't7', teacherName: 'Mr. Rohan Patel', leaveType: 'earned', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-02'), status: 'approved', reason: 'Personal', school: 'Government Secondary School' },
  { id: 'l3', teacherId: 't10', teacherName: 'Ms. Neha Kapoor', leaveType: 'casual', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-04'), status: 'approved', reason: 'Family work', school: 'Government Upper Primary School' },
  { id: 'l4', teacherId: 't1', teacherName: 'Mr. Vikram Das', leaveType: 'casual', startDate: new Date('2024-12-05'), endDate: new Date('2024-12-06'), status: 'pending', reason: 'Travel', school: 'Government Primary School, Zone A' },
];

const mockSchools: SchoolData[] = [
  {
    id: 'school-1',
    name: 'Government Primary School, Zone A',
    district: 'District One',
    block: 'Block A',
    principalName: 'Dr. Ramesh Singh',
    totalStudents: 345,
    totalTeachers: 12,
    infrastructure: { classrooms: 8, toilets: 4, waterSource: true, electricity: true },
    enrollment: { boys: 185, girls: 160 },
    compliance: 92,
  },
  {
    id: 'school-2',
    name: 'Government Upper Primary School',
    district: 'District One',
    block: 'Block B',
    principalName: 'Mrs. Priya Sharma',
    totalStudents: 512,
    totalTeachers: 18,
    infrastructure: { classrooms: 12, toilets: 6, waterSource: true, electricity: true },
    enrollment: { boys: 280, girls: 232 },
    compliance: 88,
  },
  {
    id: 'school-3',
    name: 'Government Secondary School',
    district: 'District One',
    block: 'Block C',
    principalName: 'Prof. Arun Kumar',
    totalStudents: 687,
    totalTeachers: 25,
    infrastructure: { classrooms: 18, toilets: 10, waterSource: true, electricity: true },
    enrollment: { boys: 375, girls: 312 },
    compliance: 95,
  },
];

export function useMockTeacherData() {
  const [teachers] = useState<Teacher[]>(mockTeachers);
  const [leaves] = useState<LeaveRecord[]>(mockLeaves);
  const [schools] = useState<SchoolData[]>(mockSchools);

  const getTeacherStats = useCallback(() => {
    const today = new Date();
    const totalTeachers = teachers.length;
    const presentToday = teachers.filter((t) => t.status === 'present').length;
    const onLeaveToday = teachers.filter((t) => t.status === 'on_leave').length;
    const absentToday = teachers.filter((t) => t.status === 'absent').length;

    return { totalTeachers, presentToday, onLeaveToday, absentToday };
  }, [teachers]);

  const getLeavesByDate = useCallback(
    (date: Date) => {
      return leaves.filter((l) => {
        const start = new Date(l.startDate);
        const end = new Date(l.endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date >= start && date <= end;
      });
    },
    [leaves]
  );

  const getPendingLeaves = useCallback(() => {
    return leaves.filter((l) => l.status === 'pending');
  }, [leaves]);

  const getSchoolData = useCallback(() => {
    return schools;
  }, [schools]);

  const getSchoolById = useCallback(
    (schoolId: string) => {
      return schools.find((s) => s.id === schoolId);
    },
    [schools]
  );

  return {
    teachers,
    leaves,
    schools,
    getTeacherStats,
    getLeavesByDate,
    getPendingLeaves,
    getSchoolData,
    getSchoolById,
  };
}
