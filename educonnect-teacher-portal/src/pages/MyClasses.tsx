import React from 'react';
import { Layout } from '../components/Layout';
import { ClassCard } from '../components/ClassCard';
import { MOCK_CLASSES } from '../mockData';

export function MyClasses() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Classes</h1>
        <p className="text-slate-500 mt-1">Select a class to manage subjects and marks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLASSES.map((cls) => (
          <ClassCard 
            key={cls.id} 
            id={cls.id} 
            name={cls.name} 
            studentCount={cls.subjects[0].students.length} 
          />
        ))}
      </div>
    </Layout>
  );
}
