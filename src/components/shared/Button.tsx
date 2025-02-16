import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { IconFunction } from '@/routes/navigationLinks';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isLoading?: boolean;
  variant?: 'filled' | 'outlined';
  prefixIcon?: IconFunction;
}

export default function Button({
  type = 'button',
  disabled = false,
  rounded = false,
  size = 'sm',
  variant = 'filled',
  onClick,
  children,
  className = '',
  prefixIcon,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button 
      disabled={disabled} 
      onClick={onClick} 
      type={type} 
      className={`
        ${className}
        inline-flex items-center px-6 justify-center gap-2 w-full
        font-inter transition duration-200 ease-in-out hover:scale-105
        ${disabled ? 'disabled:scale-100 opacity-50 disabled:cursor-not-allowed' : ''}
        ${rounded ? 'rounded-full' : ''}
        ${size === 'sm' ? 'text-xs p-2 font-normal outline-1' : ''}
        ${size === 'md' ? 'text-base p-3 font-medium outline-3' : ''}
        ${size === 'lg' ? 'text-lg p-4 font-medium' : ''}
        ${variant === 'filled' ? 'bg-primary text-white' : ''}
        ${variant === 'outlined' ? 'border border-primary text-primary' : ''}
      `.trim().replace(/\s+/g, ' ')}
    >
      {prefixIcon && prefixIcon?.({})} {children}
    </button>
  );
}