import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Chip({
  selected = false,
  className = '',
  children,
  onClick,
  disabled,
  type = 'button',
  ...props
}: ChipProps) {
  const baseStyles =
    'inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2';

  const stateStyles = selected
    ? 'bg-[var(--ink)] text-[var(--ivory)] border border-[var(--ink)] shadow-xs'
    : 'bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink-soft)] hover:bg-[#eae3d6]';

  return (
    <button
      type={type}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Chip;
