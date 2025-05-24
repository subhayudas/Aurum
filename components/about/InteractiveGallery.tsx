"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const InteractiveGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const galleryImages: GalleryImage[] = [
    {
      src: "/villa1.webp",
      alt: "Luxury Villa",
      title: "Exclusive Villas",
      description: "Our spacious villas offer privacy and luxury with stunning views."
    },
    {
      src: "/spa.webp",
      alt: "Spa Treatment",
      title: "Rejuvenating Spa",
      description: "Indulge in our signature treatments for ultimate relaxation."
    },
    {
      src: "/dining.webp",
      alt: "Fine Dining",
      title: "Exquisite Dining",
      description: "Savor culinary masterpieces prepared by our world-class chefs."
    },
    {
      src: "/pool.webp",
      alt: "Infinity Pool",
      title: "Infinity Pool",
      description: "Swim in our stunning infinity pool overlooking natural beauty."
    }
  ];
  
  // Fallback images if the specified ones don't exist
  const fallbackImages = [
    "/bigger-copenhagen.webp",
    "/space-copenhagen.webp",
    "/heroImage.webp",
    "/bigger-copenhagen.webp"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    // Auto-advance gallery
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(interval);
    };
  }, [galleryImages.length]);
  
  // Calculate parallax and rotation effects based on mouse position
  const getImageTransform = (index: number) => {
    const isActive = index === activeIndex;
    const depth = isActive ? 1 : 0.5;
    
    const x = (mousePosition.x - 0.5) * 20 * depth;
    const y = (mousePosition.y - 0.5) * 20 * depth;
    const rotateY = (mousePosition.x - 0.5) * 10 * depth;
    const rotateX = (mousePosition.y - 0.5) * -10 * depth;
    
    return {
      x,
      y,
      rotateX,
      rotateY,
      scale: isActive ? 1 : 0.8,
      opacity: isActive ? 1 : 0.3,
      zIndex: isActive ? 10 : 0
    };
  };
  
  // Handle image error by using fallback
  const handleImageError = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImages[index % fallbackImages.length];
  };

  return (
    <div className="py-16 bg-regal_green relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-3xl md:text-4xl font-miracle mb-12 text-golden_yellow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Resort
        </motion.h2>
        
        {/* 3D Gallery */}
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] perspective-1000 mx-auto max-w-5xl"
          style={{ perspective: '1000px' }}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-golden_yellow blur-3xl opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Gallery images */}
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={getImageTransform(index)}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                opacity: { duration: 0.5 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative w-full h-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => handleImageError(index, e)}
                  className="w-full h-full object-cover"
                />
                
                {/* Content overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8"
                  animate={{ opacity: index === activeIndex ? 1 : 0 }}
                >
                  <h3 className="text-golden_yellow text-2xl md:text-3xl font-miracle mb-2">{image.title}</h3>
                  <p className="text-white font-helvetica">{image.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {galleryImages.map((_, index) => (
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
        </div>
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#FCD043" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="#FCD043" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" stroke="#FCD043" strokeWidth="2" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 100,50 50,100 0,50" stroke="#FCD043" strokeWidth="2" fill="none" />
            <polygon points="50,20 80,50 50,80 20,50" stroke="#FCD043" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveGallery;
