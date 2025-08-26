'use client';

import React, { useId } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function CollapsibleLight({ children, isOpen, toggleOpen }) {
  const panelId = useId();
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full rounded-xl bg-container px-5 py-3 shadow-md">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggleOpen}
      >
        <h2 className="py-2 text-left text-lg font-medium">{children[0]}</h2>

        <motion.div
          className="rounded-full bg-accent p-0.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.25 }}
        >
          <IoIosArrowDown className="relative top-px h-4 w-4 text-background" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            className="overflow-hidden text-lg font-light"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.35,
              opacity: { duration: prefersReduced ? 0 : 0.2 },
            }}
          >
            <div className="py-2">{children[1]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
