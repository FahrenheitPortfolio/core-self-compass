
import React from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      author: 'Sarah M.',
      need: 'Social Connection',
      story: 'I reached out to an old friend today after feeling lonely. We talked for an hour and I remembered how healing genuine connection can be.',
      hearts: 12,
      timeAgo: '2h ago'
    },
    {
      id: 2,
      author: 'Alex K.',
      need: 'Self-Care',
      story: 'Instead of scrolling my phone, I took a 20-minute bath with candles. Such a small act of self-love made my whole evening better.',
      hearts: 8,
      timeAgo: '4h ago'
    },
    {
      id: 3,
      author: 'Maya L.',
      need: 'Purpose',
      story: 'Volunteered at the animal shelter today. Seeing those dogs find homes reminded me why compassion matters so much.',
      hearts: 15,
      timeAgo: '1d ago'
    }
  ];

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Community Circle</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Soul Stories</h2>
        <p className="text-gray-600 text-sm">Share and discover how others nurture their needs</p>
      </div>

      <button className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white rounded-2xl p-4 mb-6 shadow-lg hover:from-emerald-500 hover:to-blue-600 transition-all duration-200">
        <div className="flex items-center justify-center space-x-2">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share Your Story</span>
        </div>
      </button>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-800">{story.author}</div>
                <div className="text-sm text-emerald-600 font-medium">{story.need}</div>
              </div>
              <div className="text-xs text-gray-500">{story.timeAgo}</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4 italic">
              "{story.story}"
            </p>
            
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{story.hearts}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Support</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">🌟 Community Guidelines</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Share with love and vulnerability</li>
          <li>• Support others without judgment</li>
          <li>• Respect privacy and boundaries</li>
          <li>• Celebrate small wins and growth</li>
        </ul>
      </div>
    </div>
  );
};

export default Community;
