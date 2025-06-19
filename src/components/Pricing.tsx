
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Start your journey to wholeness",
      features: [
        "Daily needs assessment",
        "Basic mood tracking",
        "3 guided meditations",
        "Personal reflection prompts",
        "Community circle (read-only)"
      ],
      icon: Heart,
      color: "emerald",
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99/month",
      description: "Deepen your self-care practice",
      features: [
        "Everything in Basic",
        "Advanced needs analytics",
        "Unlimited guided content",
        "Personalized rituals & suggestions",
        "Mood pattern insights",
        "Community participation",
        "Weekly progress reports"
      ],
      icon: Star,
      color: "purple",
      popular: true
    },
    {
      name: "Pro",
      price: "$19.99/month",
      description: "Transform your life completely",
      features: [
        "Everything in Premium",
        "1-on-1 coaching sessions",
        "Custom meditation recordings",
        "Advanced habit tracking",
        "Priority community features",
        "Export your data",
        "Early access to new features"
      ],
      icon: Sparkles,
      color: "rose",
      popular: false
    }
  ];

  const handleSubscribe = (planName: string) => {
    // This would integrate with payment processing
    console.log(`Subscribe to ${planName} plan`);
    // For now, just show a toast or modal
    alert(`${planName} subscription coming soon! 🌱`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 pb-20">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <button 
            onClick={() => navigate('/')}
            className="text-emerald-600 mb-4"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Path</h1>
          <p className="text-gray-600">Invest in your wholeness and unlock your potential</p>
        </div>

        {/* Pricing Cards */}
        <div className="px-6 space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <div 
                key={plan.name}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-200 ${
                  isPopular 
                    ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg' 
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

                <Button 
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full ${
                    isPopular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : plan.name === 'Basic'
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-gray-800 hover:bg-gray-900'
                  } text-white font-medium py-3 rounded-xl transition-all duration-200`}
                >
                  {plan.name === 'Basic' ? 'Get Started Free' : `Choose ${plan.name}`}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pt-8 pb-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ✨ 7-day free trial for all paid plans
            </p>
            <p className="text-sm text-gray-600">
              🌱 Cancel anytime, keep your growth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
