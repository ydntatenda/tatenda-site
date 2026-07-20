'use client';

import { useEffect, useRef, useState } from 'react';

export default function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'drawn'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion, skip the animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Hide it (no transition), then reveal when it scrolls into view
    setState('hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Double rAF so the hidden state paints before the transition starts
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setState('drawn'))
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="signature">
      <img
        className={
          state === 'hidden'
            ? 'sig-hidden'
            : state === 'drawn'
              ? 'sig-drawing'
              : ''
        }
        src="/signature.svg"
        alt="Tatenda Ncube-Muchandibaya signature"
        style={{ filter: 'invert(0.15)' }}
      />
    </div>
  );
}
