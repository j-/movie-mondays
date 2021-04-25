import { Database } from 'better-sqlite3';
import {
  CREATE_TABLE_FILM,
  CREATE_TABLE_SESSION,
  INSERT_FILM,
  INSERT_SESSION,
  QUERY_FILM_SESSIONS,
  QUERY_FILM,
  QUERY_FILMS_AFTER_DATE,
  QUERY_FILMS,
  QUERY_SESSIONS,
} from 'movie-mondays-db-queries';
import {
  EntityMap,
  Film,
  HasID,
  NormalizedSessionData,
  Session,
} from 'movie-mondays-types';

export const createTables = async (db: Database): Promise<void> => {
  db.exec(CREATE_TABLE_FILM);
  db.exec(CREATE_TABLE_SESSION);
};

export const insertFilms = async (db: Database, films: Film[]): Promise<void> => {
  const insert = db.prepare(INSERT_FILM);
  const insertMany = db.transaction((films: Film[]) => {
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

export const getAllFilms = async (db: Database): Promise<Film[]> => {
  const stmt = db.prepare(QUERY_FILMS);
  const data = stmt.all().map<Film>((row) => ({
    id: String(row.id),
    title: String(row.title),
    rating: String(row.rating),
    runtimeMinutes: Number(row.runtimeMinutes),
  }));
  return data;
};

export const getFilm = async (db: Database, filmId: string): Promise<Film | undefined> => {
  const stmt = db.prepare(QUERY_FILM);
  const row = stmt.get({ filmId });
  if (!row) return undefined;
  const film: Film = {
    id: String(row.id),
    title: String(row.title),
    rating: String(row.rating),
    runtimeMinutes: Number(row.runtimeMinutes),
  };
  return film;
};

export const getFilmsAfterDate = async (db: Database, sessionDate: string): Promise<Film[]> => {
  const stmt = db.prepare(QUERY_FILMS_AFTER_DATE);
  const data = stmt.all({ sessionDate }).map<Film>((row) => ({
    id: String(row.id),
    title: String(row.title),
    rating: String(row.rating),
    runtimeMinutes: Number(row.runtimeMinutes),
  }));
  return data;
};

export const insertSessions = async (db: Database, sessions: Session[]): Promise<void> => {
  const insert = db.prepare(INSERT_SESSION);
  const insertMany = db.transaction((sessions: Session[]) => {
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

export const getAllSessions = async (db: Database): Promise<Session[]> => {
  const stmt = db.prepare(QUERY_SESSIONS);
  const data = stmt.all().map<Session>((row) => ({
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
  return data;
};

export const getSessionsForFilm = async (db: Database, filmId: string): Promise<Session[]> => {
  const stmt = db.prepare(QUERY_FILM_SESSIONS);
  const data = stmt.all({ filmId }).map<Session>((row) => ({
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
  return data;
};

const entityReducer = <T extends HasID>(result: EntityMap<T>, entity: T) => {
  result[entity.id] = entity;
  return result;
};

export const getAllEntities = async (db: Database) => {
  const [films, sessions] = await Promise.all([getAllFilms(db), getAllSessions(db)]);
  return {
    films: films.reduce(entityReducer, {}),
    sessions: sessions.reduce(entityReducer, {}),
  };
};

export const insertAllEntities = async (db: Database, data: NormalizedSessionData): Promise<void> => {
  const { films, sessions } = data.entities;
  await Promise.all([
    insertFilms(db, Object.values(films)),
    insertSessions(db, Object.values(sessions)),
  ]);
};
