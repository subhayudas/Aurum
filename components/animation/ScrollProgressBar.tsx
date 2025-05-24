'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
  showPercentage?: boolean;
  barStyle?: 'solid' | 'gradient';
  gradientColors?: string[];
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  color = '#FCD043',
  height = 4,
  position = 'top',
  zIndex = 50,
  showPercentage = false,
  barStyle = 'solid',
  gradientColors = ['#FCD043', '#313F38'],
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Add spring physics for smoother animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setScrollPercentage(Math.round(value * 100));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Generate gradient if needed
  const backgroundStyle = barStyle === 'gradient' 
    ? { background: `linear-gradient(to right, ${gradientColors.join(', ')})` }
    : { backgroundColor: color };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0"
        style={{
          top: position === 'top' ? 0 : 'auto',
          bottom: position === 'bottom' ? 0 : 'auto',
          height,
          transformOrigin: 'left',
          scaleX,
          zIndex,
          ...backgroundStyle,
        }}
      />
      
      {showPercentage && (
        <div 
          className="fixed right-4 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold shadow-md"
          style={{
            top: position === 'top' ? '10px' : 'auto',
            bottom: position === 'bottom' ? '10px' : 'auto',
            zIndex,
            color: color,
          }}
        >
          {scrollPercentage}%
        </div>
      )}
    </>
  );
};

export default ScrollProgressBar;