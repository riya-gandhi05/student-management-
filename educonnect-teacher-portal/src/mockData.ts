import { Student, ClassInfo } from './types';

export const MOCK_CLASSES: ClassInfo[] = [
  {
    id: 'sy-bsc-it-smad',
    name: 'SY BSc IT - SMAD',
    subjects: [
      {
        id: 'smad-1',
        name: 'Smart Mobile App Development',
        students: [
          { id: '1', name: 'Alice Johnson', rollNumber: 'IT001' },
          { id: '2', name: 'Bob Smith', rollNumber: 'IT002' },
          { id: '3', name: 'Charlie Brown', rollNumber: 'IT003' },
          { id: '4', name: 'Diana Prince', rollNumber: 'IT004' },
          { id: '5', name: 'Ethan Hunt', rollNumber: 'IT005' },
        ],
      },
    ],
  },
  {
    id: 'sy-bsc-it-dbms',
    name: 'SY BSc IT - DBMS',
    subjects: [
      {
        id: 'dbms-1',
        name: 'Database Management',
        students: [
          { id: '1', name: 'Alice Johnson', rollNumber: 'IT001' },
          { id: '2', name: 'Bob Smith', rollNumber: 'IT002' },
          { id: '3', name: 'Charlie Brown', rollNumber: 'IT003' },
          { id: '4', name: 'Diana Prince', rollNumber: 'IT004' },
          { id: '5', name: 'Ethan Hunt', rollNumber: 'IT005' },
        ],
      },
    ],
  },
  {
    id: 'sy-bsc-it-cn',
    name: 'SY BSc IT - CN',
    subjects: [
      {
        id: 'cn-1',
        name: 'Computer Networks',
        students: [
          { id: '1', name: 'Alice Johnson', rollNumber: 'IT001' },
          { id: '2', name: 'Bob Smith', rollNumber: 'IT002' },
          { id: '3', name: 'Charlie Brown', rollNumber: 'IT003' },
          { id: '4', name: 'Diana Prince', rollNumber: 'IT004' },
          { id: '5', name: 'Ethan Hunt', rollNumber: 'IT005' },
        ],
      },
    ],
  },
];

export const MOCK_STATS = {
  totalClasses: 3,
  totalStudents: 15,
  pendingMarks: 8,
};
