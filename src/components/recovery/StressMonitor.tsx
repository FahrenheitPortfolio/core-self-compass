import React, { useState, useEffect } from 'react';
import { Zap, AlertCircle, CheckCircle, Target } from 'lucide-react';

const StressMonitor = () => {
  const [currentStress, setCurrentStress] = useState(5);
  const [stressTriggers, setStressTriggers] = useState([
    { id: 1, trigger: 'Work deadlines', frequency: 8, impact: 7 },
    { id: 2, trigger: 'Financial concerns', frequency: 6, impact: 8 },
    { id: 3, trigger: 'Relationship issues', frequency: 4, impact: 9 }
  ]);

  const copingStrategies = [
    { name: 'Deep Breathing', effectiveness: 85, duration: '5 min' },
    { name: 'Progressive Muscle Relaxation', effectiveness: 78, duration: '15 min' },
    { name: 'Mindful Walking', effectiveness: 72, duration: '10 min' },
    { name: 'Journaling', effectiveness: 68, duration: '20 min' }
  ];

  const getStressLevel = () => {
    if (currentStress <= 3) return { level: 'Low', color: 'green', icon: CheckCircle };
    if (currentStress <= 6) return { level: 'Moderate', color: 'yellow', icon: Target };
    return { level: 'High', color: 'red', icon: AlertCircle };
  };

  const stressInfo = getStressLevel();
  const StressIcon = stressInfo.icon;

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <Zap className="w-6 h-6 text-orange-600 mr-3" />
        <h1 className="text-xl font-bold text-gray-800">Stress Monitor</h1>
      </div>

      {/* Current Stress Level */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Current Stress Level</h3>
        <div className="text-center mb-4">
          <div className={`w-20 h-20 bg-${stressInfo.color}-100 rounded-full mx-auto mb-3 flex items-center justify-center`}>
            <StressIcon className={`w-10 h-10 text-${stressInfo.color}-600`} />
          </div>
          <h4 className={`text-xl font-bold text-${stressInfo.color}-600`}>{stressInfo.level}</h4>
          <p className="text-gray-600">{currentStress}/10</p>
        </div>
        
        <input
          type="range"
          min="1"
          max="10"
          value={currentStress}
          onChange={(e) => setCurrentStress(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-400 rounded-lg appearance-none cursor-pointer"
        />
        
        <button className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
          Log Stress Level
        </button>
      </div>

      {/* Stress Triggers */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Top Stress Triggers</h3>
        <div className="space-y-3">
          {stressTriggers.map((trigger) => (
            <div key={trigger.id} className="p-3 bg-orange-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800">{trigger.trigger}</h4>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                  Impact: {trigger.impact}/10
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(trigger.frequency / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Frequency: {trigger.frequency}/10</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coping Strategies */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Recommended Coping Strategies</h3>
        <div className="space-y-3">
          {copingStrategies.map((strategy, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800">{strategy.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600">{strategy.effectiveness}% effective</span>
                  <span className="text-xs text-gray-500">{strategy.duration}</span>
                </div>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${strategy.effectiveness}%` }}
                ></div>
              </div>
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Start Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StressMonitor;