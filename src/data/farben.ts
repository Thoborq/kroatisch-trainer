import type { Vocabulary } from '../types';

const D = '2026-07-05';
const a = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Farben', type: 'Adjektiv',
  status: 'new', favorite: false, difficulty: 2, createdAt: D, updatedAt: D,
});

export const farbenVocab: Vocabulary[] = [
  a('fb001', 'crvena', 'rot'),
  a('fb002', 'plava', 'blau'),
  a('fb003', 'zelena', 'grün'),
  a('fb004', 'žuta', 'gelb'),
  a('fb005', 'crna', 'schwarz'),
  a('fb006', 'bijela', 'weiß'),
  a('fb007', 'smeđa', 'braun'),
  a('fb008', 'siva', 'grau'),
  a('fb009', 'ružičasta', 'rosa'),
  a('fb010', 'narančasta', 'orange'),
  a('fb011', 'ljubičasta', 'lila / violett'),
];
