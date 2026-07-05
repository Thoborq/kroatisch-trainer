import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const berufeVocab: Vocabulary[] = [
  // Berufe (Duplikate aus Personen Schule ausgelassen)
  n('bf001', 'inženjer', 'Ingenieur', 'Berufe'),
  n('bf002', 'liječnik', 'Arzt', 'Berufe'),
  n('bf003', 'učitelj', 'Lehrer', 'Berufe'),
  n('bf004', 'odvjetnik', 'Anwalt', 'Berufe'),
  n('bf005', 'kuhar', 'Koch', 'Berufe'),
  // Arbeitswelt
  n('aw001', 'posao', 'Arbeit', 'Arbeitswelt'),
  n('aw002', 'zanimanje', 'Beruf', 'Arbeitswelt'),
  n('aw003', 'poslodavac', 'Arbeitgeber', 'Arbeitswelt'),
  n('aw004', 'šef', 'Chef', 'Arbeitswelt'),
  n('aw005', 'sastanak', 'Termin / Besprechung', 'Arbeitswelt'),
  n('aw006', 'odgovor', 'Antwort', 'Arbeitswelt'),
  n('aw007', 'pitanje', 'Frage', 'Arbeitswelt'),
  n('aw008', 'kvaliteta', 'Qualität', 'Arbeitswelt'),
  n('aw009', 'plaća', 'Gehalt', 'Arbeitswelt'),
  n('aw010', 'ured', 'Büro', 'Arbeitswelt'),
  n('aw011', 'kolega', 'Kollege', 'Arbeitswelt'),
];
