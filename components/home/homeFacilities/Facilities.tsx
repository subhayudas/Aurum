"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, Variant, useInView, useScroll, useTransform } from "framer-motion";
import { TbStar } from "react-icons/tb";

type Props = {};

interface IVariants {
  [key: string]: Variant;
}

interface Amenity {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  color: string;
}

function Facilities({}: Props) {
  const [activeAmenity, setActiveAmenity] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inViewRef = useInView(titleRef, { amount: 0.2, once: false });
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
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
  const fallbackImage = "./bigger-copenhagen.webp";
  
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <div ref={containerRef} className="bg-regal_green w-full border-0 border-transparent overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
      
      {/* Title section */}
      <div className="mt-[100px]">
        <div className="flex justify-between items-start gap-[20px] mx-auto w-[95%] max-[850px]:flex-col">
          <motion.p 
            className="flex flex-col font-helvetica gap-[5px] max-[850px]:w-full max-[850px]:text-end text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <span>LUXURY & NATURE</span> <span>RETREAT</span>
          </motion.p>
          
          <div className="font-miracle w-[520px] max-w-[520px] max-[850px]:w-[100%] max-[850px]:max-w-[100%] gap-[5px] flex flex-col">
            <motion.h1 
              className="scroll-m-10 max-[540px]:w-[60%] max-sm:text-[70px] sm:text-[70px] lg:text-[100px] max-[850px]:text-center font-extrabold tracking-[.10em] text-golden_yellow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              OUR
            </motion.h1>
            
            <motion.h1 
              className="max-sm:text-[70px] max-[540px]:w-[60%] leading-[70px] sm:text-[70px] lg:text-[100px] scroll-m-10 max-[850px]:text-center font-extrabold tracking-[.10em] text-golden_yellow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              AME
            </motion.h1>
            
            <div className="flex items-center justify-end gap-2">
              <motion.div 
                className="w-[30px]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <img src="./Star.svg" alt="Star" />
              </motion.div>
              
              <motion.h1 
                className="max-sm:text-[70px] sm:text-[70px] lg:text-[100px] scroll-m-20 font-extrabold tracking-[.10em] text-golden_yellow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
              >
                NITIES
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="max-[850px]:hidden">
              <img src="./barman.webp" alt="Barman" className="rounded-lg" />
            </div>
            <motion.div 
              className="absolute w-[80px] max-[850px]:hidden min-[850px]:block top-[-40px] left-[-30px]"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <img src="./label2.webp" alt="Label" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 mt-16 mb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation sidebar */}
          <motion.div 
            className="lg:w-1/3 bg-black/20 rounded-xl p-6"
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
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
    </div>
  );
}

export default Facilities;
