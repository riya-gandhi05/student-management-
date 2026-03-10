import React from 'react';
import { Layout } from '../components/Layout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Award } from 'lucide-react';

const performanceData = [
  { name: 'Alice', marks: 18 },
  { name: 'Bob', marks: 15 },
  { name: 'Charlie', marks: 12 },
  { name: 'Diana', marks: 19 },
  { name: 'Ethan', marks: 14 },
];

const passFailData = [
  { name: 'Passed', value: 4 },
  { name: 'Failed', value: 1 },
];

const COLORS = ['#6366f1', '#f43f5e'];

export function PerformanceAnalysis() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Performance Analysis</h1>
        <p className="text-slate-500 mt-1">Visualizing student performance across your subjects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <TrendingUp className="text-indigo-600 w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-500">+5.2%</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Average Marks</p>
          <h3 className="text-2xl font-bold text-slate-800">15.6 / 20</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <Award className="text-emerald-600 w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Highest Marks</p>
          <h3 className="text-2xl font-bold text-slate-800">19 / 20</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-rose-50 p-2 rounded-lg">
              <TrendingDown className="text-rose-600 w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Lowest Marks</p>
          <h3 className="text-2xl font-bold text-slate-800">12 / 20</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Users className="text-blue-600 w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Pass Ratio</p>
          <h3 className="text-2xl font-bold text-slate-800">80%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Student Marks Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 20]} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="marks" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pass vs Fail Ratio</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={passFailData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {passFailData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
