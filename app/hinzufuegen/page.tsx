'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useVocabulary } from '@/src/hooks/useVocabulary';
import type { VocabType, Difficulty } from '@/src/types';

const VOCAB_TYPES: VocabType[] = ['Nomen', 'Verb', 'Adjektiv', 'Phrase', 'Sonstiges'];

const emptyForm = () => ({
  croatian: '',
  german: '',
  category: '',
  type: 'Nomen' as VocabType,
  difficulty: 3 as Difficulty,
});

export default function HinzufuegenPage() {
  const { vocabulary, addCustom, stats } = useVocabulary();
  const [form, setForm] = useState(emptyForm());
  const [saved, setSaved] = useState(false);

  const custom = vocabulary.filter((v) => v.id.startsWith('custom_'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.croatian.trim() || !form.german.trim()) return;
    addCustom({
      croatian: form.croatian.trim(),
      german: form.german.trim(),
      category: form.category.trim() || 'Eigene Wörter',
      type: form.type,
      difficulty: form.difficulty,
    });
    setForm(emptyForm());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hinzufügen</h1>
          <Link
            href="/suche"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Suche
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 rounded-3xl p-5 shadow-sm space-y-4 mb-6">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Neue Vokabel</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Kroatisch *</label>
              <input
                type="text"
                placeholder="z. B. hvala"
                value={form.croatian}
                onChange={(e) => setForm((f) => ({ ...f, croatian: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Deutsch *</label>
              <input
                type="text"
                placeholder="z. B. danke"
                value={form.german}
                onChange={(e) => setForm((f) => ({ ...f, german: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Kategorie</label>
              <input
                type="text"
                placeholder="z. B. Begrüßung (optional)"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Wortart</label>
              <div className="flex flex-wrap gap-2">
                {VOCAB_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: t }))}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      form.type === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                Schwierigkeit: {form.difficulty}/5
              </label>
              <div className="flex gap-2">
                {([1, 2, 3, 4, 5] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, difficulty: d }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      form.difficulty === d
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!form.croatian.trim() || !form.german.trim()}
            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white disabled:opacity-40'
            }`}
          >
            {saved ? '✓ Gespeichert!' : 'Speichern'}
          </button>
        </form>

        {/* Stats */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stats.total}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Gesamt</p>
          </div>
          <div className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{custom.length}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Eigene</p>
          </div>
          <div className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl p-3 shadow-sm text-center">
            <p className="text-2xl font-bold text-amber-500">{stats.favorites}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Favoriten</p>
          </div>
        </div>

        {/* Custom vocab list */}
        {custom.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Eigene Vokabeln ({custom.length})</h2>
            <div className="space-y-2">
              {custom.map((v) => (
                <div key={v.id} className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{v.croatian}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{v.german}</p>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                    {v.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
