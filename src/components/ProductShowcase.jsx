import React, { useState, useEffect, useRef } from 'react';
import { Zap, ShoppingBag, Eye, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase({ onOpenBuyModal }) {
  const [activeFlavor, setActiveFlavor] = useState('original');
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-header',
        { opacity: 0, y: 40 },
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
        '.product-card-item',
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.to('.product-can-img', {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      id: 'original',
      name: 'VOLTIX ORIGINAL',
      tagline: 'ULTRA ELECTRIFIED LIME',
      image: '/images/can-original.jpg',
      themeColor: '#C7FF00',
      accentClass: 'border-volt-lime/50 text-volt-lime shadow-neon-lime',
      glowColor: 'rgba(199, 255, 0, 0.15)',
      description:
        'The definitive formula. Crisp electric lime with an effervescent bite, calibrated to launch alertness within 7 minutes.',
      caffeine: '180mg',
      sugar: '0g',
      calories: '10 kcal',
      vitamins: 'B3, B5, B6, B12',
      profile: 'Crisp Lime, Lemon Zest & Tart Electrified Finish',
    },
    {
      id: 'berry',
      name: 'VOLTIX BERRY BLAST',
      tagline: 'COGNITIVE VIOLET SURGE',
      image: '/images/can-berry.jpg',
      themeColor: '#A855F7',
      accentClass: 'border-purple-500/50 text-purple-400 shadow-neon-purple',
      glowColor: 'rgba(168, 85, 247, 0.15)',
      description:
        'Deep wild blackberry, arctic açai, and crisp boysenberry blended with L-Theanine for calm, laser-sharp tactical focus.',
      caffeine: '180mg',
      sugar: '0g',
      calories: '10 kcal',
      vitamins: 'B-Complex + L-Theanine',
      profile: 'Blackberry, Wild Açai, Blue Raspberry',
    },
    {
      id: 'citrus',
      name: 'VOLTIX CITRUS RUSH',
      tagline: 'SOLAR MANDARIN BURST',
      image: '/images/can-citrus.jpg',
      themeColor: '#F97316',
      accentClass: 'border-orange-500/50 text-orange-400 shadow-neon-orange',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      description:
        'Sun-drenched blood orange, Japanese yuzu, and pink grapefruit infused with ionic Himalayan pink salt for peak cellular hydration.',
      caffeine: '180mg',
      sugar: '0g',
      calories: '12 kcal',
      vitamins: 'B-Complex + Sea Electrolytes',
      profile: 'Blood Orange, Yuzu, Pink Grapefruit',
    },
  ];

  const currentProduct = products.find((p) => p.id === activeFlavor) || products[0];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40 transition-colors duration-700"
      aria-label="Product Showcase"
    >
      {/* Dynamic Ambient Glow Behind Active Product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentProduct.glowColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="product-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRI-SPECTRUM LINEUP</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            MEET YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">NEW ENERGY.</span>
          </h2>
          <p className="text-content-secondary text-base sm:text-lg">
            Engineered with natural green coffee caffeine, metabolic co-factors, and zero sugar. Choose your signature flavor profile.
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const isSelected = activeFlavor === product.id;
            return (
              <article
                key={product.id}
                onMouseEnter={() => {
                  playNeonHoverSound();
                  setActiveFlavor(product.id);
                }}
                className={`product-card-item relative rounded-3xl glass-panel-interactive p-6 flex flex-col justify-between overflow-hidden group transition-all duration-500 ${
                  isSelected ? 'border-opacity-100 ring-2' : 'border-opacity-20'
                }`}
                style={{
                  borderColor: isSelected ? product.themeColor : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? `0 20px 40px -15px ${product.glowColor}` : 'none',
                }}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                    style={{
                      borderColor: product.themeColor,
                      color: product.themeColor,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                  >
                    {product.tagline}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-content-secondary group-hover:text-white transition-colors">
                    <Zap className="w-3.5 h-3.5" style={{ color: isSelected ? product.themeColor : undefined }} />
                  </div>
                </div>

                {/* Product Image Container */}
                <div className="relative my-6 aspect-[3/4] w-full max-w-[260px] mx-auto overflow-hidden rounded-2xl flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={`${product.name} energy drink can with frosty condensation`}
                    className="product-can-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Details */}
                <div className="space-y-4 z-10">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-white tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-content-secondary mt-1">
                      {product.profile}
                    </p>
                  </div>

                  <p className="text-content-secondary text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Micro Specs Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center text-xs font-mono">
                    <div>
                      <div className="text-white font-bold">{product.caffeine}</div>
                      <div className="text-[10px] text-content-muted">Caffeine</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{product.sugar}</div>
                      <div className="text-[10px] text-content-muted">Sugar</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{product.calories}</div>
                      <div className="text-[10px] text-content-muted">Calories</div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <button
                    type="button"
                    onClick={() => {
                      playPowerUpSound();
                      onOpenBuyModal(product.id);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 text-black shadow-lg"
                    style={{
                      backgroundColor: product.themeColor,
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ORDER {product.name.replace('VOLTIX ', '')}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
