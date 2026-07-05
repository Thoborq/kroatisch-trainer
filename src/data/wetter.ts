import type { Vocabulary } from '../types';

const D = '2026-07-05';
const w = (id: string, croatian: string, german: string, type: Vocabulary['type'] = 'Nomen'): Vocabulary => ({
  id, croatian, german, category: 'Wetter', type,
  status: 'new', favorite: false, difficulty: 2, createdAt: D, updatedAt: D,
});

export const wetterVocab: Vocabulary[] = [
  w('wt001', 'kiša', 'Regen'),
  w('wt002', 'sunčano', 'sonnig', 'Adjektiv'),
  w('wt003', 'oblačno', 'bewölkt', 'Adjektiv'),
  w('wt004', 'vjetar', 'Wind'),
  w('wt005', 'toplo', 'warm', 'Adjektiv'),
  w('wt006', 'hladno', 'kalt', 'Adjektiv'),
  w('wt007', 'magla', 'Nebel'),
];
