"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl?: string;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  title,
  description,
  icon,
  color,
  imageUrl
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  
  // Fallback image
  const fallbackImage = "/bigger-copenhagen.webp";
  
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-[350px] rounded-xl overflow-hidden cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Background image or gradient */}
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-black/80 to-black/40" />
        )}
        <div 
          className="absolute inset-0 bg-gradient-to-t"
          style={{ 
            backgroundImage: `linear-gradient(to top, ${color}99, transparent)`,
            opacity: isHovered ? 0.8 : 0.5
          }}
        />
      </div>
      
      {/* 3D rotating card content */}
      <motion.div
        className="relative z-10 h-full w-full p-6 flex flex-col justify-between"
        style={{
          rotateX: isHovered ? mousePosition.y * -20 : 0,
          rotateY: isHovered ? mousePosition.x * 20 : 0,
          transformStyle: 'preserve-3d'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-start">
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${color}40` }}
            animate={isHovered ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0]
            } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            {icon}
          </motion.div>
          
          <motion.div
            className="w-12 h-12 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L61 36H100L69 59L82 95L50 73L18 95L31 59L0 36H39L50 0Z" stroke={color} strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
        
        <div>
          <motion.h4 
            className="text-2xl font-miracle mb-3" 
            style={{ color }}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {title}
          </motion.h4>
          
          <motion.p 
            className="text-white/90 font-helvetica"
            style={{ 
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
              opacity: isHovered ? 1 : 0.8
            }}
          >
            {description}
          </motion.p>
        </div>
        
        <motion.button
          className="mt-4 px-6 py-3 rounded-full text-sm font-helvetica text-regal_green w-full"
          style={{ 
            backgroundColor: color,
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </motion.div>
      
      {/* Floating particles that appear on hover */}
      {isHovered && [...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ 
            backgroundColor: color,
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{ 
            y: [0, -100],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.7, 0]
          }}
          transition={{ 
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 1
          }}
        />
      ))}
      
      {/* Glowing effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ 
          boxShadow: `0 0 30px ${color}50`,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Interactive3DCard;
