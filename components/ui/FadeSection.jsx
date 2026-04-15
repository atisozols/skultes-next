'use client';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

export default function FadeSection({ children, delay = 0, className = '' }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={`w-full ${className}`}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT_QUART }}
    >
      {children}
    </motion.div>
  );
}
