import React from 'react';
import GoogleAd from './GoogleAd';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';

interface WellnessAdProps {
  position: 'banner' | 'inline' | 'bottom';
  className?: string;
}

const WellnessAd: React.FC<WellnessAdProps> = ({ position, className = '' }) => {
  const { showAds } = useSubscriptionFeatures();

  if (!showAds) return null;

  const getAdConfig = () => {
    switch (position) {
      case 'banner':
        return {
          adSlot: '1234567890', // Replace with your ad slot ID
          style: { width: '100%', height: '90px' },
          adFormat: 'horizontal' as const
        };
      case 'inline':
        return {
          adSlot: '2345678901', // Replace with your ad slot ID
          style: { width: '100%', height: '250px' },
          adFormat: 'rectangle' as const
        };
      case 'bottom':
        return {
          adSlot: '3456789012', // Replace with your ad slot ID
          style: { width: '100%', height: '50px' },
          adFormat: 'horizontal' as const
        };
      default:
        return {
          adSlot: '1234567890',
          style: { width: '100%', height: '90px' },
          adFormat: 'auto' as const
        };
    }
  };

  const adConfig = getAdConfig();

  return (
    <div className={`wellness-ad ${className} ${
      position === 'bottom' ? 'fixed bottom-16 left-0 right-0 z-40 bg-white shadow-lg' : 'mb-4'
    }`}>
      <div className="max-w-md mx-auto">
        <GoogleAd
          adSlot={adConfig.adSlot}
          adFormat={adConfig.adFormat}
          style={adConfig.style}
          className="rounded-lg overflow-hidden"
        />
        {position !== 'bottom' && (
          <p className="text-xs text-gray-400 text-center mt-1">Advertisement</p>
        )}
      </div>
    </div>
  );
};

export default WellnessAd;