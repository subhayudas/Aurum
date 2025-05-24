import { AnimatePresence, motion, Variant } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
interface IVariant {
  [key: string]: Variant;
}

type Props = {};

const BestApartments: React.FC = (props: Props) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Animation variants for luxury elements
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for elegant motion
      } 
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1, 
        delay: 0.3
      } 
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        delay: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1.5 
      } 
    }
  };
  
  const decorVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: { 
      opacity: 0.7, 
      scale: 1, 
      rotate: 0, 
      transition: { 
        duration: 1.5, 
        delay: 0.7, 
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.8 + (i * 0.15),
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 1.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#e6bc3b",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };
  
  const accentLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100px",
      transition: {
        duration: 1.2,
        delay: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Luxury features list
  const luxuryFeatures = [
    { icon: "🏊‍♂️", text: "Private infinity pools" },
    { icon: "🌿", text: "Japanese zen gardens" },
    { icon: "🍷", text: "Wine cellar access" },
    { icon: "🛁", text: "Marble bathrooms" }
  ];

  return (
    <div className="overflow-hidden">
      <div className="h-[100vh] relative">
        <div ref={ref} className="h-[100%] w-full relative">
          {/* Video Background with Parallax Effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{ scale: inView ? 1 : 1.1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <video 
                className="w-full h-full object-cover" 
                autoPlay 
                loop 
                muted 
                playsInline
                src="/luxuryvillabg.mp4"
              />
            </motion.div>
            
            {/* Luxury overlay with gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={overlayVariants}
            />
            
            {/* Gold accent overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-golden_yellow/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-[15%] right-[5%] w-[200px] h-[200px] opacity-20"
            initial={{ opacity: 0, rotate: -10 }}
            animate={inView ? { opacity: 0.2, rotate: 0 } : { opacity: 0, rotate: -10 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <img
              className="w-full"
              src="./Star.svg"
              alt="Decorative star"
            />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[15%] left-[5%] w-[150px] h-[150px] opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <img
              className="w-full"
              src="./premierVector.svg"
              alt="Decorative element"
            />
          </motion.div>
          
          {/* Main decorative element */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] z-0"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={decorVariants}
          >
            <img
              className="w-full"
              src="./Vector16.svg"
              alt="Decorative element"
            />
          </motion.div>
          
          {/* Content Container */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Title and Description */}
              <div className="flex flex-col space-y-6">
                {/* Luxury Title with Accent Line */}
                <div className="space-y-4">
                  <motion.p 
                    className="font-miracle text-golden_yellow text-xl tracking-widest"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={subtitleVariants}
                  >
                    EXPERIENCE OPULENCE
                  </motion.p>
                  
                  <motion.h1 
                    className="font-miracle text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-golden_yellow tracking-tight leading-none"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={titleVariants}
                  >
                    LUXURY VILLAS
                  </motion.h1>
                  
                  <motion.div
                    className="h-[3px] bg-golden_yellow"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={accentLineVariants}
                  />
                </div>
                
                {/* Description with enhanced typography */}
                <motion.div 
                  className="max-w-xl"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={descriptionVariants}
                >
                  <p className="text-white font-helvetica text-lg md:text-xl leading-relaxed drop-shadow-md">
                    Experience ultimate luxury in our private villas, featuring panoramic views
                    of the bird sanctuary and Japanese gardens. Each villa is thoughtfully designed
                    with sustainable materials and modern amenities for an unparalleled living experience.
                  </p>
                </motion.div>
                
                {/* Luxury Features */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {luxuryFeatures.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3"
                      custom={index}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      variants={featureItemVariants}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-golden_yellow/20 flex items-center justify-center text-golden_yellow text-xl">
                        {feature.icon}
                      </div>
                      <span className="text-white font-helvetica">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* CTA Button with enhanced styling */}
                <motion.div
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="mt-6"
                >
                  <button className="px-10 py-4 bg-golden_yellow text-black font-miracle text-lg tracking-wider rounded-sm shadow-lg flex items-center space-x-2 group">
                    <span>EXPLORE VILLAS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </motion.div>
              </div>
              
              {/* Right Column - Luxury Images Gallery */}
              <div className="hidden lg:block relative h-[500px]">
                <motion.div 
                  className="absolute top-0 right-0 w-[250px] h-[350px] rounded-sm overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <img 
                    src="/bathroom.png" 
                    alt="Luxury bathroom" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-golden_yellow font-miracle text-sm">MARBLE BATHROOMS</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 w-[250px] h-[350px] rounded-sm overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <img 
                    src="/kitch.png" 
                    alt="Luxury kitchen" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-golden_yellow font-miracle text-sm">DESIGNER KITCHENS</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-golden_yellow shadow-2xl z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  <img 
                    src="/comfort.png" 
                    alt="Luxury comfort" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Bottom accent bar */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-golden_yellow"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default BestApartments;
