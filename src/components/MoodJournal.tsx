
import React, { useState } from 'react';
import { ArrowLeft, Edit3, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MoodJournal = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  const moods = [
    { emoji: '😊', label: 'Joyful', color: 'from-yellow-400 to-orange-400' },
    { emoji: '😌', label: 'Peaceful', color: 'from-green-400 to-teal-400' },
    { emoji: '😔', label: 'Sad', color: 'from-blue-400 to-indigo-400' },
    { emoji: '😟', label: 'Anxious', color: 'from-purple-400 to-pink-400' },
    { emoji: '😡', label: 'Frustrated', color: 'from-red-400 to-orange-400' },
    { emoji: '😴', label: 'Tired', color: 'from-gray-400 to-slate-400' },
    { emoji: '🤗', label: 'Grateful', color: 'from-emerald-400 to-green-400' },
    { emoji: '🤔', label: 'Contemplative', color: 'from-indigo-400 to-purple-400' }
  ];

  const needsInsights = {
    'Joyful': 'Your joy suggests your social and self-actualization needs are being met beautifully.',
    'Peaceful': 'This calm feeling indicates your emotional and spiritual needs are in harmony.',
    'Sad': 'Sadness might signal unmet emotional or social needs. Be gentle with yourself.',
    'Anxious': 'Anxiety often points to unmet safety or security needs. What would help you feel more secure?',
    'Frustrated': 'Frustration may indicate blocked progress toward your goals or unmet autonomy needs.',
    'Tired': 'Fatigue suggests your physical needs require attention. Rest is sacred.',
    'Grateful': 'Gratitude shows many of your needs are being fulfilled. How wonderful!',
    'Contemplative': 'This reflective mood indicates your mental and spiritual needs are active.'
  };

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mood Journal</h1>
        <div className="w-9 h-9" />
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">How are you feeling?</h2>
        <p className="text-gray-600 text-sm">Your emotions are messengers. Let's listen to them together.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Choose your mood</h3>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                selectedMood === mood.label
                  ? `bg-gradient-to-br ${mood.color} scale-105 shadow-lg`
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className={`text-xs font-medium ${
                selectedMood === mood.label ? 'text-white' : 'text-gray-700'
              }`}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedMood && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Needs Insight</h3>
          <p className="text-sm text-gray-700 italic leading-relaxed">
            {needsInsights[selectedMood]}
          </p>
        </div>
      )}

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Edit3 className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Journal Entry</h3>
        </div>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="What's on your heart today? Write freely, without judgment..."
          className="w-full h-32 p-4 bg-white/40 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-700 placeholder-gray-500"
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {journalEntry.length} characters
          </div>
          <button 
            className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-blue-600 transition-all duration-200"
            disabled={!selectedMood || !journalEntry.trim()}
          >
            Save Entry
          </button>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 shadow-lg">
        <h4 className="font-medium text-gray-800 mb-2">💫 Gentle Reminder</h4>
        <p className="text-sm text-gray-700">
          All feelings are valid and welcome. Thank you for taking time to check in with yourself.
        </p>
      </div>
    </div>
  );
};

export default MoodJournal;
