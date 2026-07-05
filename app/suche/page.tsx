'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useVocabulary } from '@/src/hooks/useVocabulary';
import type { VocabType, VocabStatus } from '@/src/types';

const ALL = 'Alle' as const;

const statusCycle: Record<VocabStatus, VocabStatus> = {
  new: 'learning',
  learning: 'known',
  known: 'mastered',
  mastered: 'new',
};

const statusColors: Record<VocabStatus, string> = {
  new: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400',
  learning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  known: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  mastered: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};
const statusLabels: Record<VocabStatus, string> = {
  new: 'Neu',
  learning: 'Üben',
  known: 'Kann ich',
  mastered: 'Perfekt',
};
const typeColors: Record<string, string> = {
  Verb: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Nomen: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Adjektiv: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Phrase: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Sonstiges: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

export default function SuchePage() {
  const { vocabulary, loaded, toggleFavorite, setStatus } = useVocabulary();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<VocabType | typeof ALL>(ALL);
  const [statusFilter, setStatusFilter] = useState<VocabStatus | typeof ALL>(ALL);
  const [favOnly, setFavOnly] = useState(false);

  const types: (VocabType | typeof ALL)[] = [ALL, 'Verb', 'Nomen', 'Adjektiv', 'Phrase', 'Sonstiges'];
  const statuses: (VocabStatus | typeof ALL)[] = [ALL, 'new', 'learning', 'known', 'mastered'];

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return vocabulary.filter((v) => {
      if (q && !v.croatian.toLowerCase().includes(q) && !v.german.toLowerCase().includes(q)) return false;
      if (typeFilter !== ALL && v.type !== typeFilter) return false;
      if (statusFilter !== ALL && v.status !== statusFilter) return false;
      if (favOnly && !v.favorite) return false;
      return true;
    });
  }, [vocabulary, query, typeFilter, statusFilter, favOnly]);

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 pt-12 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Suche</h1>
          <Link
            href="/statistiken"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            Statistik
          </Link>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="search"
            placeholder="Kroatisch oder Deutsch suchen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mb-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Status filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mb-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                statusFilter === s ? 'bg-zinc-700 dark:bg-zinc-200 text-white dark:text-zinc-900' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {s === ALL ? 'Alle Status' : statusLabels[s as VocabStatus]}
            </button>
          ))}
          <button
            onClick={() => setFavOnly((v) => !v)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              favOnly ? 'bg-amber-400 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            ★ Favoriten
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{results.length} Ergebnisse</p>
        <div className="space-y-2">
          {results.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{v.croatian}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${typeColors[v.type]}`}>
                    {v.type}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{v.german}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{v.category}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <button
                  onClick={() => toggleFavorite(v.id)}
                  className={`${v.favorite ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600'} active:scale-90 transition-transform`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </button>
                <button
                  onClick={() => setStatus(v.id, statusCycle[v.status])}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[v.status]}`}
                >
                  {statusLabels[v.status]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
