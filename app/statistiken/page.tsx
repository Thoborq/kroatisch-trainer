'use client';

import { useState, useMemo } from 'react';
import { useVocabulary } from '@/src/hooks/useVocabulary';
import type { VocabType, Difficulty } from '@/src/types';

const VOCAB_TYPES: VocabType[] = ['Nomen', 'Verb', 'Adjektiv', 'Phrase', 'Sonstiges'];
const emptyForm = () => ({ croatian: '', german: '', category: '', type: 'Nomen' as VocabType, difficulty: 3 as Difficulty });

const STAT_ROWS = [
  { key: 'total', label: 'Gesamt', color: 'text-zinc-800 dark:text-zinc-100' },
  { key: 'newCount', label: 'Neue Wörter', color: 'text-zinc-500 dark:text-zinc-400' },
  { key: 'learning', label: 'Zum Wiederholen', color: 'text-amber-600 dark:text-amber-400' },
  { key: 'known', label: 'Kann ich', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'mastered', label: 'Gemeistert', color: 'text-green-600 dark:text-green-400' },
  { key: 'favorites', label: 'Favoriten', color: 'text-amber-500' },
] as const;

export default function StatistikenPage() {
  const { vocabulary, loaded, stats, resetAll, addCustom } = useVocabulary();
  const [view, setView] = useState<'stats' | 'add'>('stats');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saved, setSaved] = useState(false);

  const knownOrMastered = stats.known + stats.mastered;
  const pct = stats.total > 0 ? Math.round((knownOrMastered / stats.total) * 100) : 0;

  const categoryStats = useMemo(() => {
    const map = new Map<string, { total: number; done: number }>();
    for (const v of vocabulary) {
      const e = map.get(v.category) ?? { total: 0, done: 0 };
      map.set(v.category, { total: e.total + 1, done: e.done + (v.status !== 'new' ? 1 : 0) });
    }
    return Array.from(map.entries())
      .map(([cat, d]) => ({ cat, ...d }))
      .sort((a, b) => b.done / b.total - a.done / a.total);
  }, [vocabulary]);

  const typeStats = useMemo(() => {
    return VOCAB_TYPES.map((type) => {
      const group = vocabulary.filter((v) => v.type === type);
      const done = group.filter((v) => v.status !== 'new').length;
      return { type, total: group.length, done };
    }).filter((t) => t.total > 0);
  }, [vocabulary]);

  const handleAdd = (e: React.FormEvent) => {
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

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen text-zinc-400">Lädt…</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-5 pt-14 pb-3">
        <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">Statistik</h1>

        {/* Segment */}
        <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
          {(['stats', 'add'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                view === v
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {v === 'stats' ? 'Übersicht' : 'Wort hinzufügen'}
            </button>
          ))}
        </div>
      </div>

      {view === 'stats' ? (
        <div className="px-5 pb-10 space-y-4 overflow-y-auto">
          {/* Progress bar card */}
          <div className="bg-white dark:bg-zinc-800/80 rounded-3xl p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[40px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{pct}%</span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">{knownOrMastered} / {stats.total}</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">bekannte Wörter</p>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#3b82f6,#34d399)' }}
              />
            </div>
          </div>

          {/* Status rows */}
          <div className="bg-white dark:bg-zinc-800/80 rounded-3xl divide-y divide-zinc-100 dark:divide-zinc-700/60" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            {STAT_ROWS.map(({ key, label, color }) => (
              <div key={key} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
                <span className={`text-sm font-semibold tabular-nums ${color}`}>{stats[key]}</span>
              </div>
            ))}
          </div>

          {/* By type */}
          <div className="bg-white dark:bg-zinc-800/80 rounded-3xl p-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Nach Wortart</h2>
            <div className="space-y-3">
              {typeStats.map(({ type, total, done }) => {
                const p = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">{type}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 tabular-nums">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-400 rounded-full" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By category */}
          <div className="bg-white dark:bg-zinc-800/80 rounded-3xl p-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Nach Kategorie</h2>
            <div className="space-y-3">
              {categoryStats.map(({ cat, total, done }) => {
                const p = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400 truncate mr-2">{cat}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 shrink-0 tabular-nums">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${p}%` }} />
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
              className="w-full py-3 rounded-2xl bg-white dark:bg-zinc-800/80 text-red-500 dark:text-red-400 text-sm font-medium active:scale-95 transition-transform"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
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
                  className="flex-1 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => { resetAll(); setShowResetConfirm(false); }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold"
                >
                  Ja, zurücksetzen
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5 pb-10">
          <form
            onSubmit={handleAdd}
            className="bg-white dark:bg-zinc-800/80 rounded-3xl p-5 space-y-4"
            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Neue Vokabel</h2>

            {(['croatian', 'german', 'category'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                  {field === 'croatian' ? 'Kroatisch *' : field === 'german' ? 'Deutsch *' : 'Kategorie (optional)'}
                </label>
                <input
                  type="text"
                  placeholder={field === 'croatian' ? 'z. B. hvala' : field === 'german' ? 'z. B. danke' : 'z. B. Begrüßung'}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required={field !== 'category'}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

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

            <button
              type="submit"
              disabled={!form.croatian.trim() || !form.german.trim()}
              className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white disabled:opacity-40'
              }`}
            >
              {saved ? '✓ Gespeichert!' : 'Speichern'}
            </button>
          </form>

          {/* Custom words list */}
          {(() => {
            const custom = vocabulary.filter((v) => v.id.startsWith('custom_'));
            if (custom.length === 0) return null;
            return (
              <div className="mt-5">
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-1">
                  Eigene Wörter ({custom.length})
                </h3>
                <div className="space-y-2">
                  {custom.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center gap-3 bg-white dark:bg-zinc-800/80 rounded-2xl px-4 py-3"
                      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
                    >
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
            );
          })()}
        </div>
      )}
    </div>
  );
}
