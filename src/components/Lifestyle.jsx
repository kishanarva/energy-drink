import React, { useEffect, useRef } from 'react';
import { Gamepad2, Dumbbell, Headphones, Code2, Compass, Sparkles, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle({ onOpenBuyModal }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lifestyle-header',
        { opacity: 0, y: 40 },
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
        '.lifestyle-bento-card',
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.lifestyle-grid',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: 'ESPORTS & COMPETITIVE GAMING',
      category: 'TACTICAL REFLEXES',
      desc: 'Microsecond spatial reaction times, laser pupil focus, and steady hands in clutch tournament rounds.',
      image: '/images/lifestyle-gaming.jpg',
      icon: Gamepad2,
      gridSpan: 'md:col-span-8',
    },
    {
      title: 'NIGHT RUNNING & HYBRID ATHLETICS',
      category: 'MAX OXYGEN UPTAKE',
      desc: 'Fueling relentless tempo paces through neon city streets without heavy gastric distress.',
      image: '/images/lifestyle-runner.jpg',
      icon: Dumbbell,
      gridSpan: 'md:col-span-4',
    },
    {
      title: 'CREATIVE CODE & ARCHITECTURE',
      category: 'FLOW STATE MATRIX',
      desc: 'Locking into 10,000 lines of complex logic with zero brain fog or afternoon fatigue.',
      image: '/images/lifestyle-gaming.jpg',
      icon: Code2,
      gridSpan: 'md:col-span-4',
    },
    {
      title: 'FESTIVAL SOUND & SONIC PULSE',
      category: 'SYNTHESIZED MOMENTUM',
      desc: 'High-octane sound stages, all-night festival momentum, and clean vibrating energy.',
      image: '/images/lifestyle-runner.jpg',
      icon: Headphones,
      gridSpan: 'md:col-span-8',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
      aria-label="Lifestyle Applications"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="lifestyle-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Sparkles className="w-3.5 h-3.5" />
            <span>APPLIED MOMENTUM</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            ENERGY IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">EVERY MOMENT.</span>
          </h2>
          <p className="text-content-secondary text-base sm:text-lg">
            Wherever your arena exists — on the digital battlefield, the asphalt, or the soundstage — VOLTIX provides the ignition.
          </p>
        </div>

        {/* Dynamic Bento Lifestyle Grid */}
        <div className="lifestyle-grid grid grid-cols-1 md:grid-cols-12 gap-6">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                onMouseEnter={playNeonHoverSound}
                className={`lifestyle-bento-card ${item.gridSpan} relative rounded-3xl overflow-hidden glass-panel border border-white/10 group h-[380px] sm:h-[420px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer`}
                onClick={() => onOpenBuyModal && onOpenBuyModal()}
              >
                {/* Background Image with Zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark & Neon Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                <div className="absolute inset-0 bg-volt-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Corner Icon & Arrow */}
                <div className="absolute top-6 inset-x-6 sm:inset-x-8 flex items-center justify-between z-10">
                  <div className="w-10 h-10 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-volt-lime shadow-neon-lime">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-volt-lime uppercase font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-content-secondary text-sm leading-relaxed max-w-md line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
