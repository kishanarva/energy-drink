import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Info, ShieldCheck, ChevronDown, ChevronUp, Droplets, Zap, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ingredients-header',
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
        '.ingredient-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ingredients-grid',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ingredientsList = [
    {
      id: 'caffeine',
      title: 'Green Coffee Caffeine',
      amount: '180mg',
      role: 'Clean Alertness Engine',
      description:
        'Sourced from raw, unroasted green coffee beans. Delivers smooth central nervous stimulation without the harsh acidity or bitter roast byproduct of synthesized anhydrous caffeine.',
      tag: 'PLANT-EXTRACTED',
    },
    {
      id: 'theanine',
      title: 'L-Theanine + Taurine',
      amount: '1,100mg Matrix',
      role: 'Neuro-Cognitive Smoothing',
      description:
        'An amino acid pairing naturally abundant in ceremonial green tea. Synergistically cross-links with caffeine receptors to smooth out jitters and sharpen tactical spatial reaction time.',
      tag: 'FOCUS SYNERGY',
    },
    {
      id: 'b-complex',
      title: 'Active B-Complex Matrix',
      amount: '100% Daily Value',
      role: 'Cellular ATP Synthesizers',
      description:
        'Contains bioactive forms of Niacin (B3), Pyridoxine (B6), and Methylcobalamin (B12). Essential co-enzymes that help your cells convert amino acids and glucose into immediate ATP energy.',
      tag: 'CELLULAR FUEL',
    },
    {
      id: 'electrolytes',
      title: 'Ionic Electrolyte Complex',
      amount: '400mg Complex',
      role: 'Cellular Osmoregulation',
      description:
        'Formulated with pharmaceutical grade Potassium Citrate, Magnesium Malate, and pink mineral salt to replenish fluids lost through high-intensity mental and physical output.',
      tag: 'HYDRATION',
    },
    {
      id: 'sugarfree',
      title: 'Zero Sugar Sweetener',
      amount: '0g Sugar / 10 Kcal',
      role: 'Zero Glycemic Impact',
      description:
        'Sweetened with purified Reb-M Stevia extract and fermented monkfruit. Completely prevents insulin spikes and guarantees zero afternoon metabolic crash.',
      tag: '0G SUGAR',
    },
    {
      id: 'botanicals',
      title: 'Panax Ginseng & Guarana',
      amount: '150mg Bio-Extract',
      role: 'Endurance Adaptation',
      description:
        'Traditional adaptogenic botanicals that support healthy oxygen uptake and physical stamina under prolonged mental or athletic stress.',
      tag: 'ADAPTOGENIC',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/60"
      aria-label="Ingredients and Nutrition"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="ingredients-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT FORMULATION</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              WHAT'S INSIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">MATTERS.</span>
            </h2>
            <p className="text-content-secondary text-base sm:text-lg">
              No proprietary secrecy. No filler chemicals. Every milligram is intentionally selected to maximize human stamina and mental acuity.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playEnergyClickSound();
              setShowNutritionModal(true);
            }}
            className="self-start md:self-end py-3 px-6 rounded-full glass-panel border border-volt-lime/40 text-volt-lime hover:bg-volt-lime hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <Info className="w-4 h-4" />
            <span>View Nutrition Facts Panel</span>
          </button>
        </div>

        {/* 6 Ingredient Cards Grid */}
        <div className="ingredients-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredientsList.map((item) => {
            const isExpanded = expandedCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={playNeonHoverSound}
                className="ingredient-card rounded-2xl glass-panel-interactive p-6 flex flex-col justify-between border border-white/10 group cursor-pointer"
                onClick={() => {
                  playEnergyClickSound();
                  setExpandedCard(isExpanded ? null : item.id);
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-volt-lime/10 border border-volt-lime/30 text-volt-lime">
                      {item.tag}
                    </span>
                    <span className="text-sm font-mono font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {item.amount}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-volt-lime transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-content-secondary mt-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-volt-lime" />
                    <span>{item.role}</span>
                  </div>

                  <p className="text-content-secondary text-sm mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-content-muted">
                  <span>Sample verified batch formulation</span>
                  <span className="text-volt-lime">{isExpanded ? 'Less' : 'Details'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Disclaimer as per guidelines */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-content-secondary text-center max-w-3xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-volt-lime shrink-0" />
          <span>
            VOLTIX uses verified beverage nutrition standards. Not recommended for children, pregnant or nursing women, or individuals sensitive to caffeine.
          </span>
        </div>

      </div>

      {/* Modal: Nutrition Facts Panel */}
      {showNutritionModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="nutrition-panel-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-black border-2 border-white p-6 text-white font-mono shadow-2xl">
            <button
              onClick={() => setShowNutritionModal(false)}
              aria-label="Close nutrition facts"
              className="absolute top-4 right-4 text-white hover:text-volt-lime text-lg font-bold"
            >
              ✕
            </button>

            <h3 id="nutrition-panel-title" className="text-3xl font-black tracking-tight border-b-8 border-white pb-1 font-sans">
              Nutrition Facts
            </h3>
            <div className="text-xs border-b border-white py-1">
              1 serving per can (500mL / 16.9 fl oz)
            </div>
            <div className="flex justify-between items-baseline border-b-4 border-white py-2">
              <div>
                <span className="text-xs font-bold">Amount Per Serving</span>
                <div className="text-2xl font-black">Calories</div>
              </div>
              <div className="text-3xl font-black">10</div>
            </div>

            <div className="text-right text-[11px] font-bold border-b border-white py-1">
              % Daily Value*
            </div>

            <div className="divide-y divide-white/20 text-xs py-1">
              <div className="flex justify-between py-1">
                <span><span className="font-bold">Total Fat</span> 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between py-1">
                <span><span className="font-bold">Sodium</span> 120mg</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="flex justify-between py-1">
                <span><span className="font-bold">Total Carbohydrate</span> 2g</span>
                <span className="font-bold">1%</span>
              </div>
              <div className="flex justify-between py-1 pl-4">
                <span>Total Sugars 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between py-1">
                <span><span className="font-bold">Protein</span> 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Niacin (Vit. B3) 20mg</span>
                <span className="font-bold">125%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Vitamin B6 3.4mg</span>
                <span className="font-bold">200%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Vitamin B12 6mcg</span>
                <span className="font-bold">250%</span>
              </div>
              <div className="flex justify-between py-1 text-volt-lime font-bold">
                <span>Natural Green Coffee Caffeine</span>
                <span>180mg</span>
              </div>
              <div className="flex justify-between py-1 text-volt-lime font-bold">
                <span>Taurine + L-Theanine Complex</span>
                <span>1,100mg</span>
              </div>
            </div>

            <div className="text-[10px] text-content-secondary pt-3 border-t-2 border-white">
              *The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
