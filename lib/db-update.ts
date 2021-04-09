import { resolve } from 'path';
import fetch, { Response } from 'node-fetch';
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
  let res: Response;

  try {
    res = await fetch(URL);
  } catch (err) {
    console.error(`Error fetching page data: "${err.message}"`);
    process.exit(1);
  }

  let dom: JSDOM;

  try {
    const text = await res.text();
    dom = new JSDOM(text, {
      url: URL,
    });
  } catch (err) {
    console.error(`Error parsing response document: "${err.message}"`);
    process.exit(1);
  }

  let sessionData: ReturnType<typeof scrapeSessionData>;

  try {
    sessionData = scrapeSessionData(dom.window);
  } catch (err) {
    console.error(`Error scraping session data: "${err.message}"`);
    process.exit(1);
  }

  let data: ReturnType<typeof parseSessionData>;

  try {
    data = parseSessionData(sessionData);
  } catch (err) {
    console.error(`Error parsing session data: "${err.message}"`);
    process.exit(1);
  }

  try {
    const db = new Database(path);
    await insertAllEntities(db, data);
  } catch (err) {
    console.error(`Error inserting entity data: "${err.message}"`);
    process.exit(1);
  }
})();
