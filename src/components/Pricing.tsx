
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Heart, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import PayPalButton, { usePayPalSubscription } from '@/components/subscription/PayPalIntegration';

const Pricing = () => {
  const navigate = useNavigate();
  const { user, subscription } = useAuth();
  const { currentPlan } = useSubscriptionFeatures();
  const { handlePayPalSuccess } = usePayPalSubscription();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "All features with ads",
      features: [
        "Complete wellness assessment",
        "Advanced mood & energy tracking",
        "AI-powered insights & patterns",
        "Personalized suggestions",
        "Community access & sharing",
        "Data export & analytics",
        "Includes ads"
      ],
      icon: Heart,
      color: "blue",
      popular: false,
      planId: null
    },
    {
      name: "Ad-Free",
      price: billingCycle === 'monthly' ? "$7/month" : "$60/year",
      description: billingCycle === 'monthly' ? "Support WholeMe & remove ads" : "Save $24/year & remove ads",
      features: [
        "All features (same as free)",
        "No ads",
        "Support app development",
        billingCycle === 'monthly' ? "Monthly subscription" : "Annual subscription (save $24)",
        "Feel good about supporting wellness"
      ],
      icon: Crown,
      color: "green",
      popular: false,
      planId: billingCycle === 'monthly' ? "P-AD-FREE-MONTHLY" : "P-AD-FREE-ANNUAL"
    }
  ];

  const handleSubscribe = (planName: string, planId: string | null) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (planName === 'Basic') {
      // Basic plan is already active for all users
      navigate('/');
      return;
    }

    // PayPal integration will handle the subscription
    if (planId) {
      console.log(`Initiating PayPal subscription for ${planName}`);
    }
  };

  const getCurrentPlanBadge = (planName: string) => {
    if (currentPlan === planName.toLowerCase()) {
      return (
        <div className="absolute top-3 right-3">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Current Plan
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 pb-20">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-xl p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  billingCycle === 'monthly' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  billingCycle === 'annual' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save $24
                </span>
              </button>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-emerald-600 mb-4"
          >
            ← Back to Home
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-800">Remove Ads Forever</h1>
          </div>
          <p className="text-gray-600">All features are free! Just $7/month to remove ads & support WholeMe</p>
          {user && subscription && (
            <p className="text-sm text-emerald-600 font-medium mt-2">
              Current Plan: {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="px-6 space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            const isCurrentPlan = currentPlan === plan.name.toLowerCase();
            
            return (
              <div 
                key={plan.name}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-200 ${
                  isPopular 
                    ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg' 
                    : isCurrentPlan
                    ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white/60'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                {getCurrentPlanBadge(plan.name)}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-${plan.color}-100`}>
                      <Icon className={`w-6 h-6 text-${plan.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                      <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{plan.description}</p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <Button 
                    className="w-full bg-green-500 text-white font-medium py-3 rounded-xl cursor-not-allowed"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : plan.name === 'Free' ? (
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Get Started Free
                  </Button>
                ) : plan.planId ? (
                  <PayPalButton
                    planId={plan.planId}
                    planName={plan.name}
                    amount={billingCycle === 'monthly' ? '7.00' : '60.00'}
                    onSuccess={(subscriptionId) => 
                      handlePayPalSuccess(subscriptionId, 'ad_free')
                    }
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pt-8 pb-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ✨ Monthly subscription, cancel anytime
            </p>
            <p className="text-sm text-gray-600">
              🌱 Support independent app development
            </p>
            <p className="text-sm text-gray-500">
              💳 Secure payments powered by PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
