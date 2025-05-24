'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import ScrollReveal from '@/components/animation/ScrollReveal';
import Interactive3DCard from '@/components/animation/Interactive3DCard';
import TypewriterText from '@/components/animation/TypewriterText';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const InteractiveFeatures = () => {
  const [activeFeature, setActiveFeature] = useState<string>('villas');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features: Feature[] = [
    {
      id: 'villas',
      title: 'Luxury Villas',
      description: 'Our 10 exclusive villas and 5 master villas offer the perfect blend of comfort, privacy, and luxury. Each villa features premium amenities, spacious living areas, and stunning views of the surrounding landscape.',
      icon: '/Star.svg',
      image: '/best-room.webp',
    },
    {
      id: 'spa',
      title: 'Wellness Spa',
      description: 'Indulge in our world-class spa facilities designed to rejuvenate your body and mind. Our expert therapists offer a range of treatments using premium products in a serene and tranquil environment.',
      icon: '/Vector16.svg',
      image: '/bath_tub.webp',
    },
    {
      id: 'dining',
      title: 'Fine Dining',
      description: 'Experience exceptional culinary delights at our restaurant featuring locally-sourced ingredients and international flavors. Our expert chefs create memorable dining experiences in an elegant setting.',
      icon: '/premierVector.svg',
      image: '/kitchen.webp',
    },
    {
      id: 'activities',
      title: 'Outdoor Activities',
      description: 'Explore the beautiful bird sanctuary and enjoy a range of outdoor activities including guided nature walks, bird watching, cycling, and more. Our resort offers the perfect balance of adventure and relaxation.',
      icon: '/roomVector16.svg',
      image: '/white_exterior.webp',
    },
  ];

  const currentFeature = features.find(feature => feature.id === activeFeature);

  return (
    <section className="py-20 bg-regal_green text-white" id="features">
      <div className="w-[95%] mx-auto">
        <ScrollReveal variant="fadeIn">
          <div className="text-center mb-16">
            <h2 className="font-miracle text-4xl md:text-5xl lg:text-6xl mb-4">
              <TypewriterText text="Experience Luxury" speed={80} />
            </h2>
            <p className="max-w-2xl mx-auto font-helvetica text-white/80">
              Discover the exceptional amenities and experiences that make Aurum Resort a destination like no other.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="slideRight" delay={0.2}>
            <div className="space-y-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${activeFeature === feature.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveFeature(feature.id)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image 
                        src={feature.icon} 
                        alt={feature.title} 
                        width={24} 
                        height={24} 
                        className="object-contain" 
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      {activeFeature === feature.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white/80 font-helvetica"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" delay={0.4}>
            <AnimatePresence mode="wait">
              {currentFeature && (
                <Interactive3DCard 
                  key={currentFeature.id}
                  className="rounded-xl overflow-hidden"
                  intensity={10}
                  glareEnabled={true}
                  glareColor="rgba(255, 255, 255, 0.5)"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-[4/3] w-full"
                  >
                    <Image
                      src={currentFeature.image}
                      alt={currentFeature.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-2xl font-semibold mb-2">{currentFeature.title}</h3>
                      <p className="text-white/90 font-helvetica text-sm">
                        Click to explore more
                      </p>
                    </div>
                  </motion.div>
                </Interactive3DCard>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;