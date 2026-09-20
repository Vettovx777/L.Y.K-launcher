import { HTMLAttributes } from 'react';
import { cn } from './Button';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]',
    secondary: 'bg-[var(--bg-surface-elevated)] text-[var(--text-main)] hover:bg-[var(--bg-surface-hover)]',
    outline: 'text-[var(--text-main)] border border-[var(--border-strong)]',
    success: 'bg-[var(--status-success)] text-white',
    warning: 'bg-[var(--status-warning)] text-[#1a202c]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
