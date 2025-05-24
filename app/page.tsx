"use client";
import React from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import BestApartments from "@/components/home/bestApartments/BestApartments";
import Faq from "@/components/home/faq/Faq";
import Facilities from "@/components/home/homeFacilities/Facilities";
import About_us from "@/components/home/home_about_us/About_us";
import FadeIn from "@/components/animation/FadeIn";
import SmoothScroll from "@/components/animation/SmoothScroll";
import ScrollProgressBar from "@/components/animation/ScrollProgressBar";
import CustomCursor from "@/components/animation/CustomCursor";

// New Modern Components
import ParallaxHero from "@/components/home/parallaxHero/ParallaxHero";
import ModernGallery from "@/components/home/modernGallery/ModernGallery";
import InteractiveFeatures from "@/components/home/interactiveFeatures/InteractiveFeatures";
import ModernContactForm from "@/components/home/contact/ModernContactForm";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <SmoothScroll>
        <FadeIn>
          <Navbar />
          <ParallaxHero />
          <Facilities />

          <BestApartments />
          <About_us />
          <InteractiveFeatures />
          
          <ModernGallery />
          <Faq />
          <ModernContactForm />
          <Footer />
        </FadeIn>
      </SmoothScroll>
    </>
  );
}
