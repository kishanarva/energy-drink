import React, { useState } from 'react';
import { Zap, ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      playPowerUpSound();
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    playEnergyClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-content-secondary">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-volt-lime/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black border border-volt-lime flex items-center justify-center shadow-neon-lime">
                <Zap className="w-4 h-4 text-volt-lime" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                VOLT<span className="text-volt-lime">IX</span>
              </span>
            </a>

            <p className="font-display font-bold text-sm tracking-widest uppercase text-volt-lime">
              UNLEASH YOUR ENERGY.
            </p>

            <p className="text-content-secondary text-sm max-w-sm leading-relaxed">
              Engineered for mental clarity, tactical focus, and physical endurance. 180mg clean green coffee caffeine, 0g sugar, 100% infinitely recyclable aluminum.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              <li><a href="#home" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Home Base</a></li>
              <li><a href="#products" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Our Products</a></li>
              <li><a href="#story" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Brand Story</a></li>
              <li><a href="#ingredients" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Ingredients</a></li>
              <li><a href="#experience" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Experience</a></li>
              <li><a href="#lifestyle" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Lifestyle</a></li>
            </ul>
          </div>

          {/* Flavors */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              The Lineup
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              <li><a href="#products" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">Voltix Original (Lime)</a></li>
              <li><a href="#products" onMouseEnter={playNeonHoverSound} className="hover:text-purple-400 transition-colors">Berry Blast (Purple)</a></li>
              <li><a href="#products" onMouseEnter={playNeonHoverSound} className="hover:text-orange-400 transition-colors">Citrus Rush (Orange)</a></li>
              <li><a href="#products" onMouseEnter={playNeonHoverSound} className="hover:text-volt-lime transition-colors">24-Pack Vault</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              VIP Cold-Vault Drops
            </h4>
            <p className="text-xs text-content-secondary leading-relaxed">
              Subscribe for limited flavor experimental batches and private athlete discounts.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-volt-lime font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>ACCESS GRANTED // VIP CODE DISPATCHED</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-content-muted text-xs font-mono focus:outline-none focus:border-volt-lime"
                />
                <button
                  type="submit"
                  onMouseEnter={playNeonHoverSound}
                  aria-label="Subscribe"
                  className="p-2 rounded-lg bg-volt-lime text-black hover:bg-volt-neon transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-content-muted text-center sm:text-left">
            © {new Date().getFullYear()} VOLTIX ENERGY LABS. ALL RIGHTS RESERVED. FOR DEMO & SHOWCASE PURPOSES.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-content-muted">Crafted with Precision</span>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={playNeonHoverSound}
              aria-label="Scroll back to top"
              className="flex items-center gap-1.5 text-volt-lime hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
