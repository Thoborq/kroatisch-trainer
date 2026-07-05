import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Gefühle & Beziehungen', type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const gefuehleVocab: Vocabulary[] = [
  n('gf001', 'ljubav', 'Liebe'),
  n('gf002', 'mržnja', 'Hass'),
  n('gf003', 'sreća', 'Glück'),
  n('gf004', 'povjerenje', 'Vertrauen'),
  n('gf005', 'brak', 'Ehe'),
  n('gf006', 'rastava', 'Scheidung'),
  n('gf007', 'par', 'Paar'),
  n('gf008', 'vjenčanje', 'Hochzeit'),
  n('gf009', 'godišnjica', 'Jubiläum'),
  n('gf010', 'tuga', 'Trauer'),
  n('gf011', 'strah', 'Angst'),
  n('gf012', 'ljutnja', 'Wut / Ärger'),
];
