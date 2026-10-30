import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import ProductShowcase from './components/ProductShowcase';
import WhenToDrink from './components/WhenToDrink';
import BrandStory from './components/BrandStory';
import Ingredients from './components/Ingredients';
import EnergyExperience from './components/EnergyExperience';
import BrandStats from './components/BrandStats';
import Lifestyle from './components/Lifestyle';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedBuyFlavor, setSelectedBuyFlavor] = useState('original');

  // Initialize Lenis Ultra-Smooth Inertia Scrolling & Sync with GSAP ScrollTrigger
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Notify GSAP ScrollTrigger on every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP's optimized internal ticker
    const onTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenBuyModal = (flavor = 'original') => {
    setSelectedBuyFlavor(flavor);
    setIsBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-content-primary relative font-sans selection:bg-volt-lime selection:text-black">
      {/* Magnetic Custom Neon Cursor for Desktop */}
      <CustomCursor />

      {/* Semantic Header & Navigation */}
      <Navbar onOpenBuyModal={() => handleOpenBuyModal('original')} />

      {/* Main Semantic Content Area */}
      <main id="main-content">
        {/* 1. Cinematic Scroll-Controlled 25 FPS Video Canvas Hero */}
        <HeroScrollCanvas onOpenBuyModal={() => handleOpenBuyModal('original')} />

        {/* 2. Product Showcase with 3 Variants */}
        <ProductShowcase onOpenBuyModal={handleOpenBuyModal} />

        {/* 3. When to Drink Occasions (Red Bull Reference) */}
        <WhenToDrink />

        {/* 4. Brand Story Editorial & Philosophy */}
        <BrandStory />

        {/* 4. Ingredients & Transparent Formulation */}
        <Ingredients />

        {/* 5. Energy Experience & Harmonic Oscilloscope */}
        <EnergyExperience />

        {/* 6. Brand Statistics & Animated Milestones */}
        <BrandStats />

        {/* 7. Lifestyle Bento Applications */}
        <Lifestyle onOpenBuyModal={() => handleOpenBuyModal('original')} />

        {/* 8. Customer Experience / Beta Community Slider */}
        <Testimonials />

        {/* 9. FAQ Expandable Accordion */}
        <FAQ />

        {/* 10. Contact Transmission Vault */}
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Interactive Quick Buy / Cart Modal with Confetti */}
      <CartModal
        isOpen={isBuyModalOpen}
        onClose={handleCloseBuyModal}
        initialFlavor={selectedBuyFlavor}
      />
    </div>
  );
}
