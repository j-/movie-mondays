import Database from 'better-sqlite3';
import { CREATE_TABLE_FILM, CREATE_TABLE_SESSION } from 'movie-mondays-db-queries';
import {
  getAllFilms,
  getAllSessions,
  getFilm,
  getSessionsForFilm,
  insertAllEntities,
  insertFilms,
  insertSessions,
} from './db';
import { Film, Session } from './parse';

let db: Database.Database;

const minari: Film = {
  id: 'minari',
  title: 'Minari',
  rating: 'PG',
  runtimeMinutes: 115
};

const supernova: Film = {
  id: 'supernova',
  title: 'Supernova',
  rating: 'M',
  runtimeMinutes: 94
};

const minariSession1: Session = {
  id: '1',
  filmId: 'minari',
  date: '2020-04-24',
  time: 1200,
  isAllocatedSeating: false,
  isBabyFriendly: false,
  isNoFreeTickets: false,
  isPreviewScreening: false,
  isSellingFast: false,
  isSoldOut: false,
  isSpecialEvent: false,
};

const minariSession2: Session = {
  id: '2',
  filmId: 'minari',
  date: '2020-04-24',
  time: 1300,
  isAllocatedSeating: false,
  isBabyFriendly: false,
  isNoFreeTickets: false,
  isPreviewScreening: false,
  isSellingFast: false,
  isSoldOut: false,
  isSpecialEvent: false,
};

const supernovaSession1: Session = {
  id: '3',
  filmId: 'supernova',
  date: '2020-04-24',
  time: 1400,
  isAllocatedSeating: false,
  isBabyFriendly: false,
  isNoFreeTickets: false,
  isPreviewScreening: false,
  isSellingFast: false,
  isSoldOut: false,
  isSpecialEvent: false,
};

beforeEach(() => {
  db = new Database(':memory:');
  db.exec(CREATE_TABLE_FILM);
  db.exec(CREATE_TABLE_SESSION);
});

afterEach(() => {
  db.close();
});

describe('films', () => {
  test('insert and query all films', () => {
    insertFilms(db, [minari, supernova]);
    expect(getAllFilms(db)).resolves.toEqual(
      expect.arrayContaining([minari, supernova])
    );
  });

  test('insert and query individual films', () => {
    insertFilms(db, [minari, supernova]);
    expect(getFilm(db, 'minari')).resolves.toEqual([minari]);
    expect(getFilm(db, 'supernova')).resolves.toEqual([supernova]);
  });
});

describe('sessions', () => {
  test('insert and query all sessions', () => {
    insertSessions(db, [minariSession1, minariSession2, supernovaSession1]);
    expect(getAllSessions(db)).resolves.toEqual(
      expect.arrayContaining([minariSession1, minariSession2, supernovaSession1])
    );
  });

  test('insert and query film sessions', () => {
    insertFilms(db, [minari, supernova]);
    insertSessions(db, [minariSession1, minariSession2, supernovaSession1]);
    expect(getSessionsForFilm(db, 'minari')).resolves.toEqual(
      expect.arrayContaining([minariSession1, minariSession2])
    );
    expect(getSessionsForFilm(db, 'supernova')).resolves.toEqual(
      expect.arrayContaining([supernovaSession1])
    );
  });
});

describe('entities', () => {
  test('insert and query entity data', () => {
    insertAllEntities(db, {
      result: [],
      entities: {
        films: {
          minari,
          supernova,
        },
        sessions: {
          1: minariSession1,
          2: minariSession2,
          3: supernovaSession1,
        },
      }
    });
    expect(getAllFilms(db)).resolves.toEqual(
      expect.arrayContaining([minari, supernova])
    );
    expect(getAllSessions(db)).resolves.toEqual(
      expect.arrayContaining([minariSession1, minariSession2, supernovaSession1])
    );
  });
});
