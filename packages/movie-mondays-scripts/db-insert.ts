import { resolve } from 'path';
import Database from 'better-sqlite3';
import { NormalizedSessionData } from 'movie-mondays-data/parse';
import { insertAllEntities } from 'movie-mondays-data/db';

if (process.argv.length < 3) {
  console.error('Usage: npm run db-insert -- database.sqlite < parsed-data.json');
  process.exit(1);
}

const filename = process.argv[2];
const path = resolve(process.cwd(), filename);

let text = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  text += chunk;
});

process.stdin.on('end', async () => {
  let data: NormalizedSessionData;

  try {
    data = JSON.parse(text) as NormalizedSessionData;
  } catch (err) {
    console.error(`Error reading input JSON: "${err.message}"`);
    process.exit(1);
  }

  try {
    const db = new Database(path);
    await insertAllEntities(db, data);
  } catch (err) {
    console.error(`Error inserting entity data: "${err.message}"`);
    process.exit(1);
  }
});
