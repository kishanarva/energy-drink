import React, { useState, useEffect, useRef } from 'react';
import { Award, RefreshCw, Clock, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStats() {
  const sectionRef = useRef(null);

  // Animated counters state
  const [counts, setCounts] = useState({
    flavors: 0,
    hours: 0,
    recycle: 0,
    absorption: 0,
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    let counterTween = null;

    const startCounter = () => {
      if (counterTween) counterTween.kill();

      const counterObj = { flavors: 0, hours: 0, recycle: 0, absorption: 0 };
      counterTween = gsap.to(counterObj, {
        flavors: 3,
        hours: 4,
        recycle: 100,
        absorption: 7,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => {
          setCounts({
            flavors: Math.floor(counterObj.flavors),
            hours: Math.floor(counterObj.hours),
            recycle: Math.floor(counterObj.recycle),
            absorption: Math.floor(counterObj.absorption),
          });
        },
      });
    };

    const resetCounter = () => {
      if (counterTween) counterTween.kill();
      setCounts({ flavors: 0, hours: 0, recycle: 0, absorption: 0 });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Re-trigger counter in both scroll directions
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 15%',
        onEnter: startCounter,
        onEnterBack: startCounter,
        onLeave: resetCounter,
        onLeaveBack: resetCounter,
      });
    }, sectionRef);

    return () => {
      if (counterTween) counterTween.kill();
      ctx.revert();
    };
  }, []);

  const stats = [
    {
      label: 'Core Signature Flavors',
      value: counts.flavors,
      suffix: '',
      subtext: 'Original, Berry Blast, Citrus Rush',
      icon: Flame,
    },
    {
      label: 'Sustained Kinetic Plateau',
      value: counts.hours,
      suffix: '+ Hrs',
      subtext: 'Zero crash glycemic profile',
      icon: Clock,
    },
    {
      label: 'Infinitely Recyclable Aluminum',
      value: counts.recycle,
      suffix: '%',
      subtext: 'Eco-conscious cold vault can',
      icon: RefreshCw,
    },
    {
      label: 'Rapid Cellular Onset',
      value: `<${counts.absorption}`,
      suffix: ' Min',
      subtext: 'Sublingual & gastric bioavailability',
      icon: Award,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-bg-secondary/70 overflow-hidden"
      aria-label="Brand Milestones and Specifications"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Tagline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CALIBRATED BENCHMARKS</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            ENGINEERED TO SPECIFICATION
          </h2>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                onMouseEnter={playNeonHoverSound}
                className="stat-card p-6 rounded-2xl glass-panel-interactive border border-white/10 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-volt-lime/10 border border-volt-lime/30 text-volt-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-content-muted uppercase">VERIFIED SPEC</span>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight flex items-baseline">
                    <span className="text-volt-lime">{s.value}</span>
                    <span className="text-xl sm:text-2xl text-white ml-1">{s.suffix}</span>
                  </div>
                  <div className="font-display font-bold text-sm text-white pt-1">{s.label}</div>
                  <div className="text-xs text-content-secondary font-mono">{s.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
