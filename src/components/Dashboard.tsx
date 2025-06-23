
import React, { useState, useEffect } from 'react';
import { Heart, Leaf, Brain, Users, Sparkles, Mountain, Crown, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import WellnessAd from './WellnessAd';
import MoodTrends from './MoodTrends';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useNotifications } from '@/hooks/useNotifications';
import AnimatedCard from './ui/AnimatedCard';
import GradientButton from './ui/GradientButton';
import ProgressRing from './ui/ProgressRing';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, subscription, signOut } = useAuth();
  const { features, showAds, currentPlan, isInFreeTrial } = useSubscriptionFeatures();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const { requestPermission, scheduleDailyReminder } = useNotifications();
  const [recentAssessment, setRecentAssessment] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  console.log('📊 Dashboard rendered for user:', user?.email, 'Plan:', currentPlan);
  
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

    console.log('📈 Fetching recent assessment for user:', user.email);
    try {
      const { data, error } = await supabase
        .from('needs_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        console.log('✅ Assessment data loaded:', Object.keys(data));
        setRecentAssessment(data);
      } else {
        console.log('📄 No assessment data found');
      }
    } catch (error) {
      console.error('❌ Error fetching assessment:', error);
    }
  };

  const handleSignOut = async () => {
    console.log('🚪 User signing out');
    await signOut();
    navigate('/auth');
  };

  const getPlanBadge = () => {
    if (currentPlan === 'ad_free') {
      return <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">Ad-Free</span>;
    } else if (isInFreeTrial) {
      return <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">Free Trial</span>;
    } else {
      return <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">Free</span>;
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
                onClick={toggleDarkMode}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
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

      {/* Google Ad */}
      {showAds && <WellnessAd position="inline" />}

      <AnimatedCard className="p-6 mb-6" delay={100}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-soft">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Today's Intention</h2>
          <p className="text-gray-600 italic mb-4">"I choose to nurture my whole self with love and compassion"</p>
          <GradientButton 
            onClick={() => navigate('/assessment')}
            size="sm"
            variant="primary"
          >
            Take Assessment
          </GradientButton>
        </div>
      </AnimatedCard>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {needCategories.map((category, index) => {
          const Icon = category.icon;
          const progress = (category.score / category.total) * 100;
          
          return (
            <AnimatedCard key={category.id} className="p-4" delay={200 + index * 50} hover={true}>
              <div className="text-center">
                <ProgressRing 
                  progress={progress} 
                  size={80} 
                  strokeWidth={6}
                  color={category.color.includes('red') ? '#ef4444' : 
                         category.color.includes('green') ? '#10b981' :
                         category.color.includes('blue') ? '#3b82f6' :
                         category.color.includes('purple') ? '#8b5cf6' :
                         category.color.includes('amber') ? '#f59e0b' : '#06b6d4'}
                >
                  <div className="text-center">
                    <Icon className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                    <p className="text-xs font-bold text-gray-800">{category.score}/{category.total}</p>
                  </div>
                </ProgressRing>
                <h3 className="font-semibold text-gray-800 mt-3 text-sm">{category.name}</h3>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      <AnimatedCard className="p-6" delay={600}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personalized Suggestions
        </h2>
        <div className="space-y-3">
          {needCategories.slice(0, 3).map((category, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/40 rounded-xl">
              <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Personalized ${category.name.toLowerCase()} practice based on your progress
                </p>
                <span className="text-xs text-gray-500">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-700 font-medium">
            ✨ AI-powered suggestions based on your assessment patterns
          </p>
        </div>
        
        {/* Mood Trends */}
        <div className="mt-6">
          <MoodTrends />
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Dashboard;
