import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const hausVocab: Vocabulary[] = [
  // Räume (Hotel-Duplikate ausgelassen: soba, kupaonica, spavaća soba)
  n('rm001', 'kuća', 'Haus', 'Räume'),
  n('rm002', 'stan', 'Wohnung', 'Räume'),
  n('rm003', 'kuhinja', 'Küche', 'Räume'),
  n('rm004', 'dnevni boravak', 'Wohnzimmer', 'Räume'),
  n('rm005', 'hodnik', 'Flur', 'Räume'),
  // Möbel & Einrichtung (Duplikate ausgelassen: krevet→ht011, stol→re006, ormar→ht013)
  n('mb001', 'namještaj', 'Möbel', 'Möbel & Einrichtung'),
  n('mb002', 'stolica', 'Stuhl', 'Möbel & Einrichtung'),
  n('mb003', 'kauč / sofa', 'Sofa', 'Möbel & Einrichtung'),
  n('mb004', 'polica', 'Regal', 'Möbel & Einrichtung'),
  // Haushalt (ključ→ht004 ausgelassen)
  n('hh001', 'prozor', 'Fenster', 'Haushalt'),
  n('hh002', 'vrata', 'Tür', 'Haushalt'),
  n('hh003', 'pod', 'Boden', 'Haushalt'),
  n('hh004', 'ručnik', 'Handtuch', 'Haushalt'),
  n('hh005', 'sapun', 'Seife', 'Haushalt'),
  n('hh006', 'tava', 'Pfanne', 'Haushalt'),
  n('hh007', 'posuda', 'Topf / Gefäß', 'Haushalt'),
  n('hh008', 'posude', 'Geschirr', 'Haushalt'),
  n('hh009', 'štednjak', 'Herd', 'Haushalt'),
  n('hh010', 'pećnica', 'Backofen', 'Haushalt'),
  n('hh011', 'hladnjak / frižider', 'Kühlschrank', 'Haushalt'),
  n('hh012', 'perilica rublja', 'Waschmaschine', 'Haushalt'),
  n('hh013', 'perilica suđa', 'Geschirrspüler', 'Haushalt'),
  n('hh014', 'svjetlo', 'Licht', 'Haushalt'),
  // Sonstiges Zuhause
  n('sz001', 'boca', 'Flasche', 'Sonstiges Zuhause'),
  n('sz002', 'papir', 'Papier', 'Sonstiges Zuhause'),
  n('sz003', 'igračka', 'Spielzeug', 'Sonstiges Zuhause'),
  n('sz004', 'alat', 'Werkzeug', 'Sonstiges Zuhause'),
  n('sz005', 'torba', 'Tasche', 'Sonstiges Zuhause'),
];
