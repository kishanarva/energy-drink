import React, { useState } from 'react';
import { Zap, ArrowRight, ShieldCheck, Flame, Rotate3d, Sparkles } from 'lucide-react';
import Can3DViewer from './Can3DViewer';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

export default function Hero({ onOpenBuyModal }) {
  const [selectedFlavor, setSelectedFlavor] = useState('original');

  const flavorOptions = [
    { id: 'original', name: 'Original', color: 'bg-volt-lime text-black border-volt-lime' },
    { id: 'berry', name: 'Berry Blast', color: 'bg-purple-600 text-white border-purple-400' },
    { id: 'citrus', name: 'Citrus Rush', color: 'bg-orange-500 text-white border-orange-400' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden cyber-grid"
      aria-label="Hero Introduction"
    >
      {/* Background Volumetric Glow Orbs */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          selectedFlavor === 'berry'
            ? 'bg-purple-600/20'
            : selectedFlavor === 'citrus'
            ? 'bg-orange-500/20'
            : 'bg-volt-lime/20'
        }`}
      />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-volt-neon/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-volt-lime animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-volt-lime font-bold">
                NEXT-GEN BIO-ELECTROLYTE MATRIX
              </span>
            </div>

            {/* Main Cinematic Heading */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight leading-[0.95] text-white">
              UNLEASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime via-volt-neon to-white text-glow-lime">
                YOUR ENERGY.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-content-secondary text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Power your moments. Elevate your experience. Discover a scientifically calibrated way to energize your everyday without the crash.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                onMouseEnter={playNeonHoverSound}
                onClick={playEnergyClickSound}
                className="w-full sm:w-auto py-4 px-8 rounded-full bg-volt-lime text-black font-display font-extrabold text-sm uppercase tracking-wider hover:bg-volt-neon transition-all duration-300 hover:scale-105 shadow-neon-lime flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE VOLTIX</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playPowerUpSound();
                  onOpenBuyModal();
                }}
                onMouseEnter={playNeonHoverSound}
                className="w-full sm:w-auto py-4 px-8 rounded-full bg-white/5 border border-white/15 text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-volt-lime/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-volt-lime" />
                <span>DISCOVER THE ENERGY</span>
              </button>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-mono font-bold text-white">180<span className="text-volt-lime text-sm">mg</span></div>
                <div className="text-[11px] sm:text-xs text-content-secondary uppercase font-mono">Clean Caffeine</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-mono font-bold text-white">0<span className="text-volt-lime text-sm">g</span></div>
                <div className="text-[11px] sm:text-xs text-content-secondary uppercase font-mono">Zero Sugar</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-mono font-bold text-white">100<span className="text-volt-lime text-sm">%</span></div>
                <div className="text-[11px] sm:text-xs text-content-secondary uppercase font-mono">Recyclable Can</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Product Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* 3D Can Container */}
            <div className="relative w-full aspect-[4/5] max-w-[420px] rounded-3xl glass-panel p-2 flex items-center justify-center overflow-hidden shadow-2xl border border-white/10 group">
              
              {/* Corner tech lines */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-volt-lime tracking-widest uppercase flex items-center gap-1.5 z-20">
                <Rotate3d className="w-3.5 h-3.5 animate-spin" />
                <span>3D PRODUCT MODEL // DRAG TO ROTATE</span>
              </div>

              {/* Three.js Interactive Can Viewport */}
              <Can3DViewer flavor={selectedFlavor} className="w-full h-full" />

              {/* Bottom live stats overlay */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono z-20">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-volt-lime" />
                  <span className="text-white font-semibold uppercase">{selectedFlavor} EDITION</span>
                </div>
                <span className="text-content-secondary">COLD SERVE 3°C</span>
              </div>
            </div>

            {/* Flavor Switcher Pills */}
            <div className="flex items-center gap-2 mt-4 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[11px] font-mono text-content-secondary px-3">Switch Flavor:</span>
              {flavorOptions.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    playEnergyClickSound();
                    setSelectedFlavor(f.id);
                  }}
                  className={`py-1 px-3 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 ${
                    selectedFlavor === f.id
                      ? `${f.color} font-bold shadow-md`
                      : 'text-content-secondary hover:text-white'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
