import { resolve } from 'path';
import { promises } from 'fs';
import Database from 'better-sqlite3';
import { createTables } from 'movie-mondays-db';

if (process.argv.length < 3) {
  console.error('Usage: npm run db-create -- <filename>');
  process.exit(1);
}

const filename = process.argv[2];
const path = resolve(process.cwd(), filename);

(async () => {
  let shouldUnlink = true;

  try {
    await promises.access(path);
  } catch (err) {
    shouldUnlink = false;
  } finally {
    if (shouldUnlink) {
      await promises.unlink(path);
    }
  }

  const db = new Database(path);
  await createTables(db);
  db.close();
})();
