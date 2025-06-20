
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPremium?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresPremium = false }) => {
  const { user, subscription, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiresPremium && subscription?.plan === 'basic') {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
