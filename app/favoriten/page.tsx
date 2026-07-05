'use client';

import { useState } from 'react';
import { useVocabulary } from '@/src/hooks/useVocabulary';
import { FlashCard } from '@/src/components/FlashCard';

export default function FavoritenPage() {
  const { vocabulary, loaded, toggleFavorite, setStatus } = useVocabulary();
  const [cardMode, setCardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showGermanFirst, setShowGermanFirst] = useState(false);

  const favorites = vocabulary.filter((v) => v.favorite);

  const statusColors: Record<string, string> = {
    new: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400',
    learning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    known: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    mastered: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  };
  const statusLabels: Record<string, string> = { new: 'Neu', learning: 'Üben', known: 'Kann ich', mastered: 'Perfekt' };

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Favoriten</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="text-6xl">⭐</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Noch keine Favoriten</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Tippe beim Lernen auf den Stern, um Vokabeln zu speichern.
          </p>
        </div>
      </div>
    );
  }

  const currentCard = favorites[cardIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Favoriten</h1>
        <div className="flex gap-2">
          {cardMode && (
            <button
              onClick={() => setShowGermanFirst((v) => !v)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {showGermanFirst ? '🇩🇪→🇭🇷' : '🇭🇷→🇩🇪'}
            </button>
          )}
          <button
            onClick={() => { setCardMode((v) => !v); setCardIndex(0); }}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
          >
            {cardMode ? 'Liste' : 'Karten'}
          </button>
        </div>
      </div>

      {cardMode ? (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {cardIndex >= favorites.length ? (
            <div className="flex flex-col items-center gap-4 px-8 text-center">
              <span className="text-6xl">✅</span>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Alle Favoriten durch!</h2>
              <button
                onClick={() => setCardIndex(0)}
                className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold"
              >
                Nochmal
              </button>
            </div>
          ) : (
            <FlashCard
              vocab={currentCard}
              showGermanFirst={showGermanFirst}
              onKnow={() => { setStatus(currentCard.id, 'known'); setCardIndex((i) => i + 1); }}
              onLearn={() => { setStatus(currentCard.id, 'learning'); setCardIndex((i) => i + 1); }}
              onFavorite={() => toggleFavorite(currentCard.id)}
              isFavorite={currentCard.favorite}
              current={cardIndex + 1}
              total={favorites.length}
            />
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{favorites.length} Favoriten</p>
          {favorites.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{v.croatian}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{v.german}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[v.status]}`}>
                {statusLabels[v.status]}
              </span>
              <button
                onClick={() => toggleFavorite(v.id)}
                className="shrink-0 text-amber-400 active:scale-90 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
