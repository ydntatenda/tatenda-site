'use client';

import { useEffect, useRef } from 'react';

export default function Signature() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('drawn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    // Fallback: if already in view on load, draw after entrance settles
    const t = setTimeout(() => el.classList.add('drawn'), 900);

    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="signature">
      <img
        ref={ref}
        className="sig-reveal"
        src="/signature.svg"
        alt="Tatenda Ncube-Muchandibaya signature"
        style={{ filter: 'invert(0.55)' }}
      />
    </div>
  );
}
