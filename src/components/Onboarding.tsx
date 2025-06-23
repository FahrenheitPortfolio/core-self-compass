import React, { useState } from 'react';
import { ArrowRight, Heart, Brain, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const steps = [
    {
      title: "Welcome to WholeMe",
      subtitle: "Your holistic wellness companion",
      content: "Track your complete well-being across 6 dimensions of health",
      icon: Heart
    },
    {
      title: "Understand Yourself",
      subtitle: "AI-powered insights",
      content: "Get personalized suggestions based on your mood patterns and needs",
      icon: Brain
    },
    {
      title: "Join the Community",
      subtitle: "You're not alone",
      content: "Connect with others on their wellness journey and share experiences",
      icon: Users
    },
    {
      title: "Start Your Journey",
      subtitle: "Ready to begin?",
      content: "Let's take your first wellness assessment to understand your current state",
      icon: Sparkles
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      localStorage.setItem('onboarding_completed', 'true');
      navigate('/assessment');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/');
  };

  const currentStep = steps[step - 1];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentStep.title}</h1>
          <p className="text-lg text-emerald-600 font-medium mb-4">{currentStep.subtitle}</p>
          <p className="text-gray-600">{currentStep.content}</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index + 1 <= step ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-emerald-600 hover:to-blue-600 transition-all"
          >
            <span>{step === steps.length ? 'Start Assessment' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;