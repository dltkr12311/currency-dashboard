import { cn } from '@/lib/utils';

export interface LogoIconProps {
  /** Icon size: sm (24px), md (32px), lg (40px) */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export function LogoIcon({ size = 'md', className }: LogoIconProps) {
  return (
    <div
      className={cn(
        'bg-blue-600 rounded-lg flex items-center justify-center relative',
        sizeClasses[size],
        className
      )}
    >
      {/* Calculator-inspired grid logo */}
      <div className='grid grid-cols-2 gap-0.5'>
        <div className='w-1 h-1 bg-white rounded-sm'></div>
        <div className='w-1 h-1 bg-white/70 rounded-sm'></div>
        <div className='w-1 h-1 bg-white/70 rounded-sm'></div>
        <div className='w-1 h-1 bg-white rounded-sm'></div>
      </div>
      <div className='absolute bottom-1 right-1 w-0.5 h-0.5 bg-white rounded-full'></div>
    </div>
  );
}
