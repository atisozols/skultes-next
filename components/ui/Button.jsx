'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles for all buttons
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent text-background hover:bg-accent/90',
        outline: 'border border-accent text-accent hover:bg-accent/10',
        ghost: 'text-accent hover:bg-accent/10',
        link: 'text-accent underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-2.5',
        sm: 'px-3 py-1.5 text-sm',
        lg: 'px-6 py-3',
        xl: 'px-7 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// The Button component can be used as a button or a link
const Button = forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      withArrow = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    // Common props for both button and link versions
    const commonProps = {
      className: cn(buttonVariants({ variant, size }), className),
      ref,
      ...props,
    };

    // Content including optional arrow
    const content = (
      <>
        {children}
        {withArrow && <FiArrowRight className="text-xl" />}
      </>
    );

    // Return a Link if href is provided, otherwise a button
    if (href) {
      return (
        <Link href={href} {...commonProps}>
          {content}
        </Link>
      );
    }

    return (
      <button onClick={onClick} type="button" {...commonProps}>
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
