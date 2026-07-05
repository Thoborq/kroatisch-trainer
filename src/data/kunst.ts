import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const kunstVocab: Vocabulary[] = [
  // Kunst & Kultur (kazalište→st026 ausgelassen)
  n('ku001', 'umjetnost', 'Kunst', 'Kunst & Kultur'),
  n('ku002', 'slika', 'Gemälde / Bild', 'Kunst & Kultur'),
  n('ku003', 'skulptura', 'Skulptur', 'Kunst & Kultur'),
  n('ku004', 'arhitektura', 'Architektur', 'Kunst & Kultur'),
  n('ku005', 'izložba', 'Ausstellung', 'Kunst & Kultur'),
  n('ku006', 'animacija', 'Animation', 'Kunst & Kultur'),
  n('ku007', 'glazba', 'Musik', 'Kunst & Kultur'),
  n('ku008', 'ples', 'Tanz', 'Kunst & Kultur'),
  n('ku009', 'film', 'Film', 'Kunst & Kultur'),
  n('ku010', 'koncert', 'Konzert', 'Kunst & Kultur'),
  // Freizeit & Unterhaltung
  n('fz001', 'video igra', 'Videospiel', 'Freizeit & Unterhaltung'),
  n('fz002', 'kartanje', 'Kartenspiel', 'Freizeit & Unterhaltung'),
  n('fz003', 'tulum', 'Party', 'Freizeit & Unterhaltung'),
  n('fz004', 'horor', 'Horror', 'Freizeit & Unterhaltung'),
  n('fz005', 'fantazija', 'Fantasie', 'Freizeit & Unterhaltung'),
  n('fz006', 'komedija', 'Komödie', 'Freizeit & Unterhaltung'),
  n('fz007', 'hobi', 'Hobby', 'Freizeit & Unterhaltung'),
];
