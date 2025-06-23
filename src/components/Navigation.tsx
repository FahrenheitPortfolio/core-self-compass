
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Target, Book, Shield, Activity, Zap } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/assessment', icon: Target, label: 'Assess' },
    { path: '/journal', icon: Book, label: 'Journal' },
    { path: '/trauma-support', icon: Shield, label: 'Support' },
    { path: '/symptoms', icon: Activity, label: 'Health' },
    { path: '/stress', icon: Zap, label: 'Stress' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform ${
                isActive 
                  ? 'text-emerald-600 bg-gradient-to-br from-emerald-50 to-blue-50 scale-110 shadow-md' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive ? 'animate-pulse-soft' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
