import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  delay = 0 
}) => {
  return (
    <div 
      className={`
        bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20
        transition-all duration-300 ease-out
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1' : ''}
        animate-fade-in-up
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;