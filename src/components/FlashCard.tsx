'use client';

import { useState } from 'react';
import type { Vocabulary } from '@/src/types';

interface FlashCardProps {
  vocab: Vocabulary;
  showGermanFirst?: boolean;
  onKnow: () => void;
  onLearn: () => void;
  onSkip?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  current?: number;
  total?: number;
}

const CONJUGATION_LABELS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie'];
const FORMS_KEYS = ['ja', 'ti', 'onOna', 'mi', 'vi', 'oni'] as const;

export function FlashCard({
  vocab,
  showGermanFirst = false,
  onKnow,
  onLearn,
  onSkip,
  onFavorite,
  isFavorite,
  current,
  total,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const frontText = showGermanFirst ? vocab.german : vocab.croatian;
  const backText = showGermanFirst ? vocab.croatian : vocab.german;
  const frontLang = showGermanFirst ? '🇩🇪' : '🇭🇷';
  const backLang = showGermanFirst ? '🇭🇷' : '🇩🇪';

  const typeColors: Record<string, string> = {
    Verb: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    Nomen: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    Adjektiv: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    Phrase: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    Sonstiges: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  };

  return (
    <div className="relative flex flex-col items-center w-full px-4 gap-4">
      {(current !== undefined && total !== undefined) && (
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            <span>{current} / {total}</span>
            <span>{vocab.category}</span>
          </div>
          <div className="h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(current / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-sm" style={{ perspective: '1000px' }}>
        <div
          className="relative cursor-pointer select-none"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '260px',
          }}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 gap-3"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-3xl">{frontLang}</span>
            <p className="text-2xl font-semibold text-center text-zinc-900 dark:text-zinc-50 leading-tight">
              {frontText}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[vocab.type] ?? typeColors.Sonstiges}`}>
              {vocab.type}
            </span>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">Tippen zum Aufdecken</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-blue-50 dark:bg-zinc-800 rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 gap-4 overflow-y-auto"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-3xl">{backLang}</span>
            <p className="text-2xl font-semibold text-center text-zinc-900 dark:text-zinc-50 leading-tight">
              {backText}
            </p>

            {vocab.type === 'Verb' && vocab.forms && (
              <div className="w-full mt-1 rounded-2xl bg-white dark:bg-zinc-700/50 overflow-hidden text-sm">
                {FORMS_KEYS.map((key, i) => {
                  const forms = vocab.forms!;
                  return (
                    <div
                      key={key}
                      className={`flex justify-between px-4 py-1.5 ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-zinc-50 dark:bg-zinc-700/30'
                      }`}
                    >
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs w-16">{CONJUGATION_LABELS[i]}</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium text-right">{forms[key]}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons - only show when flipped */}
      <div className={`w-full max-w-sm transition-all duration-300 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <div className="flex gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onLearn(); setFlipped(false); }}
            className="flex-1 py-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold text-sm active:scale-95 transition-transform"
          >
            Noch üben
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onKnow(); setFlipped(false); }}
            className="flex-1 py-4 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold text-sm active:scale-95 transition-transform"
          >
            Weiß ich ✓
          </button>
        </div>
        {onSkip && (
          <button
            onClick={(e) => { e.stopPropagation(); onSkip(); setFlipped(false); }}
            className="w-full mt-2 py-2.5 text-zinc-500 dark:text-zinc-400 text-sm font-medium active:scale-95 transition-transform"
          >
            Überspringen →
          </button>
        )}
      </div>

      {/* Favorite button */}
      {onFavorite && (
        <button
          onClick={onFavorite}
          className="absolute top-4 right-4 p-2 text-zinc-400 dark:text-zinc-500 active:scale-90 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} className={`w-5 h-5 ${isFavorite ? 'text-amber-400' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
