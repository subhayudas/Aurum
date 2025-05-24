"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SplitText from "@/components/animation/SplitText";
import TypewriterText from "@/components/animation/TypewriterText";
import ParallaxEffect from "@/components/animation/ParallaxEffect";

type Props = {};

const AboutHero = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Create a dynamic particle effect
    const createParticles = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;
      
      particles.innerHTML = '';
      const particleCount = window.innerWidth > 768 ? 40 : 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-golden_yellow opacity-70';
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particle);
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-regal_green"
    >
      {/* Background video with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity, scale }}
      >
        <video
          src="/herobg.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload"
          className="object-cover w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
      
      {/* Particle effect container */}
      <div id="particles" className="absolute inset-0 z-10 pointer-events-none" />
      
      {/* 3D rotating golden element */}
      <motion.div
        className="absolute z-10 w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon 
                points="50,5 95,50 50,95 5,50" 
                fill="none" 
                stroke="#FCD043" 
                strokeWidth="1"
                className="opacity-70"
              />
              <circle 
                cx="50" 
                cy="50" 
                r="30" 
                fill="none" 
                stroke="#FCD043" 
                strokeWidth="1"
                className="opacity-70"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6"
              style={{ y: textY }}
            >
              <motion.div 
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <h1 className="font-miracle text-6xl md:text-8xl lg:text-9xl tracking-tight">
                  <motion.span 
                    className="inline-block text-golden_yellow"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    AURUM
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.div 
                className="overflow-hidden mt-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <h1 className="font-miracle text-6xl md:text-8xl lg:text-9xl tracking-tight">
                  <motion.span 
                    className="inline-block text-white"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    STORY
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="h-[2px] w-40 bg-golden_yellow mx-auto my-8 origin-left"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="max-w-xl mx-auto"
              >
                <TypewriterText 
                  text="Discover the legacy of luxury and excellence" 
                  speed={50} 
                  delay={2200} 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ 
            y: [0, 10, 0],
            opacity: 1 
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5 },
            opacity: { delay: 3, duration: 1 }
          }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2 font-helvetica">Scroll to Explore</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Add CSS for the floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutHero;
