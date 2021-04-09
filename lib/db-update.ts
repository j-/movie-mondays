import { resolve } from 'path';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import * as Database from 'better-sqlite3';
import { scrapeSessionData } from '../src/scrape';
import { parseSessionData } from '../src/parse';
import { insertAllEntities } from '../src/db';

if (process.argv.length < 3) {
  console.error('Usage: npm run db-update -- database.sqlite');
  process.exit(1);
}

const filename = process.argv[2];
const path = resolve(process.cwd(), filename);

const URL = 'https://www.palacecinemas.com.au/cinemas/the-kino/';

(async () => {
  const res = await fetch(URL);
  const text = await res.text();
  const dom = new JSDOM(text, {
    url: URL,
  });
  const data = parseSessionData(scrapeSessionData(dom.window));
  const db = new Database(path);
  await insertAllEntities(db, data);
})();
