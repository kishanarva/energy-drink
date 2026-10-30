import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin, Globe, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    flavor: 'original',
    message: '',
  });

  const [status, setStatus] = useState({ submitted: false, error: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
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
        '.contact-info-col',
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.contact-form-col',
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitted: false, error: 'Please complete all required fields.' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ submitted: false, error: 'Please provide a valid email address.' });
      return;
    }

    playPowerUpSound();
    setStatus({ submitted: true, error: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40 overflow-hidden"
      aria-label="Contact and Inquiries"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION VAULT</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            CONNECT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">VOLTIX.</span>
          </h2>
          <p className="text-content-secondary text-base sm:text-lg">
            Have questions regarding wholesale distribution, athletic sponsorships, or retail partnership? Drop us a transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct channels */}
          <div className="contact-info-col lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <h3 className="font-display font-extrabold text-2xl text-white">
                DIRECT INQUIRIES
              </h3>
              
              <div className="space-y-4 text-sm font-mono">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-volt-lime/10 text-volt-lime flex items-center justify-center shrink-0 border border-volt-lime/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold">General Inquiries</div>
                    <div className="text-content-secondary">contact@voltix-energy.demo</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-volt-lime/10 text-volt-lime flex items-center justify-center shrink-0 border border-volt-lime/30">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Wholesale & Distribution</div>
                    <div className="text-content-secondary">partnerships@voltix-energy.demo</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-volt-lime/10 text-volt-lime flex items-center justify-center shrink-0 border border-volt-lime/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Innovation Lab & HQ</div>
                    <div className="text-content-secondary">700 Cyberway Blvd, Neo Sector 4</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-content-secondary">
                ⚡ Demo notice: Inquiries are captured locally in frontend session for demonstration purposes.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
              {status.submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-volt-lime/20 text-volt-lime flex items-center justify-center ring-4 ring-volt-lime/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-3xl text-white">TRANSMISSION RECEIVED</h3>
                  <p className="text-content-secondary text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been logged in this demo prototype. In a live production deployment, our partnership team would review within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus({ submitted: false, error: '' })}
                    className="py-2.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status.error && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono">
                      {status.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono uppercase text-content-secondary block">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Marcus Vance"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-content-muted text-sm focus:outline-none focus:border-volt-lime focus:ring-1 focus:ring-volt-lime transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono uppercase text-content-secondary block">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="marcus@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-content-muted text-sm focus:outline-none focus:border-volt-lime focus:ring-1 focus:ring-volt-lime transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="flavor" className="text-xs font-mono uppercase text-content-secondary block">
                      Primary Flavor Interest
                    </label>
                    <select
                      id="flavor"
                      name="flavor"
                      value={formData.flavor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-volt-lime focus:ring-1 focus:ring-volt-lime transition-colors"
                    >
                      <option value="original">Voltix Original (Electric Lime)</option>
                      <option value="berry">Voltix Berry Blast (Purple Surge)</option>
                      <option value="citrus">Voltix Citrus Rush (Solar Mandarin)</option>
                      <option value="all">Full Lineup / Retail Wholesale</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono uppercase text-content-secondary block">
                      Transmission Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your inquiry or partnership proposal..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-content-muted text-sm focus:outline-none focus:border-volt-lime focus:ring-1 focus:ring-volt-lime transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={playNeonHoverSound}
                    className="w-full py-4 px-6 rounded-xl bg-volt-lime text-black font-display font-extrabold text-sm uppercase tracking-wider hover:bg-volt-neon transition-all duration-300 shadow-neon-lime flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
