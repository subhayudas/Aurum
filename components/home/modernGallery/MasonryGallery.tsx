'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
  className?: string;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  images,
  columns = 3,
  gap = 16,
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Distribute images across columns
  const distributeImages = () => {
    const columnImages: GalleryImage[][] = Array.from({ length: columns }, () => []);
    
    images.forEach((image, index) => {
      const columnIndex = index % columns;
      columnImages[columnIndex].push(image);
    });
    
    return columnImages;
  };

  const columnImages = distributeImages();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={className}>
      <motion.div
        ref={ref}
        className="flex gap-[16px] w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ gap: `${gap}px` }}
      >
        {columnImages.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col" style={{ gap: `${gap}px` }}>
            {column.map((image, imageIndex) => (
              <motion.div
                key={`${columnIndex}-${imageIndex}`}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover transition-transform duration-500"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity flex items-end p-4"
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white font-medium text-sm">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MasonryGallery;