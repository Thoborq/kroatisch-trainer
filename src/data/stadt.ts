import type { Vocabulary } from '../types';

const D = '2026-07-05';
const w = (id: string, croatian: string, german: string, type: Vocabulary['type'] = 'Nomen'): Vocabulary => ({
  id, croatian, german, category: 'Stadt & Orientierung', type,
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const stadtVocab: Vocabulary[] = [
  w('st001', 'grad', 'Stadt'),
  w('st002', 'glavni grad', 'Hauptstadt'),
  w('st003', 'stari grad', 'Altstadt'),
  w('st004', 'ulica', 'Straße'),
  w('st005', 'cesta', 'Straße (Land-/Fahrstraße)'),
  w('st006', 'most', 'Brücke'),
  w('st007', 'rijeka', 'Fluss'),
  w('st008', 'jezero', 'See'),
  w('st009', 'trg / mjesto', 'Platz'),
  w('st010', 'ulaz', 'Eingang'),
  w('st011', 'izlaz', 'Ausgang'),
  w('st012', 'dizalo', 'Aufzug'),
  w('st013', 'javni', 'öffentlich', 'Adjektiv'),
  w('st014', 'računalo', 'Computer'),
  w('st015', 'poštanski ured', 'Postamt'),
  w('st016', 'banka', 'Bank'),
  w('st017', 'trgovina', 'Geschäft'),
  w('st018', 'tržnica', 'Markt'),
  w('st019', 'restoran', 'Restaurant'),
  w('st020', 'pekarnica', 'Bäckerei'),
  w('st021', 'knjižara', 'Buchhandlung'),
  w('st022', 'knjižnica', 'Bibliothek'),
  w('st023', 'farmacija / ljekarna', 'Apotheke'),
  w('st024', 'kafeterija', 'Cafeteria'),
  w('st025', 'kafić', 'Café'),
  w('st026', 'kazalište', 'Theater'),
  w('st027', 'zoološki vrt', 'Zoo'),
  w('st028', 'zabavni park', 'Freizeitpark'),
  w('st029', 'bolnica', 'Krankenhaus'),
  w('st030', 'crkva', 'Kirche'),
  w('st031', 'policija', 'Polizei'),
];
