import type { Vocabulary } from '../types';

const D = '2026-07-05';
const w = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Tiere', type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const tiereVocab: Vocabulary[] = [
  w('ti001', 'pas', 'Hund'),
  w('ti002', 'mačka', 'Katze'),
  w('ti003', 'ptica', 'Vogel'),
  w('ti004', 'slon', 'Elefant'),
  w('ti005', 'jelen', 'Hirsch'),
  w('ti006', 'medvjed', 'Bär'),
  w('ti007', 'lav', 'Löwe'),
  w('ti008', 'majmun', 'Affe'),
  w('ti009', 'zmija', 'Schlange'),
  w('ti010', 'žirafa', 'Giraffe'),
  w('ti011', 'pingvin', 'Pinguin'),
  w('ti012', 'klokan', 'Känguru'),
  w('ti013', 'nosorog', 'Nashorn'),
  w('ti014', 'deva', 'Kamel'),
  w('ti015', 'konj', 'Pferd'),
  w('ti016', 'gušter', 'Echse'),
  w('ti017', 'leptir', 'Schmetterling'),
  w('ti018', 'miš', 'Maus'),
  w('ti019', 'kokoš', 'Huhn'),
  w('ti020', 'sova', 'Eule'),
  w('ti021', 'svinja', 'Schwein'),
  w('ti022', 'morski pas', 'Hai'),
  w('ti023', 'kit', 'Wal'),
  w('ti024', 'psić', 'Welpe'),
  w('ti025', 'životinja', 'Tier'),
  w('ti026', 'kornjača', 'Schildkröte'),
  w('ti027', 'krava', 'Kuh'),
  w('ti028', 'ovca', 'Schaf'),
  w('ti029', 'koza', 'Ziege'),
];
