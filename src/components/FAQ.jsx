import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
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
        '.faq-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'What is VOLTIX and what sets it apart from conventional energy drinks?',
      a: 'VOLTIX is a next-generation kinetic beverage formulated around clean bio-available energy. Unlike typical drinks filled with high-fructose corn syrup and artificial caffeine that trigger extreme sugar spikes followed by severe fatigue crashes, VOLTIX combines 180mg of green coffee extract with L-Theanine, Taurine, and cellular electrolytes for a sustained, steady 4-hour focus plateau.',
    },
    {
      q: 'What flavours are currently available in the VOLTIX lineup?',
      a: 'We offer three signature editions: 1) VOLTIX ORIGINAL (crisp electrified lime & lemon zest), 2) VOLTIX BERRY BLAST (wild blackberry, blue raspberry & açai surge), and 3) VOLTIX CITRUS RUSH (sun-ripened blood orange, Japanese yuzu & pink grapefruit with sea salt electrolytes).',
    },
    {
      q: 'How much caffeine is in one can of VOLTIX?',
      a: 'Each 500mL (16.9 fl oz) can contains exactly 180mg of pure plant-extracted caffeine from raw green coffee beans—equivalent to approximately two standard cups of artisanal drip coffee, but smoothed out by L-Theanine to eliminate jitteriness.',
    },
    {
      q: 'What is the nutritional information (sugar, calories, carbohydrates)?',
      a: 'VOLTIX contains 0g Sugar, 10 to 12 Calories, and less than 2g Carbohydrates per 500mL can. We sweeten exclusively with premium fermented Reb-M Stevia extract and monkfruit, creating zero glycemic spike.',
    },
    {
      q: 'Where can I purchase VOLTIX?',
      a: 'VOLTIX is available for direct dispatch through our online cold-chain store in 3-can trial packs, 12-pack cases, and 24-pack vaults. We also supply select esports arenas, boutique fitness facilities, and specialty tech campus micro-markets.',
    },
    {
      q: 'Is VOLTIX vegan, gluten-free, and allergen safe?',
      a: 'Yes. All VOLTIX formulations are 100% vegan, gluten-free, keto-friendly, and manufactured in audited facilities free of nuts, dairy, and soy allergens.',
    },
  ];

  const handleToggle = (index) => {
    playEnergyClickSound();
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="faq-header text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">QUESTIONS.</span>
          </h2>
          <p className="text-content-secondary text-base">
            Everything you need to know about the formula, caffeine matrix, and fulfillment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="faq-item rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  onMouseEnter={playNeonHoverSound}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-volt-lime"
                >
                  <span className="font-display font-bold text-lg sm:text-xl text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-volt-lime shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-volt-lime/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-content-secondary text-sm sm:text-base leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
