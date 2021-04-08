import * as fs from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import { scrapeSessionData } from '../src/scrape';
import { parseSessionData } from '../src/parse';

if (process.argv.length < 3) {
  console.error('Usage: npm run -s parse -- <filename>');
  process.exit(1);
}

const filename = process.argv[2];
const path = resolve(process.cwd(), filename);

if (!fs.existsSync(path)) {
  console.error(`Error: could not find file at path "${path}"`);
  process.exit(1);
}

let text: string;

try {
  text = fs.readFileSync(path, 'utf-8');
} catch (err) {
  console.error(`Error reading file: "${err.message}"`);
  process.exit(1);
}

const dom = new JSDOM(text, {
  url: 'https://www.palacecinemas.com.au/cinemas/the-kino/',
});

const result = parseSessionData(scrapeSessionData(dom.window));
const string = JSON.stringify(result, null, 2);

process.stdout.write(string);
