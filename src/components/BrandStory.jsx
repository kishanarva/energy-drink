import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Flame, Target, Sparkles, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const storyRef = useRef(null);

  useEffect(() => {
    if (!storyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-text-col',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.story-img-col',
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.to('.story-burst-img', {
        y: -30,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        '.story-pillar-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-pillars-container',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Cpu,
      title: 'Neural Bio-Calibration',
      desc: 'Formulated with precision-ratio L-Theanine and plant-extracted caffeine to eliminate tremors and maintain calm mental clarity.',
    },
    {
      icon: Flame,
      title: 'Zero Crash Kinetic Curve',
      desc: 'Traditional energy drinks spike glucose and crater after 90 minutes. VOLTIX uses slow-release co-factors for a steady 4-hour plateau.',
    },
    {
      icon: Target,
      title: 'Performance-First Formula',
      desc: 'No artificial fillers, no high-fructose corn syrup, no animal derivatives. Pure performance fuel verified by independent testing.',
    },
  ];

  return (
    <section
      ref={storyRef}
      id="story"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-bg-primary"
      aria-label="Brand Story and Philosophy"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Top Heading */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN & PHILOSOPHY</span>
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.0] uppercase max-w-4xl">
            NOT JUST A DRINK. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime via-volt-neon to-white text-glow-lime">
              IT'S AN ENERGY.
            </span>
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative Text */}
          <div className="story-text-col lg:col-span-6 space-y-6 text-content-secondary text-base sm:text-lg leading-relaxed">
            <p className="text-white font-medium text-xl sm:text-2xl leading-snug">
              We asked a simple question: Why do traditional energy drinks still rely on 1990s high-sugar syrup formulas that leave you exhausted two hours later?
            </p>
            <p>
              VOLTIX was engineered from scratch by food scientists, endurance athletes, and competitive creators who demanded more. We replaced synthetic caffeine spikes with green coffee bean extracts, combined with cellular osmoprotectants and neuro-active amino acids.
            </p>
            <p>
              The result is clean, relentless kinetic focus. Whether you are coding until dawn, setting a new marathon split, or dominating an esports bracket — VOLTIX fuels your highest potential without compromise.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <div className="text-2xl font-mono font-bold text-volt-lime">0.0g</div>
                <div className="text-xs uppercase font-mono text-content-secondary">Sugar / Keto Friendly</div>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <div className="text-2xl font-mono font-bold text-volt-lime">100%</div>
                <div className="text-xs uppercase font-mono text-content-secondary">Vegan & Gluten Free</div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Explosive Burst */}
          <div className="lg:col-span-6 relative">
            <div className="story-img-col relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-2 shadow-2xl group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-volt-lime/30 shadow-neon-lime">
                <img
                  src="/images/voltix-explosive-burst.jpg"
                  alt="VOLTIX explosive energy splash collision"
                  className="story-burst-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-mono font-bold text-volt-lime px-3 py-1 rounded-full bg-black/70 border border-volt-lime/40 uppercase shadow-neon-lime">
                  ⚡ HIGH-SPEED EXPLOSIVE BURST
                </span>
              </div>
              
              {/* Bottom Quote Overlay */}
              <div className="mt-3 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-white space-y-1">
                <p className="font-display font-bold text-sm sm:text-base leading-snug">
                  "Frozen at the exact microsecond of kinetic collision."
                </p>
                <div className="text-xs font-mono text-volt-lime flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Cold-Vault Distributed Energy Formula</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Core Scientific Pillars */}
        <div className="story-pillars-container grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                onMouseEnter={playNeonHoverSound}
                className="story-pillar-item p-6 rounded-2xl glass-panel-interactive border border-white/10 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-volt-lime/10 border border-volt-lime/30 text-volt-lime flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">{pillar.title}</h3>
                <p className="text-content-secondary text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
