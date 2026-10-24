import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Warden & Sons UI Chip — Redesign V2
 * Square (0 radius), filled --surface, selected = ink with white text.
 * No outlines, no hairlines.
 */
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
    'inline-flex items-center justify-center min-h-[40px] px-3.5 py-1.5 text-[14px] font-medium rounded-sm border transition-all duration-[120ms] active:scale-[0.98] cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2';

  const stateStyles = selected
    ? 'bg-[var(--ink)] border-[var(--ink)] text-white shadow-xs'
    : 'bg-white border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] active:bg-[var(--surface)]';

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
