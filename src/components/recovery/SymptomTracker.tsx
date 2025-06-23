import React, { useState } from 'react';
import { Activity, TrendingUp, Calendar, Plus } from 'lucide-react';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Pain Level', value: 3, scale: 10, color: 'red' },
    { id: 2, name: 'Energy', value: 6, scale: 10, color: 'green' },
    { id: 3, name: 'Sleep Quality', value: 7, scale: 10, color: 'blue' },
    { id: 4, name: 'Anxiety', value: 4, scale: 10, color: 'yellow' }
  ]);

  const [newSymptom, setNewSymptom] = useState('');

  const updateSymptom = (id: number, value: number) => {
    setSymptoms(prev => prev.map(s => s.id === id ? { ...s, value } : s));
  };

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <Activity className="w-6 h-6 text-purple-600 mr-3" />
        <h1 className="text-xl font-bold text-gray-800">Symptom Tracker</h1>
      </div>

      {/* Quick Log */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Today's Symptoms</h3>
        <div className="space-y-4">
          {symptoms.map((symptom) => (
            <div key={symptom.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">{symptom.name}</label>
                <span className="text-sm text-gray-600">{symptom.value}/{symptom.scale}</span>
              </div>
              <input
                type="range"
                min="0"
                max={symptom.scale}
                value={symptom.value}
                onChange={(e) => updateSymptom(symptom.id, Number(e.target.value))}
                className={`w-full h-2 bg-gradient-to-r from-green-200 to-${symptom.color}-400 rounded-lg appearance-none cursor-pointer`}
              />
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors">
          Save Today's Log
        </button>
      </div>

      {/* Add Custom Symptom */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Add Custom Symptom</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            placeholder="e.g., Headache, Nausea, Fatigue"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-semibold text-gray-800">Weekly Trends</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Track for a week to see patterns</p>
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;