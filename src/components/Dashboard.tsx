
import React, { useState, useEffect } from 'react';
import { Heart, Leaf, Brain, Users, Sparkles, Mountain, Crown, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, subscription, signOut } = useAuth();
  const { features, currentPlan } = useSubscriptionFeatures();
  const [recentAssessment, setRecentAssessment] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const needCategories = [
    { 
      id: 'physical', 
      name: 'Physical', 
      icon: Heart, 
      color: 'from-red-400 to-pink-400',
      score: recentAssessment?.physical_score || 3,
      total: 10
    },
    { 
      id: 'emotional', 
      name: 'Emotional', 
      icon: Leaf, 
      color: 'from-green-400 to-emerald-400',
      score: recentAssessment?.emotional_score || 2,
      total: 10
    },
    { 
      id: 'cognitive', 
      name: 'Mental', 
      icon: Brain, 
      color: 'from-blue-400 to-indigo-400',
      score: recentAssessment?.intellectual_score || 4,
      total: 10
    },
    { 
      id: 'social', 
      name: 'Social', 
      icon: Users, 
      color: 'from-purple-400 to-pink-400',
      score: recentAssessment?.social_score || 1,
      total: 10
    },
    { 
      id: 'spiritual', 
      name: 'Spiritual', 
      icon: Sparkles, 
      color: 'from-amber-400 to-orange-400',
      score: recentAssessment?.spiritual_score || 2,
      total: 10
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      icon: Mountain, 
      color: 'from-teal-400 to-cyan-400',
      score: recentAssessment?.creative_score || 3,
      total: 10
    }
  ];

  useEffect(() => {
    if (user) {
      fetchRecentAssessment();
    }
  }, [user]);

  const fetchRecentAssessment = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('needs_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setRecentAssessment(data);
      }
    } catch (error) {
      console.error('Error fetching assessment:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getPlanBadge = () => {
    switch (currentPlan) {
      case 'premium':
        return <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">Premium</span>;
      case 'pro':
        return <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full font-medium">Pro</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Basic</span>;
    }
  };

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              WholeMe
            </h1>
            {getPlanBadge()}
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center hover:from-gray-200 hover:to-gray-300 transition-all"
          >
            <span className="font-medium text-gray-700">
              {profile?.first_name?.[0] || user?.email?.[0] || 'U'}
            </span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-800">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Crown className="w-4 h-4 text-purple-500" />
                <span>Subscription</span>
              </button>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600">Welcome back, {profile?.first_name || 'Beautiful Soul'}</p>
        <p className="text-sm text-gray-500 mt-1">How are you nurturing yourself today?</p>
      </div>

      {/* Upgrade Banner */}
      {currentPlan === 'basic' && (
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6" />
            <div className="flex-1">
              <h3 className="font-semibold">Unlock Your Full Potential</h3>
              <p className="text-sm opacity-90">Upgrade to Premium for advanced analytics & community features</p>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-medium transition-all"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Today's Intention</h2>
        <p className="text-gray-600 italic">"I choose to nurture my whole self with love and compassion"</p>
        <button 
          onClick={() => navigate('/assessment')}
          className="mt-3 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
        >
          Take assessment →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {needCategories.map((category) => {
          const Icon = category.icon;
          const progress = (category.score / category.total) * 100;
          
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
              <p className="text-xs text-gray-600">{category.score}/{category.total}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {features.personalizedRituals ? 'Personalized Suggestions' : 'Gentle Suggestions'}
        </h2>
        <div className="space-y-3">
          {needCategories.slice(0, 3).map((category, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/40 rounded-xl">
              <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  {features.personalizedRituals 
                    ? `Personalized ${category.name.toLowerCase()} practice based on your progress`
                    : `Take 5 minutes for ${category.name.toLowerCase()} self-care`
                  }
                </p>
                <span className="text-xs text-gray-500">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {features.personalizedRituals && (
          <div className="mt-4 p-3 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-700 font-medium">
              ✨ AI-powered suggestions based on your assessment patterns
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
