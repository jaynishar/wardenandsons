import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

const baseIconProps = (props: IconProps) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  width: props.size ?? 24,
  height: props.size ?? 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': props['aria-hidden'] ?? true,
  ...props,
});

export function IconSearch(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <line x1="3.5" y1="7" x2="20.5" y2="7" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="3.5" y1="17" x2="20.5" y2="17" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-13 7.3L3.5 20.5l1.7-3.9A8.5 8.5 0 1 1 20.5 11.5z" />
      <path d="M9.5 8.5c-.3 0-.7.1-.9.5-.3.5-.8 1.4-.8 2.2 0 1.6 1.2 3.1 2.5 4.3 1.3 1.3 2.7 2.4 4.3 2.4.9 0 1.7-.5 2.2-.8.4-.2.5-.6.5-.9l-.6-1.5c-.1-.3-.4-.4-.7-.3l-1.1.5c-.3.1-.6 0-.8-.2-.7-.5-1.5-1.3-2-2-.2-.2-.2-.5-.1-.8l.5-1.1c.1-.3 0-.6-.3-.7L9.5 8.5z" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...baseIconProps(props)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export interface IconChevronProps extends IconProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function IconChevron({ direction = 'down', ...props }: IconChevronProps) {
  const points = {
    down: '6 9 12 15 18 9',
    up: '18 15 12 9 6 15',
    left: '15 18 9 12 15 6',
    right: '9 18 15 12 9 6',
  }[direction];

  return (
    <svg {...baseIconProps(props)}>
      <polyline points={points} />
    </svg>
  );
}
