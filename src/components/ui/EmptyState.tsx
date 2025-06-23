import React from 'react';
import { LucideIcon } from 'lucide-react';
import GradientButton from './GradientButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center animate-float">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {actionText && onAction && (
        <GradientButton onClick={onAction} variant="primary">
          {actionText}
        </GradientButton>
      )}
    </div>
  );
};

export default EmptyState;