type BadgeProps = {
  className?: string;
  text: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function Badge({ 
  className = '', 
  text, 
  variant = 'info', 
  rounded = false, 
  size = 'md' 
}: BadgeProps) {
  const baseClasses = `${className} text-nowrap w-full font-medium inline-flex cursor-pointer items-center justify-center`;
  const roundedClasses = rounded ? 'rounded-full' : '';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }[size];
  
  const variantClasses = {
    info: 'text-primary bg-primary-100',
    success: 'text-secondary bg-secondary-100',
    warning: 'text-warning bg-warning-100',
    error: 'text-error bg-error-100'
  }[variant];

  const BadgeClasses = `${baseClasses} ${roundedClasses} ${sizeClasses} ${variantClasses}`.trim();

  return <span className={BadgeClasses}>{text}</span>;
}