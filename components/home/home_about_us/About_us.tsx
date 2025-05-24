"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import MaskText from "@/components/animation/MaskText";
import TextMask from "@/components/animation/TextMask";
import ImageReveal from "@/components/animation/ImageReveal";
import TypewriterText from "@/components/animation/TypewriterText";
import ParallaxEffect from "@/components/animation/ParallaxEffect";
import Interactive3DCard from "@/components/animation/Interactive3DCard";

type Props = {};

const About_us = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // References for scroll animations
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: false });
  const [ref4, inView4] = useInView({ threshold: 0.4, triggerOnce: false });
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax transformations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Timeline sections
  const timelineSections = [
    { year: "2020", title: "The Beginning", content: "The vision for Aurum Resort was born, with plans to create a sanctuary of luxury in harmony with nature." },
    { year: "2022", title: "Breaking Ground", content: "Construction began on our exclusive villas, designed by award-winning architects to blend seamlessly with the natural surroundings." },
    { year: "2023", title: "Crafting Experiences", content: "Our team of hospitality experts developed signature experiences, from spa treatments to culinary journeys." },
    { year: "2025", title: "Grand Opening", content: "Aurum Resort opened its doors, welcoming guests to experience unparalleled luxury in a serene natural setting." },
  ];
  
  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Auto-advance timeline sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % timelineSections.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);


  return (
    <AnimatePresence>
      <div 
        ref={containerRef}
        className="bg-regal_green w-full min-h-screen relative overflow-hidden"
        id="about"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 rounded-full bg-golden_yellow blur-3xl"
            animate={{
              x: [0, 100, 50, 0],
              y: [0, 50, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ opacity: 0.1 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-golden_yellow blur-3xl"
            animate={{
              x: [0, -100, -50, 0],
              y: [0, -50, -100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ opacity: 0.1 }}
          />
        </div>
        
        {/* Title section with parallax effect */}
        <div className="relative z-10 pt-24 pb-12">
          <motion.div 
            className="text-center mb-16"
            style={{ y: y1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="font-miracle text-7xl md:text-8xl lg:text-9xl tracking-tight inline-block">
                <span className="text-golden_yellow">ABOUT</span>
                <span className="text-white ml-4">US</span>
              </h1>
              <motion.div 
                className="h-1 bg-golden_yellow mt-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Main content section */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Interactive timeline section */}
          <div ref={ref1} className="mb-24">
            <motion.h2 
              className="text-white text-3xl md:text-4xl font-miracle mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={inView1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Journey
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-golden_yellow"
                initial={{ height: 0 }}
                animate={inView1 ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Timeline sections */}
              <div className="relative z-10">
                {timelineSections.map((section, index) => (
                  <motion.div 
                    key={index}
                    className={`relative mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center max-md:flex-col max-md:text-center`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    {/* Year marker */}
                    <motion.div 
                      className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-regal_green border-2 border-golden_yellow flex items-center justify-center ${activeSection === index ? 'scale-125' : 'scale-100'}`}
                      animate={activeSection === index ? {
                        boxShadow: ["0 0 0 0 rgba(252, 208, 67, 0.4)", "0 0 0 10px rgba(252, 208, 67, 0)"],
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSection === index ? Infinity : 0 }}
                    >
                      <span className="text-golden_yellow font-bold">{section.year.slice(2)}</span>
                    </motion.div>
                    
                    {/* Content */}
                    <div className={`w-1/2 max-md:w-full ${index % 2 === 0 ? 'pr-16 text-right max-md:pr-0 max-md:text-center' : 'pl-16 text-left max-md:pl-0 max-md:text-center'}`}>
                      <motion.div
                        className={`p-6 rounded-lg ${activeSection === index ? 'bg-black/20' : ''}`}
                        animate={activeSection === index ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-golden_yellow text-2xl font-miracle mb-2">{section.title}</h3>
                        <p className="text-white/80 font-helvetica">{section.content}</p>
                      </motion.div>
                    </div>
                    
                    {/* Empty space for the other side */}
                    <div className="w-1/2 max-md:hidden"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image and text section with parallax */}
          <div ref={ref2} className="flex flex-col md:flex-row items-center gap-12 mb-24">
            {/* Left image with parallax */}
            <motion.div 
              className="w-full md:w-1/2 relative overflow-hidden rounded-lg"
              style={{ y: y2 }}
            >
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={inView2 ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="aspect-[3/4] relative"
              >
                <img 
                  src="./bigger-copenhagen.webp" 
                  alt="Aurum Resort" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-regal_green to-transparent opacity-70"
                  initial={{ opacity: 0 }}
                  animate={inView2 ? { opacity: 0.7 } : { opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-10 right-10 w-16 h-16"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/Star.svg" alt="Decoration" className="w-full h-full" />
              </motion.div>
            </motion.div>
            
            {/* Right content */}
            <motion.div 
              className="w-full md:w-1/2"
              style={{ y: y3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-golden_yellow text-3xl md:text-4xl font-miracle mb-6">Luxury Redefined</h2>
                
                <MaskText
                  inview={inView2}
                  customStyles="text-white/90 font-helvetica leading-relaxed mb-6"
                >
                  The luxurious Aurum Resort is nestled near the beautiful bird sanctuary in Gurgaon, Sardhrana.
                  Our property features 10 exclusive villas and 5 master villas designed to provide the ultimate
                  comfort and luxury.
                </MaskText>
                
                <MaskText
                  inview={inView2}
                  customStyles="text-white/90 font-helvetica leading-relaxed"
                >
                  We offer exceptional amenities including a spa, sports facilities, and
                  fine dining experiences in a serene natural setting. Every detail has been carefully crafted
                  to ensure an unforgettable stay for our guests.
                </MaskText>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Interactive features section */}
          <div ref={ref3} className="mb-24">
            <motion.h2 
              className="text-white text-3xl md:text-4xl font-miracle mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={inView3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience Luxury
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-black/20 rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 text-golden_yellow"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L15.5 8.5H19.5L14 13L16 21L12 17L8 21L10 13L4.5 8.5H8.5L12 1Z" />
                  </svg>
                </motion.div>
                <h3 className="text-golden_yellow text-xl font-miracle mb-2">Luxury Villas</h3>
                <p className="text-white/80 font-helvetica">Experience unparalleled comfort in our meticulously designed villas with private pools.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-black/20 rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 text-golden_yellow"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z" />
                  </svg>
                </motion.div>
                <h3 className="text-golden_yellow text-xl font-miracle mb-2">Spa & Wellness</h3>
                <p className="text-white/80 font-helvetica">Rejuvenate your body and mind with our signature spa treatments and wellness programs.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-black/20 rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 text-golden_yellow"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 9V21H20V9L12 3ZM18 19H6V10L12 5.5L18 10V19ZM8 14H16V16H8V14ZM8 11H16V13H8V11Z" />
                  </svg>
                </motion.div>
                <h3 className="text-golden_yellow text-xl font-miracle mb-2">Fine Dining</h3>
                <p className="text-white/80 font-helvetica">Indulge in exquisite culinary experiences crafted by our award-winning chefs.</p>
              </motion.div>
            </div>
          </div>
          
          {/* Final call to action */}
          <div ref={ref4} className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-white text-3xl md:text-4xl font-miracle mb-6">Begin Your Journey</h2>
              <p className="text-white/80 font-helvetica max-w-2xl mx-auto mb-8">Discover the perfect blend of luxury, comfort, and natural beauty at Aurum Resort. Your extraordinary experience awaits.</p>
              
              <motion.button
                className="bg-golden_yellow text-regal_green py-3 px-8 rounded-full font-helvetica text-lg transition-all"
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Stay
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default About_us;
