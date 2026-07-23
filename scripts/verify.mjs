import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import vm from 'node:vm';

const required = [
  'index.html', 'CAIO_Flight_Deck_3_0.html', 'vercel.json', 'package.json',
  'api/narrate.js', 'api/chief-of-staff.js', 'api/strategic-council.js', 'api/status.js', '.env.example'
];
for (const file of required) await access(new URL(`../${file}`, import.meta.url), constants.R_OK);
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
for (const marker of ['CAIO Flight Deck 3.0','Agent Civilization','Machine constitutional court','AI Chief of Staff','Signal observatory','Shadow board']) {
  if (!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);
}
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (!scripts.length) throw new Error('No inline application script found');
for (const script of scripts) new vm.Script(script);
console.log('CAIO Flight Deck 3.0 verification passed.');
