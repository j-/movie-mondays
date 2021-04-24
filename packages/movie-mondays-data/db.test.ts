import Database from 'better-sqlite3';
import { CREATE_TABLE_FILM, CREATE_TABLE_SESSION } from 'movie-mondays-db-queries';
import { Film, Session } from 'movie-mondays-types';
import {
  getAllEntities,
  getAllFilms,
  getAllSessions,
  getFilm,
  getFilmsAfterDate,
  getSessionsForFilm,
  insertAllEntities,
  insertFilms,
  insertSessions,
} from './db';

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
  date: '2021-04-24',
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
  date: '2021-04-24',
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
  date: '2021-04-25',
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
  test('insert and query all films', async () => {
    insertFilms(db, [minari, supernova]);
    expect(await getAllFilms(db)).toEqual(
      expect.arrayContaining([minari, supernova])
    );
  });

  test('insert and query individual films', async () => {
    insertFilms(db, [minari, supernova]);
    expect(await getFilm(db, 'minari')).toEqual(minari);
    expect(await getFilm(db, 'supernova')).toEqual(supernova);
  });

  test('query film with invalid ID', async () => {
    expect(await getFilm(db, 'foobar')).toBeUndefined();
  });

  test('get films with sessions after a certain date', async () => {
    insertFilms(db, [minari, supernova]);
    insertSessions(db, [minariSession1, minariSession2, supernovaSession1]);
    expect(await getFilmsAfterDate(db, '2021-04-25')).toEqual([supernova]);
  });
});

describe('sessions', () => {
  test('insert and query all sessions', async () => {
    insertSessions(db, [minariSession1, minariSession2, supernovaSession1]);
    expect(await getAllSessions(db)).toEqual(
      expect.arrayContaining([minariSession1, minariSession2, supernovaSession1])
    );
  });

  test('insert and query film sessions', async () => {
    insertFilms(db, [minari, supernova]);
    insertSessions(db, [minariSession1, minariSession2, supernovaSession1]);
    expect(await getSessionsForFilm(db, 'minari')).toEqual(
      expect.arrayContaining([minariSession1, minariSession2])
    );
    expect(await getSessionsForFilm(db, 'supernova')).toEqual(
      expect.arrayContaining([supernovaSession1])
    );
  });
});

describe('entities', () => {
  test('insert and query entity data', async () => {
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
    const result = await getAllEntities(db);
    expect(result).toEqual({
      films: {
        minari,
        supernova,
      },
      sessions: {
        1: minariSession1,
        2: minariSession2,
        3: supernovaSession1,
      },
    });
  });
});
