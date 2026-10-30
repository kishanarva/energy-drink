import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Zap, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { playPowerUpSound } from '../utils/sound';

export default function CartModal({ isOpen, onClose, initialFlavor = 'original' }) {
  const [flavor, setFlavor] = useState(initialFlavor);
  const [packSize, setPackSize] = useState('12'); // '3', '12', '24'
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const prices = {
    '3': 11.99,
    '12': 34.99,
    '24': 62.99,
  };

  const flavors = [
    { id: 'original', name: 'Voltix Original', color: 'text-volt-lime border-volt-lime' },
    { id: 'berry', name: 'Berry Blast', color: 'text-purple-400 border-purple-400' },
    { id: 'citrus', name: 'Citrus Rush', color: 'text-orange-400 border-orange-400' },
  ];

  const unitPrice = prices[packSize] || 34.99;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    playPowerUpSound();

    // Trigger celebratory confetti explosion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C7FF00', '#39FF14', '#A855F7', '#F97316', '#FFFFFF'],
    });

    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setIsOrdered(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
    >
      <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/10 text-content-primary">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isOrdered ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-volt-lime/20 text-volt-lime flex items-center justify-center ring-4 ring-volt-lime/40">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">ORDER ELECTRIFIED!</h3>
            <p className="text-content-secondary text-sm max-w-xs mx-auto">
              Your supply of <span className="text-volt-lime font-semibold">{flavors.find(f => f.id === flavor)?.name}</span> is being prepared for immediate launch.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-content-secondary">
              <Zap className="w-3.5 h-3.5 text-volt-lime" />
              <span>Demo Mode: Zero real transaction charges</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="flex items-center gap-2 text-volt-lime text-xs font-mono font-semibold tracking-wider uppercase">
              <Zap className="w-4 h-4" />
              <span>Direct Cold Vault Dispatch</span>
            </div>

            <div>
              <h2 id="cart-modal-title" className="text-2xl font-display font-extrabold text-white">
                EQUIP YOUR VOLTIX
              </h2>
              <p className="text-content-secondary text-xs sm:text-sm mt-1">
                Zero crash. Zero sugar. Ultra-electrified focus delivered to your door.
              </p>
            </div>

            {/* Flavor Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-content-secondary uppercase tracking-wider block">
                1. Select Flavor Variant
              </label>
              <div className="grid grid-cols-3 gap-2">
                {flavors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFlavor(item.id)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                      flavor === item.id
                        ? `${item.color} bg-white/10 shadow-sm`
                        : 'border-white/10 text-content-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-content-secondary uppercase tracking-wider block">
                2. Select Pack Matrix
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { size: '3', label: '3-Can Trial', sub: '$11.99' },
                  { size: '12', label: '12-Pack Case', sub: '$34.99 ($2.91/can)', badge: 'POPULAR' },
                  { size: '24', label: '24-Pack Vault', sub: '$62.99 ($2.62/can)', badge: 'BEST VALUE' },
                ].map((pack) => (
                  <button
                    key={pack.size}
                    type="button"
                    onClick={() => setPackSize(pack.size)}
                    className={`relative p-2.5 rounded-lg border text-left transition-all ${
                      packSize === pack.size
                        ? 'border-volt-lime bg-volt-lime/10 text-white'
                        : 'border-white/10 text-content-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {pack.badge && (
                      <span className="absolute -top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-volt-lime text-black font-bold">
                        {pack.badge}
                      </span>
                    )}
                    <div className="text-xs font-bold">{pack.label}</div>
                    <div className="text-[11px] text-content-muted mt-0.5">{pack.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="text-xs font-mono text-content-secondary uppercase tracking-wider">
                Quantity
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  -
                </button>
                <span className="font-mono font-bold text-white text-base min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Guarantee badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-content-secondary pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-volt-lime" />
                <span>Express Cold-Chain Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-volt-lime" />
                <span>30-Day Energy Guarantee</span>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-volt-lime text-black font-display font-extrabold text-sm tracking-wider uppercase hover:bg-volt-neon transition-all duration-200 shadow-neon-lime flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>UNLOCK INSTANT ENERGY — ${totalPrice}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
