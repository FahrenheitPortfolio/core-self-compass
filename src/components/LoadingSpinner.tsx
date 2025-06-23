import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'gray';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue',
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;