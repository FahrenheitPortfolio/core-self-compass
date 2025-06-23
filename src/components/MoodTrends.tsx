import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const MoodTrends = () => {
  const { user } = useAuth();
  const [trendData, setTrendData] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    if (user) {
      fetchTrendData();
    }
  }, [user, timeRange]);

  const fetchTrendData = async () => {
    if (!user) return;

    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('mood_rating, energy_level, created_at')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      const processedData = data?.map(entry => ({
        date: new Date(entry.created_at).toLocaleDateString(),
        mood: entry.mood_rating,
        energy: entry.energy_level
      })) || [];

      setTrendData(processedData);
    } catch (error) {
      console.error('Error fetching trend data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800">Mood Trends</h3>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-sm border border-purple-200 rounded-lg px-3 py-2 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        >
          <option value="7d">7 Days</option>
          <option value="30d">30 Days</option>
          <option value="90d">90 Days</option>
        </select>
      </div>

      {trendData.length > 0 ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[1, 8]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Energy"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center animate-float">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-600">No mood data yet</p>
            <p className="text-sm text-gray-500 mt-1">Start journaling to see trends</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrends;