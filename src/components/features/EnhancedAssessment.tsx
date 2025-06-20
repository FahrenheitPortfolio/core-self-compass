
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EnhancedAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { features } = useSubscriptionFeatures();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      category: 'Physical',
      question: 'How well are you taking care of your body lately?',
      options: [
        'I feel energized and strong (8-10)',
        'I have good energy most days (6-7)',
        'I have some energy but could do better (4-5)',
        'I often feel tired or neglect my body (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    },
    {
      category: 'Emotional',
      question: 'How connected are you to your feelings?',
      options: [
        'I understand and honor my emotions (8-10)',
        'I\'m aware of my feelings most of the time (6-7)',
        'I sometimes ignore or suppress my emotions (4-5)',
        'I feel disconnected from my emotional self (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    },
    {
      category: 'Social',
      question: 'How fulfilling are your relationships?',
      options: [
        'I feel deeply connected and supported (8-10)',
        'I have good relationships but want deeper connections (6-7)',
        'I feel lonely or misunderstood sometimes (4-5)',
        'I feel isolated or struggle with relationships (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    },
    {
      category: 'Intellectual',
      question: 'How engaged is your mind?',
      options: [
        'I feel mentally stimulated and growing (8-10)',
        'I learn new things regularly (6-7)',
        'I sometimes feel mentally stagnant (4-5)',
        'I rarely challenge myself mentally (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    },
    {
      category: 'Spiritual',
      question: 'How connected do you feel to purpose and meaning?',
      options: [
        'I feel aligned with my purpose (8-10)',
        'I have a sense of meaning most days (6-7)',
        'I sometimes question my purpose (4-5)',
        'I feel lost or without direction (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    },
    {
      category: 'Creative',
      question: 'How are you expressing your creativity?',
      options: [
        'I regularly engage in creative activities (8-10)',
        'I sometimes express my creativity (6-7)',
        'I rarely make time for creative expression (4-5)',
        'I feel disconnected from my creative self (1-3)'
      ],
      scores: [9, 6.5, 4.5, 2]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion]: questions[currentQuestion].scores[answerIndex]
    });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await saveAssessment();
    }
  };

  const saveAssessment = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('needs_assessments')
        .insert({
          user_id: user.id,
          physical_score: Math.round(answers[0] || 5),
          emotional_score: Math.round(answers[1] || 5),
          social_score: Math.round(answers[2] || 5),
          intellectual_score: Math.round(answers[3] || 5),
          spiritual_score: Math.round(answers[4] || 5),
          creative_score: Math.round(answers[5] || 5),
        });

      if (error) throw error;

      toast.success('Assessment saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Error saving assessment');
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1 mx-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-500">{currentQuestion + 1}/{questions.length}</span>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          {features.advancedAnalytics ? <BarChart3 className="w-8 h-8 text-white" /> : <Heart className="w-8 h-8 text-white" />}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {features.advancedAnalytics ? 'Advanced Needs Assessment' : 'Needs Assessment'}
        </h1>
        <p className="text-gray-600">Let's discover what your soul needs today</p>
        {features.advancedAnalytics && (
          <p className="text-sm text-emerald-600 font-medium mt-2">✨ Premium Analytics Enabled</p>
        )}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-3">
            {questions[currentQuestion].category}
          </span>
          <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                answers[currentQuestion] === questions[currentQuestion].scores[index]
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 bg-white/40 hover:border-gray-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
            answers[currentQuestion] !== undefined
              ? 'bg-gradient-to-r from-emerald-400 to-blue-500 text-white hover:from-emerald-500 hover:to-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EnhancedAssessment;
