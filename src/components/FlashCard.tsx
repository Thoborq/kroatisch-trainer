'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Vocabulary } from '@/src/types';

export interface FlashCardProps {
  vocab: Vocabulary;
  showGermanFirst?: boolean;
  onKnow: () => void;
  onLearn: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  current?: number;
  total?: number;
  knowLabel?: string;
  learnLabel?: string;
}

const SWIPE_THRESHOLD = 80;

const L_LABELS = ['ich', 'du', 'er/sie'] as const;
const L_KEYS = ['ja', 'ti', 'onOna'] as const;
const R_LABELS = ['wir', 'ihr/Sie', 'sie'] as const;
const R_KEYS = ['mi', 'vi', 'oni'] as const;

const TYPE_COLORS: Record<string, string> = {
  Verb: 'bg-violet-100/80 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Nomen: 'bg-sky-100/80 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Adjektiv: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Phrase: 'bg-amber-100/80 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Sonstiges: 'bg-zinc-100/80 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
};

export function FlashCard({
  vocab,
  showGermanFirst = false,
  onKnow,
  onLearn,
  onFavorite,
  isFavorite,
  current,
  total,
  knowLabel = 'Kann ich',
  learnLabel = 'Üben',
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);

  const drag = useRef({ active: false, startX: 0, moved: false });
  const currentDX = useRef(0);
  const exitDirRef = useRef<'left' | 'right' | null>(null);

  useEffect(() => { exitDirRef.current = exitDir; }, [exitDir]);

  // Reset on new card
  useEffect(() => {
    setFlipped(false);
    setDragX(0);
    setExitDir(null);
    exitDirRef.current = null;
    drag.current = { active: false, startX: 0, moved: false };
    currentDX.current = 0;
  }, [vocab.id]);

  // Execute action after exit animation
  useEffect(() => {
    if (!exitDir) return;
    const t = setTimeout(() => {
      if (exitDir === 'right') onKnow();
      else onLearn();
    }, 270);
    return () => clearTimeout(t);
  }, [exitDir, onKnow, onLearn]);

  const onStart = useCallback((clientX: number) => {
    if (exitDirRef.current) return;
    drag.current = { active: true, startX: clientX, moved: false };
    currentDX.current = 0;
  }, []);

  const onMove = useCallback((clientX: number) => {
    if (!drag.current.active) return;
    const dx = clientX - drag.current.startX;
    if (Math.abs(dx) > 8) drag.current.moved = true;
    currentDX.current = dx;
    setDragX(dx);
  }, []);

  const onEnd = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dx = currentDX.current;
    currentDX.current = 0;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      setExitDir(dx > 0 ? 'right' : 'left');
    } else {
      setDragX(0);
    }
  }, []);

  // Global mouse events (desktop support)
  useEffect(() => {
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const mu = () => onEnd();
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', mu);
    };
  }, [onMove, onEnd]);

  const handleClick = () => {
    if (drag.current.moved || exitDirRef.current) return;
    setFlipped((f) => !f);
  };

  // Transform values
  const tx = exitDir === 'right' ? 520 : exitDir === 'left' ? -520 : dragX;
  const rot = exitDir === 'right' ? 22 : exitDir === 'left' ? -22 : dragX * 0.055;

  const dragTransition = exitDir
    ? 'transform 0.27s ease-in, opacity 0.27s ease-in'
    : drag.current.active
    ? 'none'
    : 'transform 0.32s cubic-bezier(0.34,1.56,0.64,1)';

  const flipTransition = drag.current.active
    ? 'none'
    : 'transform 0.42s cubic-bezier(0.4,0,0.2,1)';

  const rightPct = Math.max(0, Math.min(dragX / SWIPE_THRESHOLD, 1));
  const leftPct = Math.max(0, Math.min(-dragX / SWIPE_THRESHOLD, 1));

  const frontText = showGermanFirst ? vocab.german : vocab.croatian;
  const backText = showGermanFirst ? vocab.croatian : vocab.german;
  const isVerb = vocab.type === 'Verb' && !!vocab.forms;
  const cardMinH = isVerb ? 340 : 240;

  return (
    <div className="relative flex flex-col items-center w-full px-5 gap-4 select-none">
      {/* Progress */}
      {current !== undefined && total !== undefined && (
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 mb-1.5">
            <span className="font-medium tabular-nums">{current} / {total}</span>
            <span>{vocab.category}</span>
          </div>
          <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{ width: `${(current / total) * 100}%`, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)' }}
            />
          </div>
        </div>
      )}

      {/* Swipe indicators */}
      <div className="flex justify-between w-full max-w-sm pointer-events-none">
        <div
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ opacity: leftPct, background: '#ef4444', transform: `scale(${0.85 + leftPct * 0.15})` }}
        >
          ← {learnLabel}
        </div>
        <div
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ opacity: rightPct, background: '#22c55e', transform: `scale(${0.85 + rightPct * 0.15})` }}
        >
          {knowLabel} →
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm" style={{ perspective: '1200px' }}>
        {/* Drag layer */}
        <div
          style={{
            transform: `translateX(${tx}px) rotate(${rot}deg)`,
            transition: dragTransition,
            opacity: exitDir ? 0 : 1,
            cursor: drag.current.active ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
          }}
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          onMouseDown={(e) => onStart(e.clientX)}
          onClick={handleClick}
        >
          {/* Flip layer */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${flipped ? 180 : 0}deg)`,
              transition: flipTransition,
              minHeight: `${cardMinH}px`,
              position: 'relative',
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 bg-white dark:bg-zinc-800/95 rounded-[28px] overflow-hidden flex flex-col items-center justify-center p-8 gap-3"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow: '0 2px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="absolute inset-0 bg-green-500/[0.08]" style={{ opacity: rightPct }} />
              <div className="absolute inset-0 bg-red-500/[0.08]" style={{ opacity: leftPct }} />

              <p className="relative text-[28px] font-semibold text-center text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight">
                {frontText}
              </p>
              <span className={`relative text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[vocab.type] ?? TYPE_COLORS.Sonstiges}`}>
                {vocab.type}
              </span>
              <div className="relative flex gap-1.5">
                {[1, 2, 3, 4, 5].map((d) => (
                  <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= vocab.difficulty ? 'bg-blue-400' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                ))}
              </div>
              <p className="relative text-[11px] text-zinc-400 dark:text-zinc-600 mt-0.5">Antippen zum Aufdecken</p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 bg-white dark:bg-zinc-800/95 rounded-[28px] overflow-hidden flex flex-col items-center justify-center p-6 gap-3"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 2px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="absolute inset-0 bg-green-500/[0.08] pointer-events-none" style={{ opacity: rightPct }} />
              <div className="absolute inset-0 bg-red-500/[0.08] pointer-events-none" style={{ opacity: leftPct }} />

              <p className="relative text-[24px] font-semibold text-center text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight">
                {backText}
              </p>

              {isVerb && vocab.forms && (
                <div className="relative w-full grid grid-cols-2 gap-x-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-2xl p-3.5">
                  <div className="space-y-3">
                    {L_KEYS.map((key, i) => (
                      <div key={key}>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">{L_LABELS[i]}</p>
                        <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-100 leading-snug">{vocab.forms![key]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {R_KEYS.map((key, i) => (
                      <div key={key}>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">{R_LABELS[i]}</p>
                        <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-100 leading-snug">{vocab.forms![key]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <span className={`relative text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[vocab.type] ?? TYPE_COLORS.Sonstiges}`}>
                {vocab.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: favorite + hint */}
      <div className="w-full max-w-sm flex items-center justify-between px-1">
        {onFavorite ? (
          <button
            onClick={(e) => { e.stopPropagation(); onFavorite(); }}
            className="p-2 -m-2 active:scale-90 transition-transform"
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.8}
              className={`w-6 h-6 transition-colors ${isFavorite ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </button>
        ) : <div className="w-10" />}
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">wischen zum Bewerten</p>
        <div className="w-10" />
      </div>
    </div>
  );
}
