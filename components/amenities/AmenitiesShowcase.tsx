"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Amenity {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  color: string;
}

const AmenitiesShowcase: React.FC = () => {
  const [activeAmenity, setActiveAmenity] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(titleRef, { once: false, amount: 0.2 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Auto-rotate amenities when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveAmenity((prev) => (prev + 1) % amenities.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isHovering]);
  
  // Amenities data
  const amenities: Amenity[] = [
    {
      id: 1,
      title: "Luxury Spa",
      description: "Indulge in our signature treatments designed to rejuvenate your body and soul in our state-of-the-art spa facility.",
      icon: "🧖",
      image: "/spa.webp",
      features: [
        "Aromatherapy Massage",
        "Hot Stone Therapy",
        "Ayurvedic Treatments",
        "Couples Massage Suites",
        "Hydrotherapy Pool"
      ],
      color: "#D4AF37"
    },
    {
      id: 2,
      title: "Infinity Pool",
      description: "Swim in our stunning infinity pool with panoramic views of the surrounding natural beauty.",
      icon: "🏊",
      image: "/pool.webp",
      features: [
        "Temperature-Controlled Water",
        "Poolside Cabanas",
        "Swim-Up Bar",
        "Children's Pool Area",
        "Underwater Music System"
      ],
      color: "#4FB0C6"
    },
    {
      id: 3,
      title: "Fine Dining",
      description: "Experience culinary excellence with our award-winning chefs creating masterpieces using locally sourced ingredients.",
      icon: "🍽️",
      image: "/dining.webp",
      features: [
        "Farm-to-Table Cuisine",
        "Wine Cellar Selection",
        "Private Dining Options",
        "Live Cooking Stations",
        "Themed Dining Nights"
      ],
      color: "#8D6E63"
    },
    {
      id: 4,
      title: "Fitness Center",
      description: "Stay fit during your stay with our comprehensive fitness center featuring state-of-the-art equipment and personal trainers.",
      icon: "💪",
      image: "/fitness.webp",
      features: [
        "Cardio Equipment",
        "Weight Training Area",
        "Yoga & Pilates Studio",
        "Personal Training Sessions",
        "24/7 Access"
      ],
      color: "#F44336"
    },
    {
      id: 5,
      title: "Adventure Sports",
      description: "Embark on thrilling adventures with our range of outdoor activities designed for all skill levels.",
      icon: "🏄",
      image: "/adventure.webp",
      features: [
        "Nature Trails",
        "Bird Watching Tours",
        "Cycling Expeditions",
        "Water Sports",
        "Rock Climbing"
      ],
      color: "#4CAF50"
    }
  ];
  
  // Fallback images if the specified ones don't exist
  const fallbackImage = "/bigger-copenhagen.webp";
  
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };
  
  // Letter animation for title
  const titleLetters = "LUXURY AMENITIES".split("");

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-regal_green py-20 overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-golden_yellow"
            initial={{ 
              opacity: Math.random() * 0.5 + 0.1,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [0, Math.random() * -50 - 20, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 360, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ 
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>
      
      {/* Title with letter animation */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h2 
          ref={titleRef}
          className="text-center font-miracle text-4xl md:text-5xl lg:text-6xl text-white mb-3"
          style={{ opacity }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                color: letter !== " " ? ["#FFFFFF", "#FCD043", "#FFFFFF"] : "#FFFFFF"
              } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                color: { duration: 2, repeat: Infinity, repeatDelay: 5 }
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.div 
          className="h-1 bg-golden_yellow mx-auto"
          initial={{ width: 0 }}
          animate={inView ? { width: "150px" } : { width: 0 }}
          transition={{ duration: 1, delay: titleLetters.length * 0.05 + 0.2 }}
        />
        
        <motion.p 
          className="text-center text-white/80 mt-6 max-w-2xl mx-auto font-helvetica"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: titleLetters.length * 0.05 + 0.5 }}
        >
          Experience the height of luxury with our world-class amenities designed to make your stay unforgettable.
        </motion.p>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation sidebar */}
          <motion.div 
            className="lg:w-1/3 bg-black/20 rounded-xl p-6"
            style={{ y: y1 }}
          >
            <h3 className="text-golden_yellow font-miracle text-2xl mb-6">Explore Our Amenities</h3>
            
            <div className="space-y-4">
              {amenities.map((amenity) => (
                <motion.div
                  key={amenity.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${activeAmenity === amenity.id - 1 ? 'bg-black/30' : 'hover:bg-black/10'}`}
                  onClick={() => setActiveAmenity(amenity.id - 1)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="text-3xl"
                      animate={activeAmenity === amenity.id - 1 ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0, -5, 0]
                      } : {}}
                      transition={{ duration: 1, repeat: activeAmenity === amenity.id - 1 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      {amenity.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-white font-miracle text-xl">{amenity.title}</h4>
                      <motion.div 
                        className="h-0.5 mt-1"
                        style={{ backgroundColor: amenity.color }}
                        initial={{ width: 0 }}
                        animate={activeAmenity === amenity.id - 1 ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Content display area */}
          <motion.div 
            className="lg:w-2/3 relative min-h-[500px]"
            style={{ y: y2 }}
          >
            <AnimatePresence mode="wait">
              {amenities.map((amenity, index) => (
                activeAmenity === index && (
                  <motion.div
                    key={amenity.id}
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <motion.div
                        className="w-full h-full"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                      >
                        <img
                          src={amenity.image}
                          alt={amenity.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-regal_green/90 to-black/50" />
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-miracle mb-4" style={{ color: amenity.color }}>
                          {amenity.title}
                        </h3>
                        
                        <p className="text-white/90 font-helvetica mb-8 max-w-xl">
                          {amenity.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {amenity.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                            >
                              <motion.div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: amenity.color }}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                              />
                              <span className="text-white font-helvetica">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        <motion.button
                          className="px-6 py-3 rounded-full font-helvetica text-regal_green"
                          style={{ backgroundColor: amenity.color }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore {amenity.title}
                        </motion.button>
                      </motion.div>
                    </div>
                    
                    {/* Decorative elements */}
                    <motion.div
                      className="absolute top-8 right-8 w-24 h-24 opacity-30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" stroke={amenity.color} strokeWidth="2" />
                        <circle cx="50" cy="50" r="30" stroke={amenity.color} strokeWidth="2" />
                        <circle cx="50" cy="50" r="15" stroke={amenity.color} strokeWidth="2" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Interactive 3D feature cards */}
      <div className="container mx-auto px-4 mt-24">
        <motion.h3 
          className="text-center font-miracle text-3xl text-golden_yellow mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Exclusive Experiences
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Private Villa Dining", 
              description: "Enjoy a personalized dining experience in the comfort of your villa, prepared by our executive chef.",
              icon: "🍽️",
              color: "#E57373"
            },
            { 
              title: "Stargazing Experience", 
              description: "Discover the wonders of the night sky with our guided stargazing sessions using professional telescopes.",
              icon: "✨",
              color: "#5C6BC0"
            },
            { 
              title: "Personalized Wellness", 
              description: "Consult with our wellness experts to create a customized program tailored to your specific needs.",
              icon: "🧘",
              color: "#66BB6A"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group relative h-[300px] rounded-xl overflow-hidden perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ z: 50 }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-500" />
              
              {/* 3D card effect */}
              <motion.div
                className="relative h-full w-full rounded-xl bg-gradient-to-br from-black/80 to-black/40 p-6 flex flex-col justify-between transform-style-3d"
                whileHover={{ 
                  rotateX: [-5, 5],
                  rotateY: [-5, 5],
                  z: 50
                }}
                transition={{ 
                  rotateX: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror"
                  },
                  rotateY: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.25
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${item.color}30` }}
                  >
                    {item.icon}
                  </div>
                  
                  <motion.div
                    className="w-12 h-12 opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 0L61 36H100L69 59L82 95L50 73L18 95L31 59L0 36H39L50 0Z" stroke={item.color} strokeWidth="2" />
                    </svg>
                  </motion.div>
                </div>
                
                <div>
                  <h4 className="text-xl font-miracle mb-2" style={{ color: item.color }}>{item.title}</h4>
                  <p className="text-white/80 font-helvetica">{item.description}</p>
                </div>
                
                <motion.button
                  className="mt-4 px-4 py-2 rounded-full text-sm font-helvetica text-regal_green w-full"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
              
              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full opacity-0 group-hover:opacity-70"
                  style={{ 
                    backgroundColor: item.color,
                    width: Math.random() * 6 + 2 + "px",
                    height: Math.random() * 6 + 2 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%"
                  }}
                  animate={{ 
                    y: [0, -100],
                    x: [0, Math.random() * 40 - 20],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Interactive amenities map */}
      <div className="container mx-auto px-4 mt-24 mb-12">
        <motion.h3 
          className="text-center font-miracle text-3xl text-golden_yellow mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Resort Map
        </motion.h3>
        
        <motion.p 
          className="text-center text-white/80 max-w-2xl mx-auto mb-12 font-helvetica"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Explore our resort layout and discover all the amenities available during your stay.
        </motion.p>
        
        <motion.div 
          className="relative w-full max-w-4xl mx-auto h-[500px] rounded-xl overflow-hidden bg-black/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/resort-map.webp" 
              alt="Resort Map"
              onError={(e) => e.currentTarget.src = fallbackImage}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-regal_green to-transparent opacity-70" />
          </div>
          
          {/* Map hotspots */}
          {[
            { top: "30%", left: "20%", label: "Spa & Wellness", color: "#D4AF37" },
            { top: "50%", left: "60%", label: "Infinity Pool", color: "#4FB0C6" },
            { top: "70%", left: "30%", label: "Fine Dining", color: "#8D6E63" },
            { top: "40%", left: "80%", label: "Fitness Center", color: "#F44336" },
            { top: "20%", left: "50%", label: "Luxury Villas", color: "#9C27B0" }
          ].map((spot, index) => (
            <motion.div
              key={index}
              className="absolute z-10 cursor-pointer"
              style={{ top: spot.top, left: spot.left }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.2 }}
            >
              <motion.div 
                className="relative"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: spot.color }} />
                <div 
                  className="absolute -inset-2 rounded-full opacity-30"
                  style={{ backgroundColor: spot.color }}
                />
              </motion.div>
              
              <motion.div
                className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-lg whitespace-nowrap text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {spot.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AmenitiesShowcase;
