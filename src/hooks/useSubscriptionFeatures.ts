
import { useAuth } from '@/contexts/AuthContext';

export const useSubscriptionFeatures = () => {
  const { subscription, user } = useAuth();

  const isAdFree = subscription?.plan === 'ad_free' && subscription?.status === 'active';
  
  // Check if user is in free trial (7 days from signup)
  const isInFreeTrial = user && !subscription ? (() => {
    const signupDate = new Date(user.created_at);
    const trialEndDate = new Date(signupDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return new Date() < trialEndDate;
  })() : false;

  const features = {
    // All features are now free with ads
    dailyNeedsAssessment: true,
    basicMoodTracking: true,
    advancedAnalytics: true,
    unlimitedGuidedContent: true,
    personalizedRituals: true,
    moodPatternInsights: true,
    communityParticipation: true,
    weeklyReports: true,
    coachingSessions: true,
    customMeditations: true,
    advancedHabitTracking: true,
    priorityCommunity: true,
    dataExport: true,
    earlyAccess: true,
    
    // No ads during trial or if ad-free
    showAds: !isAdFree && !isInFreeTrial,
  };

  return {
    features,
    isAdFree,
    isInFreeTrial,
    showAds: !isAdFree && !isInFreeTrial,
    currentPlan: isAdFree ? 'ad_free' : isInFreeTrial ? 'trial' : 'free',
  };
};
