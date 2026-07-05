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
      <div className="px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Kann ich</h1>
          <button
            onClick={() => setShowGermanFirst((v) => !v)}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
          >
            {showGermanFirst ? '🇩🇪 → 🇭🇷' : '🇭🇷 → 🇩🇪'}
          </button>
        </div>

        {/* Segment control */}
        <div className="flex gap-1 bg-zinc-200 dark:bg-zinc-800 p-1 rounded-xl mb-3">
          <button
            onClick={() => setView('review')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
              view === 'review'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Festigen ({stats.known})
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
              view === 'list'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Gemeistert ({stats.mastered})
          </button>
        </div>
      </div>

      {view === 'review' ? (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {cards.length === 0 ? (
            <div className="flex flex-col items-center gap-4 px-8 text-center">
              <span className="text-6xl">📖</span>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Noch nichts hier</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Wenn du im Tab „Lernen" auf „Weiß ich" tippst, landen Karten hier zum Festigen.
              </p>
            </div>
          ) : sessionIndex >= cards.length ? (
            <div className="flex flex-col items-center gap-4 px-8 text-center">
              <span className="text-6xl">🌟</span>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Session abgeschlossen!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Du hast alle {cards.length} Karten bearbeitet.
              </p>
              <button
                onClick={() => { setSessionKey((k) => k + 1); setSessionIndex(0); }}
                className="mt-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold active:scale-95 transition-transform"
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
              onFavorite={() => toggleFavorite(current.id)}
              isFavorite={current.favorite}
              current={sessionIndex + 1}
              total={cards.length}
            />
          )}
        </div>
      ) : (
        <div className="px-4 pb-8">
          {masteredList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <span className="text-5xl">🏆</span>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Noch keine gemeisterten Vokabeln. Weiter lernen!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {masteredList.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{v.croatian}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{v.german}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{v.category}</p>
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
