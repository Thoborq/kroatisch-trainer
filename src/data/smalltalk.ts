import type { Vocabulary } from '../types';

const D = '2026-07-05';
const p = (id: string, croatian: string, german: string, difficulty = 2): Vocabulary => ({
  id, croatian, german, category: 'Small Talk', type: 'Phrase',
  status: 'new', favorite: false, difficulty: difficulty as Vocabulary['difficulty'], createdAt: D, updatedAt: D,
});

export const smalltalkVocab: Vocabulary[] = [
  p('sl001', 'Kako ti je prošao vikend?', 'Wie war dein Wochenende?'),
  p('sl002', 'Čime se baviš?', 'Was machst du so? / Was ist dein Beruf?'),
  p('sl003', 'To je super!', 'Das ist super!', 1),
  p('sl004', 'Točno. / Baš tako.', 'Genau. / Stimmt.', 1),
  p('sl005', 'Ne razumijem.', 'Ich verstehe nicht.', 1),
  p('sl006', 'Polako, molim.', 'Langsamer bitte.', 1),
  p('sl007', 'Možeš li to ponoviti?', 'Kannst du das wiederholen?'),
  p('sl008', 'Zabavno je!', 'Es macht Spaß!', 1),
  p('sl009', 'Pojma nemam.', 'Keine Ahnung.', 1),
  p('sl010', 'Stvarno?', 'Wirklich? / Echt?', 1),
  p('sl011', 'I ja tako mislim.', 'Das finde ich auch. / Das denke ich auch.'),
  p('sl012', 'Naravno.', 'Natürlich. / Selbstverständlich.', 1),
  p('sl013', 'Umoran/a sam.', 'Ich bin müde.', 1),
  p('sl014', 'U redu. / Dobro.', 'Alles klar. / In Ordnung.', 1),
  p('sl015', 'Kako ti je obitelj?', 'Wie geht es deiner Familie?'),
  p('sl016', 'Odakle si?', 'Woher kommst du?', 1),
  p('sl017', 'Koliko dugo učiš hrvatski?', 'Wie lange lernst du schon Kroatisch?', 3),
  p('sl018', 'Govorim malo hrvatski.', 'Ich spreche ein bisschen Kroatisch.'),
  p('sl019', 'Možeš li govoriti sporije?', 'Kannst du langsamer sprechen?', 2),
  p('sl020', 'Nisam siguran/sigurna.', 'Ich bin nicht sicher.', 2),
];
