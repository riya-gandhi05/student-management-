import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MOCK_CLASSES } from '../mockData';
import { Book, ChevronRight, Users } from 'lucide-react';

export function Subjects() {
  const { classId } = useParams();
  const classInfo = MOCK_CLASSES.find(c => c.id === classId);

  if (!classInfo) {
    return <Layout><div>Class not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link to="/classes" className="hover:text-indigo-600">My Classes</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-600">{classInfo.name}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Subjects</h1>
        <p className="text-slate-500 mt-1">Select a subject to upload internal marks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classInfo.subjects.map((subject) => (
          <Link
            key={subject.id}
            to={`/upload/${classId}/${subject.id}`}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                <Book className="text-indigo-600 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{subject.name}</h3>
                <div className="flex items-center gap-2 text-slate-500">
                  <Users className="w-4 h-4" />
                  <span>{subject.students.length} Students enrolled</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-indigo-400 transition-colors w-6 h-6" />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
