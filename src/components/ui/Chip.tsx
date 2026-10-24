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
    'inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-[15px] font-medium rounded-none border-0 transition-transform duration-[140ms] active:scale-[0.98] cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2';

  const stateStyles = selected
    ? 'bg-[var(--ink)] text-white'
    : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[#e8e8e4] active:bg-[#deded8]';

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
