import * as Database from 'better-sqlite3';
import { promises } from 'fs';
import { Film, Session, NormalizedSessionData } from './parse';

export const CREATE_TABLE_FILM = `
  CREATE TABLE \`film\` (
    \`id\` TEXT NOT NULL,
    \`title\` INTEGER NOT NULL,
    \`rating\` INTEGER NOT NULL,
    \`runtimeMinutes\` INTEGER,
    PRIMARY KEY(\`id\`)
  )
`;

export const INSERT_FILM = `
  INSERT OR REPLACE INTO film (
    id,
    title,
    rating,
    runtimeMinutes
  ) VALUES (
    $id,
    $title,
    $rating,
    $runtimeMinutes
  )
`;

export const QUERY_FILMS = `
  SELECT
    id,
    title,
    rating,
    runtimeMinutes
  FROM film
`;

export const CREATE_TABLE_SESSION = `
  CREATE TABLE \`session\` (
    \`id\` INTEGER NOT NULL UNIQUE,
    \`filmId\` TEXT NOT NULL,
    \`date\` TEXT NOT NULL,
    \`time\` INTEGER NOT NULL,
    \`isAllocatedSeating\` INTEGER NOT NULL,
    \`isNoFreeTickets\` INTEGER NOT NULL,
    \`isPreviewScreening\` INTEGER NOT NULL,
    \`isSpecialEvent\` INTEGER NOT NULL,
    \`isBabyFriendly\` INTEGER NOT NULL,
    \`isSellingFast\` INTEGER NOT NULL,
    \`isSoldOut\` INTEGER NOT NULL,
    PRIMARY KEY(\`id\`)
  )
`;

export const INSERT_SESSION = `
  INSERT OR REPLACE INTO session (
    id,
    filmId,
    date,
    time,
    isAllocatedSeating,
    isNoFreeTickets,
    isPreviewScreening,
    isSpecialEvent,
    isBabyFriendly,
    isSellingFast,
    isSoldOut
  ) VALUES (
    $id,
    $filmId,
    $date,
    $time,
    $isAllocatedSeating,
    $isNoFreeTickets,
    $isPreviewScreening,
    $isSpecialEvent,
    $isBabyFriendly,
    $isSellingFast,
    $isSoldOut
  )
`;

export const QUERY_SESSIONS = `
  SELECT
    id,
    filmId,
    date,
    time,
    isAllocatedSeating,
    isNoFreeTickets,
    isPreviewScreening,
    isSpecialEvent,
    isBabyFriendly,
    isSellingFast,
    isSoldOut
  FROM session
`;

export const createDatabase = async (path: string) => {
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

  db.exec(CREATE_TABLE_FILM);
  db.exec(CREATE_TABLE_SESSION);

  db.close();
};

export const insertFilms = (db: Database.Database, films: Film[]): void => {
  const insert = db.prepare(INSERT_FILM);
  const insertMany = db.transaction((films) => {
    for (const film of films) {
      insert.run({
        id: film.id,
        title: film.title,
        rating: film.rating,
        runtimeMinutes: film.runtimeMinutes,
      });
    }
  });
  insertMany(films);
};

export const getAllFilms = (db: Database.Database): Promise<Film[]> => {
  return new Promise<Film[]>((resolve) => {
    const stmt = db.prepare(QUERY_FILMS);
    const data = stmt.all(QUERY_FILMS).map<Film>((row) => ({
      id: String(row.id),
      title: String(row.title),
      rating: String(row.rating),
      runtimeMinutes: Number(row.runtimeMinutes),
    }));
    resolve(data);
  });
};

export const insertSessions = (db: Database.Database, sessions: Session[]): void => {
  const insert = db.prepare(INSERT_SESSION);
  const insertMany = db.transaction((sessions) => {
    for (const session of sessions) {
      insert.run({
        id: session.id,
        filmId: session.filmId,
        date: session.date,
        time: session.time,
        isAllocatedSeating: session.isAllocatedSeating ? 1 : 0,
        isNoFreeTickets: session.isNoFreeTickets ? 1 : 0,
        isPreviewScreening: session.isPreviewScreening ? 1 : 0,
        isSpecialEvent: session.isSpecialEvent ? 1 : 0,
        isBabyFriendly: session.isBabyFriendly ? 1 : 0,
        isSellingFast: session.isSellingFast ? 1 : 0,
        isSoldOut: session.isSoldOut ? 1 : 0,
      });
    }
  });
  insertMany(sessions);
};

export const getAllSessions = (db: Database.Database): Promise<Session[]> => {
  return new Promise<Session[]>((resolve) => {
    const stmt = db.prepare(QUERY_SESSIONS);
    const data = stmt.all(QUERY_SESSIONS).map<Session>((row) => ({
      id: String(row.id),
      filmId: String(row.filmId),
      date: String(row.date),
      time: Number(row.time),
      isAllocatedSeating: row.isAllocatedSeating === 1,
      isNoFreeTickets: row.isNoFreeTickets === 1,
      isPreviewScreening: row.isPreviewScreening === 1,
      isSpecialEvent: row.isSpecialEvent === 1,
      isBabyFriendly: row.isBabyFriendly === 1,
      isSellingFast: row.isSellingFast === 1,
      isSoldOut: row.isSoldOut === 1,
    }));
    resolve(data);
  });
};

interface EntityMap<T> {
  [id: string]: T;
}

interface HasID<T = any> {
  id: T;
}

const entityReducer = <T extends HasID>(result: EntityMap<T>, entity: T) => {
  result[entity.id] = entity;
  return result;
};

export const getAllEntities = async (db: Database.Database) => {
  const [films, sessions] = await Promise.all([getAllFilms(db), getAllSessions(db)]);
  return {
    films: films.reduce(entityReducer, {}),
    sessions: sessions.reduce(entityReducer, {}),
  };
};

export const insertAllEntities = async (db: Database.Database, data: NormalizedSessionData) => {
  const { films, sessions } = data.entities;
  await Promise.all([
    insertFilms(db, Object.values(films)),
    insertSessions(db, Object.values(sessions)),
  ]);
};