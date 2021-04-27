import Database from 'better-sqlite3';
import { createTables } from 'movie-mondays-db';

let db: Database.Database;

const getDatabase = async () => {
  if (!db) {
    if (!process.env.DB_FILE) {
      throw new Error('DB_FILE env var not set');
    }
    db = new Database(process.env.DB_FILE);
    await createTables(db);
  }
  return db;
};

export default getDatabase;
