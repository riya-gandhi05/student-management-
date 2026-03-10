import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { MyClasses } from './pages/MyClasses';
import { Subjects } from './pages/Subjects';
import { UploadMarks } from './pages/UploadMarks';
import { PerformanceAnalysis } from './pages/PerformanceAnalysis';
import { Notices } from './pages/Notices';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/classes" element={
            <ProtectedRoute>
              <MyClasses />
            </ProtectedRoute>
          } />
          
          <Route path="/classes/:classId" element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          } />
          
          <Route path="/upload" element={
            <ProtectedRoute>
              <MyClasses />
            </ProtectedRoute>
          } />

          <Route path="/upload/:classId/:subjectId" element={
            <ProtectedRoute>
              <UploadMarks />
            </ProtectedRoute>
          } />
          
          <Route path="/performance" element={
            <ProtectedRoute>
              <PerformanceAnalysis />
            </ProtectedRoute>
          } />
          
          <Route path="/notices" element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
