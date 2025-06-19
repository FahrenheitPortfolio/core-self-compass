
import React, { useState } from 'react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NeedsTracker = () => {
  const navigate = useNavigate();
  const [completedNeeds, setCompletedNeeds] = useState(new Set());

  const todaysNeeds = [
    { id: 1, category: 'Physical', need: 'Drink 8 glasses of water', color: 'from-red-400 to-pink-400' },
    { id: 2, category: 'Physical', need: 'Get 7-8 hours of sleep', color: 'from-red-400 to-pink-400' },
    { id: 3, category: 'Emotional', need: 'Practice gratitude', color: 'from-green-400 to-emerald-400' },
    { id: 4, category: 'Emotional', need: 'Express feelings honestly', color: 'from-green-400 to-emerald-400' },
    { id: 5, category: 'Social', need: 'Connect with a loved one', color: 'from-purple-400 to-pink-400' },
    { id: 6, category: 'Social', need: 'Show kindness to someone', color: 'from-purple-400 to-pink-400' },
    { id: 7, category: 'Mental', need: 'Learn something new', color: 'from-blue-400 to-indigo-400' },
    { id: 8, category: 'Spiritual', need: 'Spend time in nature', color: 'from-amber-400 to-orange-400' },
    { id: 9, category: 'Growth', need: 'Work on a personal goal', color: 'from-teal-400 to-cyan-400' }
  ];

  const toggleNeed = (needId) => {
    const newCompleted = new Set(completedNeeds);
    if (newCompleted.has(needId)) {
      newCompleted.delete(needId);
    } else {
      newCompleted.add(needId);
    }
    setCompletedNeeds(newCompleted);
  };

  const completionRate = (completedNeeds.size / todaysNeeds.length) * 100;

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Needs Tracker</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {Math.round(completionRate)}%
          </div>
          <p className="text-gray-600">needs fulfilled today</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        
        <p className="text-center text-sm text-gray-600">
          You've nurtured {completedNeeds.size} of {todaysNeeds.length} needs
        </p>
      </div>

      <div className="space-y-3">
        {todaysNeeds.map((item) => {
          const isCompleted = completedNeeds.has(item.id);
          
          return (
            <div 
              key={item.id}
              className={`bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg transition-all duration-200 ${
                isCompleted ? 'bg-emerald-50/80' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleNeed(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  {isCompleted && <Check className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <p className={`font-medium transition-all duration-200 ${
                    isCompleted ? 'text-emerald-700 line-through' : 'text-gray-800'
                  }`}>
                    {item.need}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completionRate === 100 && (
        <div className="mt-6 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2">🌟 Beautiful!</h3>
            <p className="text-emerald-100">You've fulfilled all your needs today. Your whole self is being nurtured.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedsTracker;
