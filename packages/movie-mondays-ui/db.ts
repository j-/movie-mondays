import Database from 'better-sqlite3';

let db: Database.Database;

const getDatabase = () => {
  if (!db) {
    if (!process.env.DB_FILE) {
      throw new Error('DB_FILE env var not set');
    }
    db = new Database(process.env.DB_FILE);
  }
  return db;
};

export default getDatabase;
