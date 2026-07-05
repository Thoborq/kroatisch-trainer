import type { Vocabulary } from '../types';

const D = '2026-07-05';
const n = (id: string, croatian: string, german: string, difficulty = 2): Vocabulary => ({
  id, croatian, german, category: 'Fitness & Sport', type: 'Nomen',
  status: 'new', favorite: false, difficulty: difficulty as Vocabulary['difficulty'], createdAt: D, updatedAt: D,
});
const a = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Fitness & Sport', type: 'Adjektiv',
  status: 'new', favorite: false, difficulty: 1, createdAt: D, updatedAt: D,
});

export const fitnessVocab: Vocabulary[] = [
  n('fit001', 'teretana', 'Fitnessstudio'),
  n('fit002', 'trening', 'Training', 1),
  n('fit003', 'vježba', 'Übung'),
  n('fit004', 'mišić', 'Muskel', 3),
  n('fit005', 'zagrijavanje', 'Aufwärmen', 3),
  n('fit006', 'rastezanje', 'Dehnen', 3),
  n('fit007', 'sklekovi', 'Liegestütze', 4),
  n('fit008', 'trbušnjaci', 'Sit-ups', 3),
  n('fit009', 'bučica', 'Hantel', 3),
  n('fit010', 'težina', 'Gewicht / Körpergewicht', 2),
  n('fit011', 'odmor', 'Pause / Erholung', 1),
  a('fit012', 'zdrav', 'gesund'),
  a('fit013', 'jak', 'stark'),
  a('fit014', 'umoran', 'müde / erschöpft'),
];
