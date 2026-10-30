import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, UserCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonials-card',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-card',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const feedbackList = [
    {
      id: 1,
      quote:
        'Switching to VOLTIX Original eliminated the 3 PM brain fog completely. I get 4 hours of pure, razor-clean focus without the heartbeat spike that other energy cans give me.',
      author: 'Marcus Vance',
      role: 'Semi-Pro Valorant IGL & Tech Lead',
      flavor: 'Voltix Original',
      rating: 5,
    },
    {
      id: 2,
      quote:
        'Berry Blast is hands-down the best formulation on the market. The L-Theanine keeps my hands rock steady during marathon streaming tournaments. Taste is 10/10.',
      author: 'Elena Rostova',
      role: 'Content Creator & Ultra-Runner',
      flavor: 'Berry Blast',
      rating: 5,
    },
    {
      id: 3,
      quote:
        'The citrus rush has replaced my pre-workout. The electrolytes and natural green coffee extract deliver immediate stamina without feeling overly acidic or syrupy.',
      author: 'Devon Hayes',
      role: 'CrossFit Athlete & Calisthenics Coach',
      flavor: 'Citrus Rush',
      rating: 5,
    },
    {
      id: 4,
      quote:
        'Zero sugar and zero artificial aftertaste. Our entire software engineering squad keeps the office fridge stocked with VOLTIX 24-pack vaults for sprint weeks.',
      author: 'Siddharth Patel',
      role: 'Lead Systems Architect',
      flavor: 'Voltix Original',
      rating: 5,
    },
  ];

  const handleNext = () => {
    playEnergyClickSound();
    setCurrentIndex((prev) => (prev + 1) % feedbackList.length);
  };

  const handlePrev = () => {
    playEnergyClickSound();
    setCurrentIndex((prev) => (prev - 1 + feedbackList.length) % feedbackList.length);
  };

  const current = feedbackList[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40 overflow-hidden"
      aria-label="Community and Feedback"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAMPLE COMMUNITY VOICES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            THE VOLTIX <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">COMMUNITY.</span>
          </h2>
          <p className="text-content-secondary text-sm sm:text-base">
            Sample tester reviews and partner athlete impressions from our pre-launch beta cohort.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonials-card relative rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 shadow-2xl">
          <Quote className="w-12 h-12 text-volt-lime/30 mb-6" />

          <div className="min-h-[140px] flex items-center">
            <blockquote className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-white leading-relaxed">
              "{current.quote}"
            </blockquote>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 mt-8 border-t border-white/10">
            {/* Author info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-white">{current.author}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-volt-lime bg-volt-lime/10 px-2 py-0.5 rounded border border-volt-lime/30">
                  <UserCheck className="w-3 h-3" />
                  <span>Beta Tester</span>
                </span>
              </div>
              <div className="text-xs font-mono text-content-secondary">
                {current.role} • <span className="text-volt-lime">{current.flavor}</span>
              </div>
            </div>

            {/* Stars & Navigation Arrows */}
            <div className="flex items-center gap-4">
              <div className="flex text-volt-lime">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-volt-lime" />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  onMouseEnter={playNeonHoverSound}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:border-volt-lime/40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  onMouseEnter={playNeonHoverSound}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:border-volt-lime/40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {feedbackList.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playEnergyClickSound();
                setCurrentIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-8 bg-volt-lime' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
