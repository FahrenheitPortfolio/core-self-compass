
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
import PrivacyPolicy from '../components/PrivacyPolicy';
import TestChecklist from '../components/TestChecklist';
import TestSubscription from '../components/TestSubscription';
import Onboarding from '../components/Onboarding';
import TraumaSupport from '../components/recovery/TraumaSupport';
import SymptomTracker from '../components/recovery/SymptomTracker';
import StressMonitor from '../components/recovery/StressMonitor';

const Index = () => {
  console.log('🏠 Index page loaded');
  
  const isOnboardingCompleted = localStorage.getItem('onboarding_completed');
  
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen shadow-xl">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/test" element={<TestChecklist />} />
            <Route path="/test-sub" element={<TestSubscription />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/trauma-support" element={
              <ProtectedRoute>
                <TraumaSupport />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/symptoms" element={
              <ProtectedRoute>
                <SymptomTracker />
                <Navigation />
              </ProtectedRoute>
            } />
            <Route path="/stress" element={
              <ProtectedRoute>
                <StressMonitor />
                <Navigation />
              </ProtectedRoute>
            } />
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
