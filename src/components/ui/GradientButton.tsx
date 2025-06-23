import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  loading = false,
  className = ''
}) => {
  const variants = {
    primary: 'from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600',
    secondary: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
    success: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    warning: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
    danger: 'from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        bg-gradient-to-r ${variants[variant]}
        text-white font-medium rounded-xl
        ${sizes[size]}
        transition-all duration-200 ease-out
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center space-x-2
        ${className}
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-5 h-5" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default GradientButton;