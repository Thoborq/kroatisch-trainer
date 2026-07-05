import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const kleidungVocab: Vocabulary[] = [
  // Kleidung
  n('kl001', 'cipele', 'Schuhe', 'Kleidung'),
  n('kl002', 'sandale', 'Sandalen', 'Kleidung'),
  n('kl003', 'čizme', 'Stiefel', 'Kleidung'),
  n('kl004', 'hlače', 'Hose', 'Kleidung'),
  n('kl005', 'traperice', 'Jeans', 'Kleidung'),
  n('kl006', 'košulja', 'Hemd', 'Kleidung'),
  n('kl007', 'čarape', 'Socken', 'Kleidung'),
  n('kl008', 'haljina', 'Kleid', 'Kleidung'),
  n('kl009', 'kravata', 'Krawatte', 'Kleidung'),
  n('kl010', 'jakna', 'Jacke', 'Kleidung'),
  n('kl011', 'mantil', 'Mantel', 'Kleidung'),
  n('kl012', 'rublje', 'Wäsche', 'Kleidung'),
  n('kl013', 'majica', 'T-Shirt', 'Kleidung'),
  n('kl014', 'šešir', 'Hut', 'Kleidung'),
  n('kl015', 'kaput', 'Wintermantel', 'Kleidung'),
  // Schmuck
  n('sc001', 'lančić', 'Kette', 'Schmuck'),
  n('sc002', 'narukvica', 'Armband', 'Schmuck'),
  n('sc003', 'prsten', 'Ring', 'Schmuck'),
  n('sc004', 'naušnice', 'Ohrringe', 'Schmuck'),
  // Materialien
  n('ma001', 'plastika', 'Plastik', 'Materialien'),
  n('ma002', 'koža', 'Leder', 'Materialien'),
  n('ma003', 'pamuk', 'Baumwolle', 'Materialien'),
  n('ma004', 'vuna', 'Wolle', 'Materialien'),
  // Geschäfte (Duplikate von Stadt ausgelassen)
  n('gs001', 'slastičarnica', 'Konditorei / Süßwarenladen', 'Geschäfte'),
  n('gs002', 'supermarket', 'Supermarkt', 'Geschäfte'),
  n('gs003', 'trgovački centar', 'Einkaufszentrum', 'Geschäfte'),
];
