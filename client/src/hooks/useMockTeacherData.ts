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
  { id: 't1', name: 'Teacher 1', schoolId: 'school-1', schoolName: 'Demo School', subject: 'Mathematics', status: 'present' },
  { id: 't2', name: 'Teacher 2', schoolId: 'school-1', schoolName: 'Demo School', subject: 'English', status: 'present' },
  { id: 't3', name: 'Teacher 3', schoolId: 'school-1', schoolName: 'Demo School', subject: 'Science', status: 'on_leave' },
  { id: 't4', name: 'Teacher 4', schoolId: 'school-1', schoolName: 'Demo School', subject: 'Social Studies', status: 'present' },
  { id: 't5', name: 'Teacher 5', schoolId: 'school-2', schoolName: 'Demo School 2', subject: 'Hindi', status: 'absent' },
  { id: 't6', name: 'Teacher 6', schoolId: 'school-2', schoolName: 'Demo School 2', subject: 'Mathematics', status: 'present' },
  { id: 't7', name: 'Teacher 7', schoolId: 'school-3', schoolName: 'Demo School 3', subject: 'Physics', status: 'on_leave' },
  { id: 't8', name: 'Teacher 8', schoolId: 'school-3', schoolName: 'Demo School 3', subject: 'Chemistry', status: 'present' },
  { id: 't9', name: 'Teacher 9', schoolId: 'school-3', schoolName: 'Demo School 3', subject: 'Biology', status: 'present' },
  { id: 't10', name: 'Teacher 10', schoolId: 'school-2', schoolName: 'Demo School 2', subject: 'English', status: 'on_leave' },
];

const mockLeaves: LeaveRecord[] = [
  { id: 'l1', teacherId: 't3', teacherName: 'Teacher 3', leaveType: 'sick', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-03'), status: 'approved', reason: 'Fever', school: 'Demo School' },
  { id: 'l2', teacherId: 't7', teacherName: 'Teacher 7', leaveType: 'earned', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-02'), status: 'approved', reason: 'Personal', school: 'Demo School 3' },
  { id: 'l3', teacherId: 't10', teacherName: 'Teacher 10', leaveType: 'casual', startDate: new Date('2024-12-02'), endDate: new Date('2024-12-04'), status: 'approved', reason: 'Family work', school: 'Demo School 2' },
  { id: 'l4', teacherId: 't1', teacherName: 'Teacher 1', leaveType: 'casual', startDate: new Date('2024-12-05'), endDate: new Date('2024-12-06'), status: 'pending', reason: 'Travel', school: 'Demo School' },
];

const mockSchools: SchoolData[] = [
  {
    id: 'school-1',
    name: 'Demo School',
    district: 'District One',
    block: 'Block A',
    principalName: 'Principal 1',
    totalStudents: 345,
    totalTeachers: 12,
    infrastructure: { classrooms: 8, toilets: 4, waterSource: true, electricity: true },
    enrollment: { boys: 185, girls: 160 },
    compliance: 92,
  },
  {
    id: 'school-2',
    name: 'Demo School 2',
    district: 'District One',
    block: 'Block B',
    principalName: 'Principal 2',
    totalStudents: 512,
    totalTeachers: 18,
    infrastructure: { classrooms: 12, toilets: 6, waterSource: true, electricity: true },
    enrollment: { boys: 280, girls: 232 },
    compliance: 88,
  },
  {
    id: 'school-3',
    name: 'Demo School 3',
    district: 'District One',
    block: 'Block C',
    principalName: 'Principal 3',
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
