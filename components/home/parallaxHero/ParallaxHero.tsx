'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import TypewriterText from '@/components/animation/TypewriterText';
import ParallaxEffect from '@/components/animation/ParallaxEffect';

const ParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

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
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Floating elements with different parallax speeds */}
      <ParallaxEffect speed={-0.2} className="absolute top-[20%] left-[10%] z-10 opacity-70">
        <Image src="/Star.svg" alt="Decoration" width={40} height={40} />
      </ParallaxEffect>
      
      <ParallaxEffect speed={0.3} className="absolute bottom-[30%] right-[15%] z-10 opacity-60">
        <Image src="/Vector16.svg" alt="Decoration" width={60} height={60} />
      </ParallaxEffect>
      
      <ParallaxEffect speed={-0.4} className="absolute top-[40%] right-[20%] z-10 opacity-50">
        <Image src="/Polygon.webp" alt="Decoration" width={80} height={80} />
      </ParallaxEffect>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="font-miracle text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tight">
            <span className="block">Aurum</span>
            <span className="block text-golden_yellow">Resort</span>
          </h1>
          <div className="h-[2px] w-24 bg-golden_yellow mx-auto my-6"></div>
          <p className="text-xl md:text-2xl font-helvetica max-w-2xl mx-auto">
            <TypewriterText 
              text="Luxury living amidst nature's sanctuary" 
              speed={70} 
              delay={1000} 
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
        >
          <ul className="flex flex-wrap justify-center gap-6 text-golden_yellow font-helvetica text-lg">
            <li className="flex items-center">
              <span className="mr-2">●</span> VILLAS
            </li>
            <li className="flex items-center">
              <span className="mr-2">●</span> SPA
            </li>
            <li className="flex items-center">
              <span className="mr-2">●</span> RESTAURANT
            </li>
            <li className="flex items-center">
              <span className="mr-2">●</span> SPORTS
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-12"
        >
          <motion.button
            className="bg-golden_yellow text-regal_green py-3 px-8 rounded-full font-helvetica text-lg transition-all"
            whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Stay
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2 font-helvetica">Scroll Down</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxHero;