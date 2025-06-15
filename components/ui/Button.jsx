'use client';

import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import Loader from '@/components/ui/Loader';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles for all buttons
  'inline-flex items-center justify-center gap-2 rounded-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-accent text-background hover:bg-accent/90',
        outline: 'border border-accent text-accent hover:bg-accent/10',
        ghost: 'text-accent hover:bg-accent/10',
        link: 'text-accent underline-offset-4 hover:underline',
        success: 'bg-green-400 text-background',
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
      withArrow = false, // Kept for backward compatibility
      icon = null, // New prop for custom icons
      loading = false,
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

    // Content including optional icon or loader
    const content = (
      <div className="inline-flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={children ? `content-${typeof children === 'string' ? children : 'node'}` : 'empty'}
            layout
            className="inline-flex items-center justify-center gap-2"
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            {children}
            {(icon || withArrow) &&
              (loading ? (
                <motion.span key="loader" className="inline-flex flex-shrink-0" layout>
                  <Loader />
                </motion.span>
              ) : (
                <motion.span key="icon" className="inline-flex flex-shrink-0" layout>
                  {icon || <FiArrowRight className="text-xl" />}
                </motion.span>
              ))}
          </motion.span>
        </AnimatePresence>
      </div>
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
