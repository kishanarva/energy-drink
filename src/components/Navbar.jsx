import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  Sparkles, 
  Compass, 
  FlaskConical, 
  Activity, 
  Users, 
  HelpCircle, 
  Send,
  Flame,
  Menu,
  X
} from 'lucide-react';
import { playNeonHoverSound, playEnergyClickSound, toggleSound } from '../utils/sound';

export default function Navbar({ onOpenBuyModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items with semantic icons
  const navItems = [
    { id: 'products', label: 'Products', icon: Sparkles },
    { id: 'occasions', label: 'When to Drink', icon: Compass },
    { id: 'story', label: 'Story', icon: Flame },
    { id: 'ingredients', label: 'Formula', icon: FlaskConical },
    { id: 'experience', label: 'Experience', icon: Activity },
    { id: 'lifestyle', label: 'Lifestyle', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  // Scroll spy & background blur threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['contact', 'faq', 'lifestyle', 'experience', 'ingredients', 'story', 'occasions', 'products', 'home'];
      const scrollPos = window.scrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    playEnergyClickSound();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.add('dark');
    }
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playNeonHoverSound();
  };

  const scrollToSection = (id) => {
    playEnergyClickSound();
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
      }`}
    >
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" 
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="VOLTIX Home"
        >
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-8 h-8 rounded-lg bg-black border border-volt-lime/80 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(212,255,0,0.35)]"
          >
            <div className="absolute inset-0 bg-volt-lime/20 animate-pulse" />
            <Zap className="w-4 h-4 text-volt-lime relative z-10 transition-transform duration-300 group-hover:rotate-12" />
          </motion.div>
          <span className="font-display font-black text-2xl tracking-wider text-white flex items-center">
            VOLT<span className="text-volt-lime">IX</span>
          </span>
        </button>

        {/* Aesthetic Animated Navigation Tabs */}
        <div 
          onMouseLeave={() => setHoveredTab(null)}
          className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => {
                  setHoveredTab(item.id);
                  playNeonHoverSound();
                }}
                className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-colors duration-200 z-10 focus:outline-none"
              >
                {/* Active Tab Sliding Pill Animation (Framer Motion layoutId) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabPill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_2px_12px_rgba(212,255,0,0.12)] -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}

                {/* Hover Tab Indicator (Subtle background pill) */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavTabPill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                {/* Active neon dot */}
                {isActive && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-volt-lime shadow-[0_0_8px_#bfff00] shrink-0" 
                  />
                )}

                {/* Tab Icon */}
                <Icon
                  className={`w-3.5 h-3.5 transition-all duration-200 ${
                    isActive
                      ? 'text-volt-lime scale-110'
                      : isHovered
                      ? 'text-zinc-200 scale-105'
                      : 'text-zinc-400'
                  }`}
                />

                {/* Tab Label */}
                <span className={isActive ? 'text-white' : isHovered ? 'text-zinc-100' : 'text-zinc-400'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls & BUY NOW */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handleSoundToggle}
            aria-label={soundOn ? 'Mute UI audio' : 'Enable UI audio'}
            title={soundOn ? 'SFX: Active' : 'SFX: Muted'}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-400 hover:text-white hover:border-volt-lime/50 transition-all flex items-center justify-center"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-volt-lime" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-40 text-zinc-500" />
            )}
          </motion.button>

          {/* Theme switcher */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-400 hover:text-white hover:border-volt-lime/50 transition-all flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800" />
            )}
          </motion.button>

          {/* BUY NOW Luxury Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => onOpenBuyModal('original')}
            onMouseEnter={playNeonHoverSound}
            className="relative group overflow-hidden py-2 px-5 sm:px-6 rounded-full bg-volt-lime text-black font-display font-black text-xs uppercase tracking-wider transition-all duration-300 hover:bg-volt-neon shadow-neon-lime flex items-center gap-2 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BUY NOW</span>
            <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300 hover:text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </nav>

      {/* Mobile Navigation Drawer with Animated Presence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-6 space-y-2 shadow-2xl overflow-hidden"
          >
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase px-3 pb-2">
              Navigation
            </div>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-volt-lime/10 text-volt-lime border border-volt-lime/30'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-volt-lime' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
