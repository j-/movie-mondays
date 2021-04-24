import Database from 'better-sqlite3';

let db: Database.Database;

const getDatabase = () => {
  if (!db) {
    db = new Database('../../database.sqlite');
  }
  return db;
};

export default getDatabase;
