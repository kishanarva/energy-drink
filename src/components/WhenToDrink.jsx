import React, { useEffect, useRef } from 'react';
import { Compass, Code, Gamepad2, Dumbbell, Sparkles, Clock, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function WhenToDrink() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.occasion-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.occasion-card',
        { opacity: 0, y: 55, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.occasion-grid',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const occasions = [
    {
      icon: Compass,
      title: 'ON LONG JOURNEYS & MIDNIGHT DRIVES',
      desc: 'Alertness is critical for anyone covering miles through the night. VOLTIX delivers steady green-coffee clarity without the heavy acidic syrup crash.',
      tag: 'ALERTNESS MATRIX',
    },
    {
      icon: Code,
      title: 'DURING WORK, CODING & FINALS',
      desc: 'For high-stakes architecture reviews, marathon sprint weeks, or exam prep. L-Theanine and active B-complex vitamins sustain uninterrupted flow state.',
      tag: 'DEEP COGNITION',
    },
    {
      icon: Gamepad2,
      title: 'CLUTCH ESPORTS & TOURNAMENTS',
      desc: 'Microsecond spatial reaction times in clutch playoff rounds. Bio-active taurine smooths jitteriness for steady crosshair tracking and clutch decision-making.',
      tag: 'TACTICAL REFLEX',
    },
    {
      icon: Dumbbell,
      title: 'TRAINING & HYBRID ATHLETICS',
      desc: 'Before a tempo run, CrossFit session, or athletic interval training. Calibrated electrolytes restore cellular fluid balance while bio-caffeine accelerates ATP output.',
      tag: 'PEAK VELOCITY',
    },
  ];

  return (
    <section
      id="occasions"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary border-t border-white/10 overflow-hidden"
      aria-label="When to Drink VOLTIX"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="occasion-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KINETIC OCCASIONS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            WHEN TO DRINK <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">VOLTIX.</span>
          </h2>
          <p className="text-content-secondary text-base sm:text-lg">
            Appreciated worldwide by top athletes, competitive esports players, busy founders, and creators on long journeys.
          </p>
        </div>

        {/* 4 Occasion Cards */}
        <div className="occasion-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => {
            const Icon = occ.icon;
            return (
              <div
                key={occ.title}
                onMouseEnter={playNeonHoverSound}
                className="occasion-card p-6 rounded-2xl glass-panel-interactive border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-volt-lime/10 border border-volt-lime/30 text-volt-lime flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-volt-lime group-hover:text-black transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-volt-lime block mb-2">
                    {occ.tag}
                  </span>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-volt-lime transition-colors leading-snug mb-3">
                    {occ.title}
                  </h3>

                  <p className="text-content-secondary text-xs sm:text-sm leading-relaxed">
                    {occ.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-content-muted">
                  <CheckCircle className="w-3.5 h-3.5 text-volt-lime" />
                  <span>Bio-available formula</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Instant Commerce Strip */}
        <div className="mt-14 p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-volt-lime animate-pulse" />
            <span className="font-bold tracking-wider uppercase">COLD DISPATCH DELIVERY:</span>
            <span className="text-content-secondary hidden sm:inline">Instant 10-Minute Delivery Available in Select Metro Areas</span>
          </div>
          <div className="flex items-center gap-2 text-content-secondary text-[11px]">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-bold">BLINKIT</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-bold">INSTAMART</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-bold">ZEPTO</span>
            <span className="px-2.5 py-1 rounded bg-volt-lime/10 border border-volt-lime/40 text-volt-lime font-bold">DIRECT VAULT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
