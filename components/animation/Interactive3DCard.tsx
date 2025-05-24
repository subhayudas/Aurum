'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Interactive3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Controls the intensity of the 3D effect
  glareEnabled?: boolean; // Enable/disable glare effect
  glareColor?: string; // Color of the glare
  borderRadius?: string; // Border radius of the card
  perspective?: number; // Perspective value for 3D effect
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  intensity = 15,
  glareEnabled = true,
  glareColor = 'rgba(255, 255, 255, 0.4)',
  borderRadius = '1rem',
  perspective = 800,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smoother animation
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig);
  
  // Glare effect position
  const glareX = useSpring(useTransform(mouseX, [0, 1], [-100, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [0, 1], [-100, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (0 to 1)
    const normalizedX = (e.clientX - rect.left) / width;
    const normalizedY = (e.clientY - rect.top) / height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to neutral position
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          borderRadius,
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
              borderRadius,
              opacity: 0.6,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Interactive3DCard;