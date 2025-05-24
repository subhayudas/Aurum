"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Interactive3DCard from './Interactive3DCard';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}

const Carousel3D: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Carousel items
  const items: CarouselItem[] = [
    {
      id: 1,
      title: "Private Beach Access",
      description: "Enjoy exclusive access to our pristine private beach with personalized service and amenities.",
      icon: "🏖️",
      color: "#FF9800",
      imageUrl: "/beach.webp"
    },
    {
      id: 2,
      title: "Helicopter Tours",
      description: "Experience breathtaking aerial views of the surrounding landscape with our exclusive helicopter tours.",
      icon: "🚁",
      color: "#2196F3",
      imageUrl: "/helicopter.webp"
    },
    {
      id: 3,
      title: "Luxury Yacht Rental",
      description: "Explore the waters in style with our luxury yacht rental service, complete with crew and catering.",
      icon: "⛵",
      color: "#9C27B0",
      imageUrl: "/yacht.webp"
    },
    {
      id: 4,
      title: "Golf Course",
      description: "Perfect your swing at our championship 18-hole golf course designed by renowned architects.",
      icon: "⛳",
      color: "#4CAF50",
      imageUrl: "/golf.webp"
    },
    {
      id: 5,
      title: "Tennis Courts",
      description: "Stay active on our professional-grade tennis courts with coaching available from certified instructors.",
      icon: "🎾",
      color: "#F44336",
      imageUrl: "/tennis.webp"
    }
  ];
  
  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + direction + items.length) % items.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRotate, direction, items.length]);
  
  // Handle navigation
  const handleNext = () => {
    setDirection(1);
    setAutoRotate(false);
    setActiveIndex((prev) => (prev + 1) % items.length);
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 10000);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setAutoRotate(false);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 10000);
  };
  
  // Calculate positions for 3D carousel effect
  const getCardStyles = (index: number) => {
    const diff = (index - activeIndex + items.length) % items.length;
    const normalizedDiff = diff > items.length / 2 ? diff - items.length : diff;
    
    // Calculate rotation and z-position based on item's position relative to active item
    const rotateY = normalizedDiff * 60; // 60 degrees between items
    const z = Math.cos(Math.abs(normalizedDiff) * Math.PI / 3) * 200; // Depth
    const x = Math.sin(normalizedDiff * Math.PI / 3) * 300; // Horizontal position
    const scale = Math.cos(Math.abs(normalizedDiff) * Math.PI / 3) * 0.5 + 0.5; // Scale
    const opacity = Math.cos(Math.abs(normalizedDiff) * Math.PI / 3) * 0.5 + 0.5; // Opacity
    
    return {
      rotateY,
      z,
      x,
      scale,
      opacity,
      zIndex: 100 - Math.abs(normalizedDiff)
    };
  };
  
  return (
    <div className="relative py-24 bg-regal_green overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full bg-golden_yellow/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-golden_yellow/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Section title */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.h2 
          className="font-miracle text-4xl md:text-5xl text-golden_yellow mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Premium Amenities
        </motion.h2>
        
        <motion.div 
          className="h-1 bg-golden_yellow w-24 mx-auto mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        />
        
        <motion.p 
          className="text-white/80 max-w-2xl mx-auto font-helvetica"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Discover our exclusive premium amenities designed to elevate your stay to extraordinary heights.
        </motion.p>
      </div>
      
      {/* 3D Carousel */}
      <div 
        ref={containerRef}
        className="relative h-[500px] perspective-1000 mx-auto"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="relative w-full h-full transform-style-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Carousel items */}
          {items.map((item, index) => {
            const styles = getCardStyles(index);
            
            return (
              <motion.div
                key={item.id}
                className="absolute top-0 left-0 right-0 mx-auto w-full max-w-md"
                initial={false}
                animate={{
                  rotateY: `${styles.rotateY}deg`,
                  x: `${styles.x}px`,
                  z: styles.z,
                  scale: styles.scale,
                  opacity: styles.opacity
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  zIndex: styles.zIndex
                }}
                onClick={() => setActiveIndex(index)}
              >
                <Interactive3DCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  color={item.color}
                  imageUrl={item.imageUrl}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Navigation controls */}
        <div className="absolute bottom-[-80px] left-0 right-0 flex justify-center items-center gap-8 z-50">
          <motion.button
            className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center border border-golden_yellow/30"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <div className="flex gap-2">
            {items.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-golden_yellow' : 'bg-white/30'}`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: index === activeIndex ? [1, 1.2, 1] : 1,
                  transition: { 
                    duration: index === activeIndex ? 1.5 : 0.2,
                    repeat: index === activeIndex ? Infinity : 0,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div>
          
          <motion.button
            className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center border border-golden_yellow/30"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <motion.svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="45" stroke="#FCD043" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="#FCD043" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" stroke="#FCD043" strokeWidth="2" />
        </motion.svg>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <motion.svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <polygon points="50,5 95,50 50,95 5,50" stroke="#FCD043" strokeWidth="2" />
          <polygon points="50,25 75,50 50,75 25,50" stroke="#FCD043" strokeWidth="2" />
        </motion.svg>
      </div>
    </div>
  );
};

export default Carousel3D;
