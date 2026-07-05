import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const sportVocab: Vocabulary[] = [
  // Sport Allgemein
  n('sa001', 'sport', 'Sport', 'Sport Allgemein'),
  n('sa002', 'sportaš', 'Sportler', 'Sport Allgemein'),
  n('sa003', 'sportovi', 'Sportarten', 'Sport Allgemein'),
  n('sa004', 'igrač', 'Spieler', 'Sport Allgemein'),
  n('sa005', 'lopta', 'Ball', 'Sport Allgemein'),
  // Sportarten
  n('sp001', 'nogomet', 'Fußball', 'Sportarten'),
  n('sp002', 'trčanje', 'Laufen', 'Sportarten'),
  n('sp003', 'plivanje', 'Schwimmen', 'Sportarten'),
  n('sp004', 'bicikliranje', 'Radfahren', 'Sportarten'),
  n('sp005', 'plesanje', 'Tanzen', 'Sportarten'),
  n('sp006', 'kampiranje', 'Camping', 'Sportarten'),
  n('sp007', 'planinarenje', 'Wandern', 'Sportarten'),
  n('sp008', 'skijanje', 'Skifahren', 'Sportarten'),
  n('sp009', 'surfanje', 'Surfen', 'Sportarten'),
  n('sp010', 'ronjenje', 'Tauchen', 'Sportarten'),
  n('sp011', 'ronjenje na dah', 'Schnorcheln', 'Sportarten'),
  n('sp012', 'pecanje', 'Angeln', 'Sportarten'),
  n('sp013', 'tenis', 'Tennis', 'Sportarten'),
  n('sp014', 'košarka', 'Basketball', 'Sportarten'),
  n('sp015', 'odbojka', 'Volleyball', 'Sportarten'),
  // Sportstätten
  n('ss001', 'nogometno igralište', 'Fußballplatz', 'Sportstätten'),
  n('ss002', 'bazen', 'Schwimmbad', 'Sportstätten'),
  n('ss003', 'sauna', 'Sauna', 'Sportstätten'),
  n('ss004', 'teretana', 'Fitnessstudio', 'Sportstätten'),
  n('ss005', 'stadion', 'Stadion', 'Sportstätten'),
];
