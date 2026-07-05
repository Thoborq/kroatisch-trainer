'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
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

export default function LernenPage() {
  const { vocabulary, loaded, setStatus, toggleFavorite, stats } = useVocabulary();
  const [showGermanFirst, setShowGermanFirst] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const newCards = useMemo(
    () => shuffle(vocabulary.filter((v) => v.status === 'new')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionKey, loaded]
  );

  const current = newCards[sessionIndex];
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

  const restartSession = () => {
    setSessionKey((k) => k + 1);
    setSessionIndex(0);
  };

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Lernen</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/suche"
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
          <button
            onClick={() => setShowGermanFirst((v) => !v)}
            className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
          >
            {showGermanFirst ? '🇩🇪 → 🇭🇷' : '🇭🇷 → 🇩🇪'}
          </button>
        </div>
      </div>

      {/* Stats chips */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {[
          { label: `${stats.newCount} Neu`, color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400', dot: 'bg-zinc-400' },
          { label: `${stats.learning} Üben`, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400', dot: 'bg-amber-400' },
          { label: `${stats.known} Kann ich`, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', dot: 'bg-blue-400' },
          { label: `${stats.mastered} Perfekt`, color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', dot: 'bg-green-400' },
        ].map(({ label, color, dot }) => (
          <div key={label} className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {label}
          </div>
        ))}
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {newCards.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-4xl">🎉</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Alle neuen Karten durch!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              Geh zu „Wiederholen" oder „Kann ich", um dein Wissen zu festigen.
            </p>
            <button
              onClick={restartSession}
              className="mt-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              Neue Runde starten
            </button>
          </div>
        ) : sessionIndex >= newCards.length ? (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-4xl">✅</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Session abgeschlossen!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Du hast alle {newCards.length} Karten bearbeitet.
            </p>
            <button
              onClick={restartSession}
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
            total={newCards.length}
          />
        )}
      </div>
    </div>
  );
}
