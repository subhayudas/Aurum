'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxEffectProps {
  children: ReactNode;
  speed?: number; // Speed of parallax effect (negative values move opposite to scroll)
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Create transform based on direction
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? [0, speed * 100] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? [0, speed * 100] : [0, 0]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y, x }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxEffect;