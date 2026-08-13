import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  duprRating?: number;
  isOnline?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  duprRating,
  isOnline,
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeMap[size]} rounded-full object-cover border-2 border-white shadow-sm dark:border-slate-800`}
      />
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-slate-800 ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-300'
          } ${size === 'xl' ? 'w-4 h-4' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}`}
        />
      )}
      {duprRating !== undefined && size !== 'xs' && (
        <span className="absolute -bottom-1 -right-1 bg-slate-900 text-lime-400 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full border border-lime-400/50 shadow-xs">
          {duprRating.toFixed(2)}
        </span>
      )}
    </div>
  );
};
