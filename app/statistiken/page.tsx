'use client';

import { useState, useMemo } from 'react';
import { useVocabulary } from '@/src/hooks/useVocabulary';

export default function StatistikenPage() {
  const { vocabulary, loaded, stats, resetAll } = useVocabulary();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const categoryStats = useMemo(() => {
    const map = new Map<string, { total: number; done: number }>();
    for (const v of vocabulary) {
      const existing = map.get(v.category) ?? { total: 0, done: 0 };
      map.set(v.category, {
        total: existing.total + 1,
        done: existing.done + (v.status === 'known' || v.status === 'mastered' ? 1 : 0),
      });
    }
    return Array.from(map.entries())
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.done / b.total - a.done / a.total);
  }, [vocabulary]);

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  const knownOrMastered = stats.known + stats.mastered;
  const pct = stats.total > 0 ? Math.round((knownOrMastered / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-5">Statistiken</h1>

        {/* Main progress */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-5 shadow-sm mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{pct}%</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">bekannt</p>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{knownOrMastered} / {stats.total}</p>
          </div>
          <div className="h-3 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">{stats.newCount}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Neu</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.learning}</p>
            <p className="text-xs text-amber-500 dark:text-amber-400 mt-0.5">In Übung</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.known}</p>
            <p className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">Kann ich</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.mastered}</p>
            <p className="text-xs text-green-500 dark:text-green-400 mt-0.5">Gemeistert</p>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-sm mb-4 flex items-center justify-between">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Favoriten</span>
          <span className="font-bold text-amber-500">{stats.favorites}</span>
        </div>

        {/* Category breakdown */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-4 shadow-sm mb-4">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 text-sm">Nach Kategorie</h2>
          <div className="space-y-3">
            {categoryStats.map(({ category, total, done }) => {
              const p = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-700 dark:text-zinc-300 truncate mr-2">{category}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{done}/{total}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset */}
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 rounded-2xl bg-white dark:bg-zinc-800 text-red-500 dark:text-red-400 text-sm font-medium shadow-sm active:scale-95 transition-transform"
          >
            Fortschritt zurücksetzen
          </button>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 space-y-3">
            <p className="text-sm text-red-700 dark:text-red-400 font-medium text-center">
              Wirklich alles zurücksetzen? Das kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={() => { resetAll(); setShowResetConfirm(false); }}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold"
              >
                Ja, zurücksetzen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
