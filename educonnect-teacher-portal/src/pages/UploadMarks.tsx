import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MOCK_CLASSES } from '../mockData';
import { ChevronRight, Save, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function UploadMarks() {
  const { classId, subjectId } = useParams();
  const classInfo = MOCK_CLASSES.find(c => c.id === classId);
  const subject = classInfo?.subjects.find(s => s.id === subjectId);
  
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!classInfo || !subject) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Please select a class and subject first</h2>
          <Link to="/classes" className="text-indigo-600 hover:underline mt-4 inline-block">Go to My Classes</Link>
        </div>
      </Layout>
    );
  }

  const handleMarkChange = (studentId: string, value: string) => {
    // Only allow numbers between 0-20 (assuming TA marks are out of 20)
    const numValue = parseInt(value);
    if (value === '' || (!isNaN(numValue) && numValue >= 0 && numValue <= 20)) {
      setMarks(prev => ({ ...prev, [studentId]: value }));
    }
  };

  const handleSave = (studentId: string) => {
    // Mock save
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredStudents = subject.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link to="/classes" className="hover:text-indigo-600">My Classes</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/classes/${classId}`} className="hover:text-indigo-600">{classInfo.name}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-600">{subject.name}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Upload Internal Marks</h1>
            <p className="text-slate-500 mt-1">Enter TA marks for students (Max: 20)</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Marks saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-100">
              <th className="px-6 py-4 text-sm font-bold text-slate-600">Student Name</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">Roll Number</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">TA Marks (20)</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{student.rollNumber}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={marks[student.id] || ''}
                    onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center font-bold"
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSave(student.id)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No students found matching your search.
          </div>
        )}
      </div>
    </Layout>
  );
}
