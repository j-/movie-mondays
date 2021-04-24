import { resolve } from 'path';
import { createDatabase } from 'movie-mondays-data/db';

if (process.argv.length < 3) {
  console.error('Usage: npm run db-create -- <filename>');
  process.exit(1);
}

const filename = process.argv[2];
const path = resolve(process.cwd(), filename);

(async () => {
  await createDatabase(path);
})();
