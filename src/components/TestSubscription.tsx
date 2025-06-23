import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TestSubscription = () => {
  const { user, refreshSubscription } = useAuth();

  const setTestSubscription = async (plan: 'basic' | 'premium' | 'pro') => {
    if (!user) return;

    try {
      // Delete existing subscription
      await supabase
        .from('subscriptions')
        .delete()
        .eq('user_id', user.id);

      // Insert test subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan: plan,
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        });

      if (error) throw error;

      await refreshSubscription();
      toast.success(`Test ${plan} subscription activated!`);
    } catch (error) {
      console.error('Error setting test subscription:', error);
      toast.error('Failed to set test subscription');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Test Subscription Plans</h2>
      <div className="space-y-3">
        <button
          onClick={() => setTestSubscription('basic')}
          className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
        >
          <div className="font-medium">Basic Plan</div>
          <div className="text-sm text-gray-600">Free features only</div>
        </button>
        
        <button
          onClick={() => setTestSubscription('premium')}
          className="w-full p-3 bg-purple-100 hover:bg-purple-200 rounded-lg text-left"
        >
          <div className="font-medium">Premium Plan</div>
          <div className="text-sm text-gray-600">Advanced analytics, mood patterns</div>
        </button>
        
        <button
          onClick={() => setTestSubscription('pro')}
          className="w-full p-3 bg-rose-100 hover:bg-rose-200 rounded-lg text-left"
        >
          <div className="font-medium">Pro Plan</div>
          <div className="text-sm text-gray-600">All features, AI insights, community</div>
        </button>
      </div>
    </div>
  );
};

export default TestSubscription;