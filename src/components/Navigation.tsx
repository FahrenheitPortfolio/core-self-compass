
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Target, CheckSquare, Book, Users, Crown } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/assessment', icon: Target, label: 'Assess' },
    { path: '/tracker', icon: CheckSquare, label: 'Track' },
    { path: '/journal', icon: Book, label: 'Journal' },
    { path: '/community', icon: Users, label: 'Circle' },
    { path: '/pricing', icon: Crown, label: 'Premium' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
