
import { useAuth } from '@/contexts/AuthContext';

export const useSubscriptionFeatures = () => {
  const { subscription } = useAuth();

  const features = {
    // Basic features (free)
    dailyNeedsAssessment: true,
    basicMoodTracking: true,
    guidedMeditations: subscription?.plan ? 3 : 3,
    personalReflection: true,
    communityReadOnly: true,

    // Premium features
    advancedAnalytics: subscription?.plan === 'premium' || subscription?.plan === 'pro',
    unlimitedGuidedContent: subscription?.plan === 'premium' || subscription?.plan === 'pro',
    personalizedRituals: subscription?.plan === 'premium' || subscription?.plan === 'pro',
    moodPatternInsights: subscription?.plan === 'premium' || subscription?.plan === 'pro',
    communityParticipation: subscription?.plan === 'premium' || subscription?.plan === 'pro',
    weeklyReports: subscription?.plan === 'premium' || subscription?.plan === 'pro',

    // Pro features
    coachingSessions: subscription?.plan === 'pro',
    customMeditations: subscription?.plan === 'pro',
    advancedHabitTracking: subscription?.plan === 'pro',
    priorityCommunity: subscription?.plan === 'pro',
    dataExport: subscription?.plan === 'pro',
    earlyAccess: subscription?.plan === 'pro',
  };

  const isPremium = subscription?.plan === 'premium' || subscription?.plan === 'pro';
  const isPro = subscription?.plan === 'pro';
  const isBasic = !subscription || subscription?.plan === 'basic';

  return {
    features,
    isPremium,
    isPro,
    isBasic,
    currentPlan: subscription?.plan || 'basic',
  };
};
