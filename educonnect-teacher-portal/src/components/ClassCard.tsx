import React from 'react';
import { Book, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClassCardProps {
  id: string;
  name: string;
  studentCount: number;
  key?: string;
}

export function ClassCard({ id, name, studentCount }: ClassCardProps) {
  return (
    <Link 
      to={`/classes/${id}`}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors">
          <Book className="text-indigo-600 w-6 h-6" />
        </div>
        <ChevronRight className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{name}</h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <Users className="w-4 h-4" />
        <span>{studentCount} Students</span>
      </div>
    </Link>
  );
}
