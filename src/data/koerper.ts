import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Körperteile', type: 'Nomen',
  status: 'new', favorite: false, difficulty: 2, createdAt: D, updatedAt: D,
});

export const koerperVocab: Vocabulary[] = [
  n('kp001', 'glava', 'Kopf'),
  n('kp002', 'ruka', 'Hand / Arm'),
  n('kp003', 'noga', 'Bein / Fuß'),
  n('kp004', 'oko', 'Auge'),
  n('kp005', 'uho', 'Ohr'),
  n('kp006', 'usta', 'Mund'),
  n('kp007', 'nos', 'Nase'),
  n('kp008', 'srce', 'Herz'),
  n('kp009', 'leđa', 'Rücken'),
  n('kp010', 'trbuh', 'Bauch'),
  n('kp011', 'kosa', 'Haare'),
  n('kp012', 'zub', 'Zahn'),
];
