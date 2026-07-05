import type { Vocabulary } from '../types';

const D = '2026-07-05';
const w = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Natur', type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const naturVocab: Vocabulary[] = [
  w('na001', 'sunce', 'Sonne'),
  w('na002', 'nebo', 'Himmel'),
  w('na003', 'trava', 'Gras'),
  w('na004', 'drvo', 'Baum'),
  w('na005', 'cvijet', 'Blume'),
  w('na006', 'kamen', 'Stein'),
  w('na007', 'planina', 'Berg'),
  w('na008', 'brijeg', 'Hügel / Berg'),
  w('na009', 'šuma', 'Wald'),
  w('na010', 'snijeg', 'Schnee'),
  w('na011', 'proljeće', 'Frühling'),
  w('na012', 'ljeto', 'Sommer'),
  w('na013', 'jesen', 'Herbst'),
  w('na014', 'zima', 'Winter'),
  w('na015', 'zalazak sunca', 'Sonnenuntergang'),
  w('na016', 'izlazak sunca', 'Sonnenaufgang'),
  w('na017', 'vatra', 'Feuer'),
  w('na018', 'logorska vatra', 'Lagerfeuer'),
  w('na019', 'more', 'Meer'),
  w('na020', 'plaža', 'Strand'),
  w('na021', 'otok', 'Insel'),
];
