
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '../components/Dashboard';
import EnhancedAssessment from '../components/features/EnhancedAssessment';
import NeedsTracker from '../components/NeedsTracker';
import EnhancedMoodJournal from '../components/features/EnhancedMoodJournal';
import EnhancedCommunity from '../components/features/EnhancedCommunity';
import Pricing from '../components/Pricing';
import Navigation from '../components/Navigation';
import AuthPage from '../components/auth/AuthPage';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen shadow-xl">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/assessment" element={
              <ProtectedRoute>
                <EnhancedAssessment />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/tracker" element={
              <ProtectedRoute>
                <NeedsTracker />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <EnhancedMoodJournal />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <EnhancedCommunity />
                <Navigation />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Index;
