"use client";
import AboutHero from "@/components/about/aboutHero/AboutHero";
import InteractiveGallery from "@/components/about/InteractiveGallery";
import AmenitiesShowcase from "@/components/amenities/AmenitiesShowcase";
import Carousel3D from "@/components/amenities/Carousel3D";
import FadeIn from "@/components/animation/FadeIn";
import ScrollProgressBar from "@/components/animation/ScrollProgressBar";
import SmoothScroll from "@/components/animation/SmoothScroll";
import Footer from "@/components/footer/Footer";
import GetInTouch from "@/components/get_in_touch/GetInTouch";
import About_us from "@/components/home/home_about_us/About_us";
import Navbar from "@/components/navbar/Navbar";
import React, { useEffect, useState } from "react";

// Dynamic content wrapper component
const DynamicContent: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <>
      <AmenitiesShowcase />
      <Carousel3D />
      <InteractiveGallery />
    </>
  );
};

type Props = {};

const Page = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a slight delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SmoothScroll>
      <FadeIn>
        {/* Floating scroll progress indicator */}
        <ScrollProgressBar />
        
        <Navbar />
        <AboutHero />
        <About_us />
        
        {/* Dynamic content that loads after initial render */}
        <DynamicContent isVisible={isLoaded} />
        
        <GetInTouch />
        <Footer />
      </FadeIn>
    </SmoothScroll>
  );
};

export default Page;
