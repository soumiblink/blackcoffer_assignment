'use client';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse
        bg-gradient-to-r from-white/5 via-white/10 to-white/5
        bg-[length:200%_100%]
        rounded-xl
        ${className}
      `}
      style={{
        animation: 'shimmer 2s infinite',
      }}
    />
  );
}
