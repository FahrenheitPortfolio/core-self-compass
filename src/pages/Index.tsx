
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Assessment from '../components/Assessment';
import NeedsTracker from '../components/NeedsTracker';
import MoodJournal from '../components/MoodJournal';
import Community from '../components/Community';
import Pricing from '../components/Pricing';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen shadow-xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/tracker" element={<NeedsTracker />} />
          <Route path="/journal" element={<MoodJournal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
};

export default Index;
