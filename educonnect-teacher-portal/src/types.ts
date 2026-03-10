export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  marks?: number;
}

export interface Subject {
  id: string;
  name: string;
  students: Student[];
}

export interface ClassInfo {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Stats {
  totalClasses: number;
  totalStudents: number;
  pendingMarks: number;
}
