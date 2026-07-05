import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, cat: string): Vocabulary => ({
  id, croatian, german, category: cat, type: 'Nomen',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const schuleVocab: Vocabulary[] = [
  // Personen (Schule)
  n('ps001', 'učiteljica', 'Lehrerin', 'Personen (Schule)'),
  n('ps002', 'profesor', 'Professor', 'Personen (Schule)'),
  n('ps003', 'školski kolega', 'Mitschüler', 'Personen (Schule)'),
  n('ps004', 'knjižničar', 'Bibliothekar', 'Personen (Schule)'),
  n('ps005', 'prevoditelj', 'Übersetzer', 'Personen (Schule)'),
  n('ps006', 'tumač', 'Dolmetscher', 'Personen (Schule)'),
  n('ps007', 'učenik', 'Schüler', 'Personen (Schule)'),
  n('ps008', 'student', 'Student', 'Personen (Schule)'),
  // Schule & Studium
  n('sk001', 'škola', 'Schule', 'Schule & Studium'),
  n('sk002', 'razred', 'Klasse', 'Schule & Studium'),
  n('sk003', 'knjiga', 'Buch', 'Schule & Studium'),
  n('sk004', 'riječ', 'Wort', 'Schule & Studium'),
  n('sk005', 'rečenica', 'Satz', 'Schule & Studium'),
  n('sk006', 'pismo', 'Brief', 'Schule & Studium'),
  n('sk007', 'udžbenik', 'Lehrbuch', 'Schule & Studium'),
  n('sk008', 'lekcija', 'Lektion', 'Schule & Studium'),
  n('sk009', 'domaća zadaća', 'Hausaufgabe', 'Schule & Studium'),
  n('sk010', 'ispit', 'Prüfung', 'Schule & Studium'),
  n('sk011', 'test', 'Test / Klausur', 'Schule & Studium'),
  n('sk012', 'sveučilište', 'Universität', 'Schule & Studium'),
  n('sk013', 'studij', 'Studium', 'Schule & Studium'),
  n('sk014', 'jezik', 'Sprache', 'Schule & Studium'),
  n('sk015', 'olovka', 'Stift / Bleistift', 'Schule & Studium'),
  n('sk016', 'bilježnica', 'Heft', 'Schule & Studium'),
];
