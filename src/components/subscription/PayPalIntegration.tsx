
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PayPalButtonProps {
  planId: string;
  planName: string;
  amount: string;
  onSuccess: (subscriptionId: string) => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ planId, planName, amount, onSuccess }) => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=test&vault=true&intent=subscription';
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.paypal) return;

    window.paypal.Buttons({
      createSubscription: function(data: any, actions: any) {
        return actions.subscription.create({
          plan_id: planId,
          subscriber: {
            email_address: user?.email,
          },
        });
      },
      onApprove: function(data: any, actions: any) {
        console.log('PayPal subscription approved:', data);
        onSuccess(data.subscriptionID);
        toast.success(`Successfully subscribed to ${planName}!`);
      },
      onError: function(err: any) {
        console.error('PayPal error:', err);
        toast.error('Payment failed. Please try again.');
      },
    }).render(`#paypal-button-${planId}`);
  }, [isLoaded, planId, planName, amount, onSuccess, user]);

  return (
    <div 
      id={`paypal-button-${planId}`}
      className="min-h-[50px] w-full"
    />
  );
};

export const usePayPalSubscription = () => {
  const { user, refreshSubscription } = useAuth();

  const handlePayPalSuccess = async (subscriptionId: string, plan: 'premium' | 'pro') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          plan,
          status: 'active',
          paypal_subscription_id: subscriptionId,
          started_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshSubscription();
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Error processing subscription. Please contact support.');
    }
  };

  return { handlePayPalSuccess };
};

export default PayPalButton;
