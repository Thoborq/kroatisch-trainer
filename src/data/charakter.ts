import type { Vocabulary } from '../types';

const D = '2026-07-05';
const a = (id: string, croatian: string, german: string): Vocabulary => ({
  id, croatian, german, category: 'Charakter & Eigenschaften', type: 'Adjektiv',
  status: 'new', favorite: false, difficulty: 3, createdAt: D, updatedAt: D,
});

export const charakterVocab: Vocabulary[] = [
  a('ch001', 'zainteresiran', 'interessiert'),
  a('ch002', 'zadovoljan', 'zufrieden'),
  a('ch003', 'nezadovoljan', 'unzufrieden'),
  a('ch004', 'sretan', 'glücklich'),
  a('ch005', 'nesretan', 'unglücklich'),
  a('ch006', 'lijen', 'faul'),
  a('ch007', 'vrijedan / vrijedna', 'fleißig'),
  a('ch008', 'radoznao / radoznala', 'neugierig'),
  a('ch009', 'oprezan / oprezni', 'vorsichtig'),
  a('ch010', 'glup', 'dumm'),
  a('ch011', 'nepošten', 'unehrlich'),
  a('ch012', 'pristojan', 'höflich'),
  a('ch013', 'nepristojan', 'unhöflich'),
  a('ch014', 'nestašan', 'frech'),
  a('ch015', 'fin', 'nett'),
  a('ch016', 'zanimljiv', 'interessant'),
  a('ch017', 'udoban', 'bequem'),
  a('ch018', 'ljubazan', 'freundlich'),
  a('ch019', 'hrabar', 'mutig'),
  a('ch020', 'tvrdoglav', 'stur'),
];
