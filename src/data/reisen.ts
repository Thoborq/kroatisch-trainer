import type { Vocabulary } from '../types';

const D = '2026-07-05';
const w = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Reisen & Urlaub', type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const reisenVocab: Vocabulary[] = [
  w('rs001', 'putovanje', 'Reise'),
  w('rs002', 'putnik', 'Reisender / Passagier'),
  w('rs003', 'odmor', 'Urlaub'),
  w('rs004', 'praznik', 'Feiertag'),
  w('rs005', 'suvenir', 'Souvenir / Andenken'),
  w('rs006', 'turistički vodič', 'Reiseführer'),
  w('rs007', 'razgledavanje', 'Führung / Besichtigung'),
  w('rs008', 'razgledavanje čamcem', 'Bootsrundfahrt'),
  w('rs009', 'eko turizam', 'Ökotourismus'),
  w('rs010', 'avanturističko putovanje', 'Abenteuerreise'),
  w('rs011', 'poslovno putovanje', 'Geschäftsreise'),
  w('rs012', 'početnik', 'Anfänger'),
  w('rs013', 'plan grada', 'Stadtplan'),
  w('rs014', 'znamenitost', 'Sehenswürdigkeit'),
  w('rs015', 'spomenik', 'Denkmal'),
  w('rs016', 'muzej', 'Museum'),
  w('rs017', 'svijet', 'Welt'),
  w('rs018', 'putovnica', 'Reisepass'),
  w('rs019', 'viza', 'Visum'),
  w('rs020', 'rezervacija', 'Reservierung'),
  w('rs021', 'iskaznica', 'Ausweis'),
];
