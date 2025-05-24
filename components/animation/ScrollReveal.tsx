'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideRight' | 'slideLeft' | 'scale' | 'rotate';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
  once = false,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'slideUp' ? 50 : 0,
      x: variant === 'slideRight' ? -50 : variant === 'slideLeft' ? 50 : 0,
      scale: variant === 'scale' ? 0.8 : 1,
      rotate: variant === 'rotate' ? -10 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth animation
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;