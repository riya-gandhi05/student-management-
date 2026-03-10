import React from 'react';
import { Layout } from '../components/Layout';
import { StatsCard } from '../components/StatsCard';
import { Users, BookOpen, Clock, Calendar } from 'lucide-react';
import { MOCK_STATS } from '../mockData';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome back, Prof. {user?.email.split('@')[0]}!</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your classes today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          label="Total Classes" 
          value={MOCK_STATS.totalClasses} 
          icon={BookOpen} 
          color="bg-blue-500" 
        />
        <StatsCard 
          label="Total Students" 
          value={MOCK_STATS.totalStudents} 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatsCard 
          label="Pending Marks" 
          value={MOCK_STATS.pendingMarks} 
          icon={Clock} 
          color="bg-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Upcoming Schedule</h2>
            <Calendar className="text-slate-400 w-5 h-5" />
          </div>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', subject: 'SMAD', class: 'SY BSc IT', room: 'Lab 101' },
              { time: '11:00 AM', subject: 'DBMS', class: 'SY BSc IT', room: 'Room 304' },
              { time: '02:00 PM', subject: 'CN', class: 'SY BSc IT', room: 'Room 202' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-indigo-600 font-bold text-sm w-20">{item.time}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{item.subject}</h4>
                  <p className="text-xs text-slate-500">{item.class} • {item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { action: 'Marks Uploaded', detail: 'Internal Assessment - DBMS', time: '2 hours ago' },
              { action: 'Notice Posted', detail: 'Assignment Deadline Extended', time: '5 hours ago' },
              { action: 'Attendance Marked', detail: 'SY BSc IT - SMAD', time: 'Yesterday' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{item.action}</h4>
                  <p className="text-sm text-slate-500">{item.detail}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
