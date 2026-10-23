import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  as: Component = 'div',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
