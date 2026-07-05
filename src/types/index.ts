export type VocabType = 'Verb' | 'Nomen' | 'Adjektiv' | 'Phrase' | 'Sonstiges';
export type VocabStatus = 'new' | 'learning' | 'known' | 'mastered';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface VerbForms {
  ja: string;
  ti: string;
  onOna: string;
  mi: string;
  vi: string;
  oni: string;
}

export interface Vocabulary {
  id: string;
  croatian: string;
  german: string;
  category: string;
  type: VocabType;
  status: VocabStatus;
  favorite: boolean;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
  forms?: VerbForms;
}

export interface VocabOverride {
  status: VocabStatus;
  favorite: boolean;
  difficulty: Difficulty;
}

export interface VocabState {
  overrides: Record<string, VocabOverride>;
  custom: Vocabulary[];
}
