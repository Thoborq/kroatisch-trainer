import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, difficulty = 2): Vocabulary => ({
  id, croatian, german, category: 'Fußball', type: 'Nomen',
  status: 'new', favorite: false, difficulty: difficulty as Vocabulary['difficulty'], createdAt: D, updatedAt: D,
});
const p = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Fußball', type: 'Phrase',
  status: 'new', favorite: false, difficulty: 1, createdAt: D, updatedAt: D,
});

export const fussballVocab: Vocabulary[] = [
  n('fbl001', 'lopta', 'Ball', 1),
  n('fbl002', 'gol', 'Tor', 1),
  n('fbl003', 'igrač', 'Spieler'),
  n('fbl004', 'vratar', 'Torwart'),
  n('fbl005', 'sudac', 'Schiedsrichter', 3),
  n('fbl006', 'tim', 'Mannschaft / Team', 1),
  n('fbl007', 'utakmica', 'Spiel / Match'),
  n('fbl008', 'stadion', 'Stadion', 1),
  n('fbl009', 'navijač', 'Fan / Anhänger'),
  n('fbl010', 'pobijeda', 'Sieg'),
  n('fbl011', 'poraz', 'Niederlage'),
  n('fbl012', 'neriješeno', 'Unentschieden', 3),
  n('fbl013', 'poluvrijeme', 'Halbzeit', 3),
  n('fbl014', 'jedanaesterac', 'Elfmeter', 4),
  n('fbl015', 'liga', 'Liga', 1),
  p('fbl016', 'Koji je rezultat?', 'Wie steht es?'),
  p('fbl017', 'Gol!', 'Tor!'),
  p('fbl018', 'Hrvatska pobjeđuje!', 'Kroatien gewinnt!'),
];
