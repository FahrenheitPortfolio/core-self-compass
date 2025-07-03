
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PayPalButtonProps {
  planId: string;
  planName: string;
  amount: string;
  onSuccess: (subscriptionId: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ planId, planName, amount, onSuccess }) => {
  const { user } = useAuth();

  const handlePayPalSubscription = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    // Simulate PayPal subscription flow
    toast.info('Redirecting to PayPal...');
    
    // In a real implementation, this would redirect to PayPal
    // For now, we'll simulate a successful subscription
    setTimeout(() => {
      const mockSubscriptionId = `PAYPAL_${Date.now()}`;
      onSuccess(mockSubscriptionId);
    }, 2000);
  };

  return (
    <Button 
      onClick={handlePayPalSubscription}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200"
    >
      Subscribe with PayPal - {amount}
    </Button>
  );
};

export const usePayPalSubscription = () => {
  const { user, refreshSubscription } = useAuth();

  const handlePayPalSuccess = async (subscriptionId: string, planType: 'ad_free' | 'premium' | 'pro') => {
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    try {
      console.log(`Processing PayPal subscription: ${subscriptionId} for plan: ${planType}`);
      
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          plan: planType,
          status: 'active',
          paypal_subscription_id: subscriptionId,
          started_at: new Date().toISOString(),
        });

      if (error) throw error;

      await refreshSubscription();
      toast.success(`Successfully subscribed to ${planType} plan!`);
    } catch (error) {
      console.error('Error processing PayPal subscription:', error);
      toast.error('Error processing subscription');
    }
  };

  return { handlePayPalSuccess };
};

export default PayPalButton;
