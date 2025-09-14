'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { FaPlus } from 'react-icons/fa6';

/**
 * PlusToggleButton
 * A small wrapper around our Button that shows text and a rotating + icon.
 *
 * Props:
 * - isOpen: boolean (controls text and icon rotation)
 * - onClick: () => void
 * - openText: string (default: 'Aizvērt')
 * - closedText: string (default: 'Papildināt')
 * - variant: Button variant (default: 'outline')
 * - size: Button size (default: 'sm')
 * - className: string (additional classes)
 * - ariaExpanded: boolean (sets aria-expanded)
 * - icon: React component for the icon (default: FaPlus)
 * - iconClassName: string (classes applied to icon)
 */
const PlusToggleButton = forwardRef(
  (
    {
      isOpen,
      onClick,
      openText = 'Aizvērt',
      closedText = 'Papildināt',
      variant = 'secondary',
      size = 'sm',
      className = '',
      ariaExpanded,
      icon: Icon = FaPlus,
      iconClassName = 'text-sm',
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        aria-expanded={ariaExpanded ?? isOpen}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        <span className="text-sm">{isOpen ? openText : closedText}</span>
        <motion.div animate={{ rotate: isOpen ? -135 : 0 }} transition={{ duration: 0.25 }}>
          <Icon className={iconClassName} />
        </motion.div>
      </Button>
    );
  },
);

PlusToggleButton.displayName = 'PlusToggleButton';

export default PlusToggleButton;
