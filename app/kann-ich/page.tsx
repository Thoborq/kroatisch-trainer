'use client';

import { useState, useMemo, useCallback } from 'react';
import { useVocabulary } from '@/src/hooks/useVocabulary';
import { FlashCard } from '@/src/components/FlashCard';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KannIchPage() {
  const { vocabulary, loaded, setStatus, toggleFavorite, stats } = useVocabulary();
  const [showGermanFirst, setShowGermanFirst] = useState(false);
  const [view, setView] = useState<'review' | 'list'>('review');
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const cards = useMemo(
    () => shuffle(vocabulary.filter((v) => v.status === 'known')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionKey, loaded]
  );

  const current = cards[sessionIndex];
  const advance = useCallback(() => setSessionIndex((i) => i + 1), []);

  // Right swipe = mastered, left swipe = back to learning
  const handleMastered = useCallback(() => {
    if (!current) return;
    setStatus(current.id, 'mastered');
    advance();
  }, [current, setStatus, advance]);

  const handleLearn = useCallback(() => {
    if (!current) return;
    setStatus(current.id, 'learning');
    advance();
  }, [current, setStatus, advance]);

  const masteredList = useMemo(
    () => vocabulary.filter((v) => v.status === 'mastered'),
    [vocabulary]
  );

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Kann ich</h1>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              {stats.known} zum Festigen · {stats.mastered} gemeistert
            </p>
          </div>
          {view === 'review' && (
            <button
              onClick={() => setShowGermanFirst((v) => !v)}
              className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
            >
              {showGermanFirst ? '🇩🇪 → 🇭🇷' : '🇭🇷 → 🇩🇪'}
            </button>
          )}
        </div>

        {/* Segment control */}
        <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
          {(['review', 'list'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                view === v
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {v === 'review' ? `Festigen (${stats.known})` : `Gemeistert (${stats.mastered})`}
            </button>
          ))}
        </div>
      </div>

      {view === 'review' ? (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {cards.length === 0 ? (
            <div className="flex flex-col items-center gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-4xl">📖</div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Noch nichts hier</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
                Im Tab „Lernen" nach rechts wischen → die Karte kommt hierher.
              </p>
            </div>
          ) : sessionIndex >= cards.length ? (
            <div className="flex flex-col items-center gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-4xl">🌟</div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Super gemacht!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Du hast alle {cards.length} Karten bearbeitet.
              </p>
              <button
                onClick={() => { setSessionKey((k) => k + 1); setSessionIndex(0); }}
                className="mt-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm active:scale-95 transition-transform"
              >
                Nochmal
              </button>
            </div>
          ) : (
            <FlashCard
              vocab={current}
              showGermanFirst={showGermanFirst}
              onKnow={handleMastered}
              onLearn={handleLearn}
              knowLabel="Gemeistert"
              learnLabel="Nochmal"
              onFavorite={() => toggleFavorite(current.id)}
              isFavorite={current.favorite}
              current={sessionIndex + 1}
              total={cards.length}
            />
          )}
        </div>
      ) : (
        <div className="px-5 pb-8 pt-4 overflow-y-auto">
          {masteredList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="text-5xl">🏆</div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Noch keine gemeisterten Vokabeln.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {masteredList.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 bg-white dark:bg-zinc-800/80 rounded-2xl px-4 py-3"
                  style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{v.croatian}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{v.german}</p>
                  </div>
                  <button
                    onClick={() => setStatus(v.id, 'learning')}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium active:scale-95 transition-transform"
                  >
                    Nochmal
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
