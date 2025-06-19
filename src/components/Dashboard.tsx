
import React, { useState } from 'react';
import { Heart, Leaf, Brain, Users, Sparkles, Mountain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState('Beautiful Soul');
  
  const needCategories = [
    { 
      id: 'physical', 
      name: 'Physical', 
      icon: Heart, 
      color: 'from-red-400 to-pink-400',
      fulfilled: 3,
      total: 5,
      suggestion: 'Take 5 deep breaths in nature'
    },
    { 
      id: 'emotional', 
      name: 'Emotional', 
      icon: Leaf, 
      color: 'from-green-400 to-emerald-400',
      fulfilled: 2,
      total: 4,
      suggestion: 'Journal about something you\'re grateful for'
    },
    { 
      id: 'cognitive', 
      name: 'Mental', 
      icon: Brain, 
      color: 'from-blue-400 to-indigo-400',
      fulfilled: 4,
      total: 5,
      suggestion: 'Learn something new for 10 minutes'
    },
    { 
      id: 'social', 
      name: 'Social', 
      icon: Users, 
      color: 'from-purple-400 to-pink-400',
      fulfilled: 1,
      total: 3,
      suggestion: 'Send a loving message to a friend'
    },
    { 
      id: 'spiritual', 
      name: 'Spiritual', 
      icon: Sparkles, 
      color: 'from-amber-400 to-orange-400',
      fulfilled: 2,
      total: 4,
      suggestion: 'Spend 5 minutes in quiet reflection'
    },
    { 
      id: 'actualization', 
      name: 'Growth', 
      icon: Mountain, 
      color: 'from-teal-400 to-cyan-400',
      fulfilled: 3,
      total: 4,
      suggestion: 'Work on a creative project for 15 minutes'
    }
  ];

  return (
    <div className="p-6 pb-24">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
          WholeMe
        </h1>
        <p className="text-gray-600">Welcome back, {userName}</p>
        <p className="text-sm text-gray-500 mt-1">How are you nurturing yourself today?</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Today's Intention</h2>
        <p className="text-gray-600 italic">"I choose to nurture my whole self with love and compassion"</p>
        <button 
          onClick={() => navigate('/assessment')}
          className="mt-3 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
        >
          Set new intention →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {needCategories.map((category) => {
          const Icon = category.icon;
          const progress = (category.fulfilled / category.total) * 100;
          
          return (
            <div key={category.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{category.fulfilled}/{category.total} fulfilled</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Gentle Suggestions</h2>
        <div className="space-y-3">
          {needCategories.slice(0, 3).map((category, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/40 rounded-xl">
              <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{category.suggestion}</p>
                <span className="text-xs text-gray-500">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
