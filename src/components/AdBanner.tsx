import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdBanner = ({ position = 'bottom' }: { position?: 'top' | 'bottom' | 'inline' }) => {
  const navigate = useNavigate();

  const adContent = {
    top: "🌟 Upgrade to Ad-Free for $7/month - Support WholeMe!",
    bottom: "Remove ads • $7/month • Tap to upgrade",
    inline: "💝 Love WholeMe? Remove ads for $7/month"
  };

  return (
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 ${
      position === 'bottom' ? 'fixed bottom-16 left-0 right-0 z-40' : 'mb-4'
    } ${position === 'inline' ? 'rounded-xl' : ''}`}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex-1">
          <p className="text-sm font-medium">{adContent[position]}</p>
        </div>
        <button
          onClick={() => navigate('/pricing')}
          className="ml-3 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default AdBanner;