'use client';

import { useState, useEffect } from 'react';

type Phase = 'in' | 'hold' | 'out' | 'done';

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('in');

  useEffect(() => {
    // in → hold after 400ms (animation duration)
    const t1 = setTimeout(() => setPhase('hold'), 400);
    // hold → out after 400 + 900ms = 1300ms total
    const t2 = setTimeout(() => setPhase('out'), 1300);
    // out → done after 1300 + 400ms = 1700ms total
    const t3 = setTimeout(() => setPhase('done'), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        background: '#f5f5f7',
        transition: phase === 'out' ? 'opacity 0.4s ease' : 'none',
        opacity: phase === 'out' ? 0 : 1,
      }}
      className="dark:bg-zinc-950 dark:[background:#000]"
    >
      {/* Logo — Croatian flag tricolor with checkered emblem */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
          animation: phase === 'in' ? 'splashLogoIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          opacity: phase === 'in' ? 0 : 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/flag.svg" alt="Ucikro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* App name */}
      <div
        style={{
          animation: phase === 'in' ? 'splashTextIn 0.4s 0.08s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          opacity: phase === 'in' ? 0 : 1,
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1c1c1e',
            lineHeight: 1,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
          className="dark:text-zinc-50"
        >
          Ucikro
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#8e8e93',
            textAlign: 'center',
            marginTop: 4,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Kroatisch lernen
        </p>
      </div>
    </div>
  );
}
