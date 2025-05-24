'use client';

import React from 'react';
import MasonryGallery from './MasonryGallery';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from '@/components/animation/ScrollReveal';

const ModernGallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Gallery images
  const galleryImages = [
    {
      src: '/waiting_room.webp',
      alt: 'Elegant Waiting Area',
      width: 800,
      height: 600,
    },
    {
      src: '/common-area.webp',
      alt: 'Common Area',
      width: 800,
      height: 1000,
    },
    {
      src: '/glass-fireplace.webp',
      alt: 'Glass Fireplace',
      width: 800,
      height: 800,
    },
    {
      src: '/kitchen.webp',
      alt: 'Modern Kitchen',
      width: 800,
      height: 600,
    },
    {
      src: '/bath_tub.webp',
      alt: 'Luxury Bathroom',
      width: 800,
      height: 900,
    },
    {
      src: '/mirror-image.webp',
      alt: 'Stylish Interior',
      width: 800,
      height: 700,
    },
  ];

  return (
    <section className="py-20 bg-off-white" id="gallery">
      <div className="w-[95%] mx-auto">
        <ScrollReveal variant="fadeIn" delay={0.2}>
          <div className="mb-12 text-center">
            <h2 className="font-miracle text-4xl md:text-5xl lg:text-6xl mb-4 text-regal_green">
              Our Gallery
            </h2>
            <p className="text-text_royal_green max-w-2xl mx-auto font-helvetica">
              Experience the luxury and elegance of Aurum Resort through our carefully curated gallery. 
              Each space is designed to provide comfort, style, and an unforgettable experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="slideUp" delay={0.4}>
          <MasonryGallery 
            images={galleryImages} 
            columns={3} 
            gap={24} 
            className="mt-8"
          />
        </ScrollReveal>

        <ScrollReveal variant="fadeIn" delay={0.6}>
          <div className="mt-16 text-center">
            <p className="text-text_royal_green mb-6 font-helvetica">
              Discover more of our beautiful spaces and amenities
            </p>
            <motion.button 
              className="bg-regal_green text-white py-3 px-8 rounded-full font-helvetica"
              whileHover={{ scale: 1.05, backgroundColor: '#1B3B36' }}
              whileTap={{ scale: 0.95 }}
            >
              View All Photos
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ModernGallery;