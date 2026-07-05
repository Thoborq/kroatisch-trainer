import type { Vocabulary } from '../types';

const D = '2026-07-05';
const s = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Zahlen', type: 'Sonstiges',
  status: 'new', favorite: false, difficulty: 2, createdAt: D, updatedAt: D,
});

export const zahlenVocab: Vocabulary[] = [
  s('zh001', 'jedan', 'eins'),
  s('zh002', 'dva', 'zwei'),
  s('zh003', 'tri', 'drei'),
  s('zh004', 'četiri', 'vier'),
  s('zh005', 'pet', 'fünf'),
  s('zh006', 'šest', 'sechs'),
  s('zh007', 'sedam', 'sieben'),
  s('zh008', 'osam', 'acht'),
  s('zh009', 'devet', 'neun'),
  s('zh010', 'deset', 'zehn'),
  s('zh011', 'dvadeset', 'zwanzig'),
  s('zh012', 'pedeset', 'fünfzig'),
  s('zh013', 'sto', 'hundert'),
  s('zh014', 'tisuću', 'tausend'),
];
