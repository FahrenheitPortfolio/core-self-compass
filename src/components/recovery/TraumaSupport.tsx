import React, { useState } from 'react';
import { Shield, Heart, Phone, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import TherapistShare from '../TherapistShare';
import AnimatedCard from '../ui/AnimatedCard';
import GradientButton from '../ui/GradientButton';

const TraumaSupport = () => {
  const { user } = useAuth();
  const [currentTrigger, setCurrentTrigger] = useState('');
  const [intensityLevel, setIntensityLevel] = useState(5);

  const groundingTechniques = [
    {
      name: "5-4-3-2-1 Technique",
      description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
      duration: "2-3 minutes"
    },
    {
      name: "Box Breathing",
      description: "Breathe in 4, hold 4, out 4, hold 4",
      duration: "5 minutes"
    },
    {
      name: "Safe Space Visualization",
      description: "Imagine your safest, most peaceful place",
      duration: "5-10 minutes"
    }
  ];

  const crisisResources = [
    { name: "Crisis Text Line", contact: "Text HOME to 741741", available: "24/7" },
    { name: "National Suicide Prevention", contact: "988", available: "24/7" },
    { name: "RAINN Hotline", contact: "1-800-656-4673", available: "24/7" }
  ];

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-xl font-bold text-gray-800">Trauma Support</h1>
      </div>

      {/* Crisis Alert */}
      <AnimatedCard className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 p-4 mb-6" delay={100}>
        <div className="flex items-center mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="font-semibold text-red-800">In Crisis?</h3>
        </div>
        <p className="text-red-700 text-sm mb-3">If you're having thoughts of self-harm, please reach out immediately:</p>
        <div className="space-y-2">
          {crisisResources.map((resource, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-2 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{resource.name}</p>
                <p className="text-sm text-gray-600">{resource.contact}</p>
              </div>
              <span className="text-xs text-green-600">{resource.available}</span>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Grounding Techniques */}
      <AnimatedCard className="p-6 mb-6" delay={200}>
        <h3 className="font-semibold text-gray-800 mb-4">Grounding Techniques</h3>
        <div className="space-y-3">
          {groundingTechniques.map((technique, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{technique.name}</h4>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {technique.duration}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{technique.description}</p>
              <GradientButton 
                size="sm" 
                variant="primary"
                onClick={() => console.log(`Starting ${technique.name}`)}
              >
                Start Exercise
              </GradientButton>
            </div>
          ))}
        </div>
      </AnimatedCard>
      
      {/* Therapist Share */}
      <AnimatedCard delay={300}>
        <TherapistShare />
      </AnimatedCard>
    </div>
  );
};

export default TraumaSupport;