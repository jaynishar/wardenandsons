import React from 'react';

export type ButtonVariant = 'primary' | 'whatsapp' | 'secondary' | 'link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      href,
      target,
      rel,
      fullWidth = false,
      className = '',
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors select-none text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'h-12 min-h-[48px] px-6 rounded-[4px] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[#203155] active:bg-[#0f172a]',
      whatsapp:
        'h-12 min-h-[48px] px-6 rounded-[4px] bg-[var(--wa)] text-white hover:bg-[#0c6641] active:bg-[#095234]',
      secondary:
        'h-12 min-h-[48px] px-6 rounded-[4px] border border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--paper)] active:bg-[var(--line)]',
      link:
        'h-auto min-h-0 p-0 rounded-none bg-transparent text-[var(--ink)] hover:text-[var(--blue)] underline underline-offset-4',
    };

    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`.trim();

    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('https://wa.me');
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target ?? (isExternal ? '_blank' : undefined)}
          rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
          className={combinedClassName}
          aria-disabled={disabled}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
