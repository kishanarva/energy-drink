import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-element')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none hidden md:block">
      {/* Central glow dot */}
      <div
        className="custom-cursor-dot shadow-neon-lime"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 1.8 : 1})`,
        }}
      />
      {/* Trailing electric halo ring */}
      <div
        className="custom-cursor-ring transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          borderColor: isHovered ? 'var(--accent-lime)' : 'rgba(199, 255, 0, 0.4)',
          backgroundColor: isHovered ? 'rgba(199, 255, 0, 0.08)' : 'transparent',
        }}
      />
    </div>
  );
}
