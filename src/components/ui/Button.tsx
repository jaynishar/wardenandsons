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
    // 52px tall, square (0 radius), flat, with 3px focus ring
    const baseStyles =
      'inline-flex items-center justify-center font-medium h-[52px] min-h-[52px] px-6 text-[16px] rounded-none border-0 transition-transform duration-[80ms] active:scale-[0.98] select-none text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-3 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--ink)] text-white hover:bg-[#16274a] active:bg-[#091224]',
      whatsapp:
        'bg-[var(--wa)] text-white hover:bg-[#0c6641] active:bg-[#08472d]',
      secondary:
        'bg-[var(--surface)] text-[var(--ink)] hover:bg-[#e8e8e4] active:bg-[#deded8]',
      link:
        'h-auto min-h-0 px-0 py-0 bg-transparent text-[var(--ink)] hover:text-[var(--blue)] underline underline-offset-4 active:scale-100',
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
