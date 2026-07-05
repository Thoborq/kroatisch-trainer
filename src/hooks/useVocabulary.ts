'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { allVocab } from '@/src/data';
import type { Vocabulary, VocabStatus, VocabState, Difficulty } from '@/src/types';

function resolveEntry(prev: VocabState, id: string) {
  const override = prev.overrides[id];
  const base = allVocab.find((v) => v.id === id);
  const custom = prev.custom.find((v) => v.id === id);
  const source = base ?? custom;
  return {
    status: (override?.status ?? source?.status ?? 'new') as VocabStatus,
    favorite: override?.favorite ?? source?.favorite ?? false,
    difficulty: (override?.difficulty ?? source?.difficulty ?? 3) as Difficulty,
  };
}

const STORAGE_KEY = 'ucikro_state';

function loadState(): VocabState {
  if (typeof window === 'undefined') return { overrides: {}, custom: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { overrides: {}, custom: [] };
    return JSON.parse(raw);
  } catch {
    return { overrides: {}, custom: [] };
  }
}

function saveState(state: VocabState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function useVocabulary() {
  const [state, setState] = useState<VocabState>({ overrides: {}, custom: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  const vocabulary: Vocabulary[] = useMemo(() => {
    const applyOverride = (v: Vocabulary): Vocabulary => {
      const override = state.overrides[v.id];
      if (override) return { ...v, status: override.status, favorite: override.favorite, difficulty: override.difficulty };
      return v;
    };
    return [...allVocab.map(applyOverride), ...state.custom.map(applyOverride)];
  }, [state]);

  const setStatus = useCallback((id: string, status: VocabStatus) => {
    setState((prev) => {
      const { favorite, difficulty } = resolveEntry(prev, id);
      const next: VocabState = {
        ...prev,
        overrides: { ...prev.overrides, [id]: { status, favorite, difficulty } },
      };
      saveState(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => {
      const { status, favorite, difficulty } = resolveEntry(prev, id);
      const next: VocabState = {
        ...prev,
        overrides: { ...prev.overrides, [id]: { status, favorite: !favorite, difficulty } },
      };
      saveState(next);
      return next;
    });
  }, []);

  const addCustom = useCallback((entry: Omit<Vocabulary, 'id' | 'status' | 'favorite' | 'createdAt' | 'updatedAt'>) => {
    setState((prev) => {
      const id = `custom_${Date.now()}`;
      const now = new Date().toISOString().slice(0, 10);
      const newEntry: Vocabulary = { ...entry, id, status: 'new', favorite: false, createdAt: now, updatedAt: now };
      const next: VocabState = { ...prev, custom: [...prev.custom, newEntry] };
      saveState(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const next: VocabState = { overrides: {}, custom: [] };
    saveState(next);
    setState(next);
  }, []);

  const stats = useMemo(() => {
    const total = vocabulary.length;
    const newCount = vocabulary.filter((v) => v.status === 'new').length;
    const learning = vocabulary.filter((v) => v.status === 'learning').length;
    const known = vocabulary.filter((v) => v.status === 'known').length;
    const mastered = vocabulary.filter((v) => v.status === 'mastered').length;
    const favorites = vocabulary.filter((v) => v.favorite).length;
    return { total, newCount, learning, known, mastered, favorites };
  }, [vocabulary]);

  return { vocabulary, loaded, setStatus, toggleFavorite, addCustom, resetAll, stats };
}
