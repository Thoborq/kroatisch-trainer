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

export default function WiederholenPage() {
  const { vocabulary, loaded, setStatus, toggleFavorite, stats } = useVocabulary();
  const [showGermanFirst, setShowGermanFirst] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const cards = useMemo(
    () => shuffle(vocabulary.filter((v) => v.status === 'learning')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionKey, loaded]
  );

  const current = cards[sessionIndex];
  const advance = useCallback(() => setSessionIndex((i) => i + 1), []);

  const handleKnow = useCallback(() => {
    if (!current) return;
    setStatus(current.id, 'known');
    advance();
  }, [current, setStatus, advance]);

  const handleLearn = useCallback(() => {
    if (!current) return;
    setStatus(current.id, 'learning');
    advance();
  }, [current, setStatus, advance]);

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Wiederholen</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{stats.learning} Wörter zum Üben</p>
        </div>
        <button
          onClick={() => setShowGermanFirst((v) => !v)}
          className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
        >
          {showGermanFirst ? '🇩🇪 → 🇭🇷' : '🇭🇷 → 🇩🇪'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {cards.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-4xl">📭</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Nichts zum Wiederholen</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              Im Tab „Lernen" nach links wischen → die Karte kommt hierher.
            </p>
          </div>
        ) : sessionIndex >= cards.length ? (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-4xl">🏆</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Runde abgeschlossen!</h2>
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
            onKnow={handleKnow}
            onLearn={handleLearn}
            onFavorite={() => toggleFavorite(current.id)}
            isFavorite={current.favorite}
            current={sessionIndex + 1}
            total={cards.length}
          />
        )}
      </div>
    </div>
  );
}
