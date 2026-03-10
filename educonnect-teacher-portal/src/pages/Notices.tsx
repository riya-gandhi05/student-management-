import React from 'react';
import { Layout } from '../components/Layout';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Internal Assessment Deadline',
    content: 'All teachers are requested to upload the internal marks for the current semester by March 15th, 2026.',
    date: 'March 04, 2026',
    type: 'alert',
    icon: AlertTriangle,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    id: 2,
    title: 'New Faculty Meeting',
    content: 'A meeting for all IT department faculty members is scheduled for tomorrow at 10:00 AM in the Conference Hall.',
    date: 'March 03, 2026',
    type: 'info',
    icon: Info,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    id: 3,
    title: 'System Maintenance',
    content: 'The EduConnect portal will be down for maintenance on Sunday from 2:00 AM to 4:00 AM.',
    date: 'March 01, 2026',
    type: 'success',
    icon: CheckCircle,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
];

export function Notices() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Notices</h1>
        <p className="text-slate-500 mt-1">Stay updated with the latest college announcements.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className={`p-6 rounded-2xl border ${notice.color} flex gap-6 items-start shadow-sm`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <notice.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
                <span className="text-xs font-medium text-slate-400">{notice.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{notice.content}</p>
              <button className="mt-4 text-sm font-bold hover:underline">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
