'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  ringColor?: string;
  trailEffect?: boolean;
  trailCount?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  color = 'rgba(252, 208, 67, 1)',
  size = 8,
  ringSize = 40,
  ringColor = 'rgba(252, 208, 67, 0.2)',
  trailEffect = true,
  trailCount = 5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Mouse position with spring physics for smooth movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trail positions
  const [trail, setTrail] = useState<{x: number, y: number, opacity: number}[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (trailEffect) {
        setTrail(prev => {
          // Add current position to the beginning
          const newTrail = [{ x: e.clientX, y: e.clientY, opacity: 1 }, ...prev];
          // Limit trail length and reduce opacity for older positions
          return newTrail.slice(0, trailCount).map((point, i) => ({
            ...point,
            opacity: 1 - (i / trailCount)
          }));
        });
      }

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = [
        'A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'
      ].includes(target.tagName) || 
      window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, trailCount, trailEffect]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Trail effect */}
      {trailEffect && trail.map((point, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: point.x,
            y: point.y,
            width: size / 2,
            height: size / 2,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: point.opacity * 0.5,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: isVisible ? 1 : 0,
          zIndex: 10000,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: isPointer ? ringSize * 1.2 : ringSize,
          height: isPointer ? ringSize * 1.2 : ringSize,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          backgroundColor: 'transparent',
          opacity: isVisible ? 0.8 : 0,
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;