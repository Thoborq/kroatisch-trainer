import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const verkehrVocab: Vocabulary[] = [
  // Verkehr & Transport
  n('vk001', 'vlak', 'Zug', 'Verkehr & Transport'),
  n('vk002', 'kolodvor', 'Bahnhof', 'Verkehr & Transport'),
  n('vk003', 'stanica', 'Station', 'Verkehr & Transport'),
  n('vk004', 'aerodrom', 'Flughafen', 'Verkehr & Transport'),
  n('vk005', 'terminal zračne luke', 'Flughafenterminal', 'Verkehr & Transport'),
  n('vk006', 'luka', 'Hafen', 'Verkehr & Transport'),
  n('vk007', 'brod', 'Schiff', 'Verkehr & Transport'),
  n('vk008', 'svemirski brod', 'Raumschiff', 'Verkehr & Transport'),
  n('vk009', 'kruzer', 'Kreuzfahrtschiff', 'Verkehr & Transport'),
  n('vk010', 'čamac', 'Boot', 'Verkehr & Transport'),
  n('vk011', 'tramvaj', 'Straßenbahn', 'Verkehr & Transport'),
  n('vk012', 'motocikl', 'Motorrad', 'Verkehr & Transport'),
  n('vk013', 'kamion', 'Lastwagen', 'Verkehr & Transport'),
  n('vk014', 'autocesta', 'Autobahn', 'Verkehr & Transport'),
  n('vk015', 'metro stanica', 'U-Bahn-Station', 'Verkehr & Transport'),
  n('vk016', 'zrakoplov', 'Flugzeug', 'Verkehr & Transport'),
  n('vk017', 'avionska karta', 'Flugticket', 'Verkehr & Transport'),
  n('vk018', 'karta', 'Karte / Fahrkarte / Eintrittskarte', 'Verkehr & Transport'),
  n('vk019', 'sjedalo', 'Sitzplatz', 'Verkehr & Transport'),
  n('vk020', 'terminal', 'Terminal', 'Verkehr & Transport'),
  n('vk021', 'autobus', 'Bus', 'Verkehr & Transport'),
  n('vk022', 'taksi', 'Taxi', 'Verkehr & Transport'),
  n('vk023', 'bicikl', 'Fahrrad', 'Verkehr & Transport'),
  n('vk024', 'automobil / auto', 'Auto', 'Verkehr & Transport'),
  n('vk025', 'vozačka dozvola', 'Führerschein', 'Verkehr & Transport'),
  // Hotel & Unterkunft
  n('ht001', 'soba', 'Zimmer', 'Hotel & Unterkunft'),
  n('ht002', 'jednokrevetna soba', 'Einzelzimmer', 'Hotel & Unterkunft'),
  n('ht003', 'dvokrevetna soba', 'Doppelzimmer', 'Hotel & Unterkunft'),
  n('ht004', 'ključ', 'Schlüssel', 'Hotel & Unterkunft'),
  n('ht005', 'kupaonica', 'Badezimmer', 'Hotel & Unterkunft'),
  n('ht006', 'tuš', 'Dusche', 'Hotel & Unterkunft'),
  n('ht007', 'televizija', 'Fernseher', 'Hotel & Unterkunft'),
  n('ht008', 'grijač vode', 'Wasserboiler', 'Hotel & Unterkunft'),
  n('ht009', 'recepcija', 'Rezeption', 'Hotel & Unterkunft'),
  n('ht010', 'prtljaga', 'Gepäck', 'Hotel & Unterkunft'),
  n('ht011', 'krevet', 'Bett', 'Hotel & Unterkunft'),
  n('ht012', 'spavaća soba', 'Schlafzimmer', 'Hotel & Unterkunft'),
  n('ht013', 'ormar', 'Kleiderschrank', 'Hotel & Unterkunft'),
  n('ht014', 'balkon', 'Balkon', 'Hotel & Unterkunft'),
  n('ht015', 'hostel', 'Hostel / Jugendherberge', 'Hotel & Unterkunft'),
];
