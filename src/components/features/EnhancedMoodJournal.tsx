
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Heart, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EnhancedMoodJournal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { features } = useSubscriptionFeatures();
  const [selectedMood, setSelectedMood] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recentEntries, setRecentEntries] = useState<any[]>([]);

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad' },
    { value: 2, emoji: '😔', label: 'Sad' },
    { value: 3, emoji: '😐', label: 'Neutral' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Happy' },
    { value: 6, emoji: '😄', label: 'Very Happy' },
    { value: 7, emoji: '🤗', label: 'Grateful' },
    { value: 8, emoji: '✨', label: 'Blissful' }
  ];

  const tags = [
    'grateful', 'anxious', 'peaceful', 'excited', 'tired', 'motivated',
    'loved', 'creative', 'focused', 'overwhelmed', 'hopeful', 'content'
  ];

  useEffect(() => {
    if (features.moodPatternInsights) {
      fetchRecentEntries();
    }
  }, [features.moodPatternInsights]);

  const fetchRecentEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentEntries(data || []);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const saveMoodEntry = async () => {
    if (!user || !journalEntry.trim()) {
      toast.error('Please write something in your journal entry');
      return;
    }

    try {
      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_rating: selectedMood,
          energy_level: energyLevel,
          stress_level: stressLevel,
          notes: journalEntry,
          tags: selectedTags,
        });

      if (error) throw error;

      toast.success('Mood entry saved successfully!');
      setJournalEntry('');
      setSelectedTags([]);
      if (features.moodPatternInsights) {
        fetchRecentEntries();
      }
    } catch (error) {
      console.error('Error saving mood entry:', error);
      toast.error('Error saving mood entry');
    }
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
        <h1 className="text-xl font-bold text-gray-800">
          {features.moodPatternInsights ? 'Advanced Mood Journal' : 'Mood Journal'}
        </h1>
        <div className="w-9 h-9" />
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">How are you feeling?</h2>
        <p className="text-gray-600 text-sm">Your emotions are messengers. Let's listen to them together.</p>
        {features.moodPatternInsights && (
          <p className="text-sm text-purple-600 font-medium mt-2">✨ Pattern Insights Enabled</p>
        )}
      </div>

      {/* Mood Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Overall Mood</h3>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                selectedMood === mood.value
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500 scale-105 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className={`text-xs font-medium ${
                selectedMood === mood.value ? 'text-white' : 'text-gray-700'
              }`}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Energy and Stress Levels */}
      {features.moodPatternInsights && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Energy & Stress Levels</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level: {energyLevel}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-red-200 to-green-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stress Level: {stressLevel}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-green-200 to-red-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      {features.moodPatternInsights && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Feeling Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Journal Entry */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
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
            onClick={saveMoodEntry}
            className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-blue-600 transition-all duration-200"
            disabled={!journalEntry.trim()}
          >
            Save Entry
          </button>
        </div>
      </div>

      {/* Recent Entries */}
      {features.moodPatternInsights && recentEntries.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Recent Patterns</h3>
          </div>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="p-3 bg-white/40 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{moods.find(m => m.value === entry.mood_rating)?.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">
                      Mood: {entry.mood_rating}/8
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-600 italic truncate">{entry.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMoodJournal;
