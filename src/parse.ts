import { Payload, PayloadFilm, PayloadSession } from './scrape';

// Conditions
export const CONDITION_ALLOCATED_SEATING = 'Allocated seating';
export const CONDITION_NO_FREE_TICKETS = 'No free tickets';
export const CONDITION_PREVIEW_SCREENING = 'Preview Screening';
export const CONDITION_SPECIAL_EVENT = 'Special Event';
export const CONDITION_BABY_FRIENDLY = 'Baby-friendly session';

// Capacities
export const CAPACITY_SELLING_FAST = 'SELLING FAST';
export const CAPACITY_SOLD_OUT = 'SOLD OUT';

// Ratings
export const RATING_G = 'G';
export const RATING_PG = 'PG';
export const RATING_M = 'M';
export const RATING_15 = '15+';
export const RATING_MA15 = 'MA15+';
export const RATING_R18 = 'R18+';
export const RATING_ALL = 'ALL';
/** http://www.classification.gov.au/Guidelines/Pages/Check-the-Classification.aspx */
export const RATING_CTC = 'CTC';

export interface Session {
  id: string;
  filmId: string;
  date: string;
  time: number;
  isAllocatedSeating: boolean;
  isNoFreeTickets: boolean;
  isPreviewScreening: boolean;
  isSpecialEvent: boolean;
  isBabyFriendly: boolean;
  isSellingFast: boolean;
  isSoldOut: boolean;
}

export interface Film {
  id: string;
  title: string;
  rating: string;
  runtimeMinutes: number | null;
}

/** https://regex101.com/r/KYKFSg/1 */
const titleExpr = /^(.*?)\s?(?:\(\s?([\w+]*?)\s?\))?\s?(?: - (\d+) MIN)?$/;
const timeExpr = /^(\d+):(\d{2})(am|pm)$/;
const sessionIdExpr = /txtSessionId=(\d+)/;
const filmIdExpr = /\/movies\/(.*)/;

export const parseFilmTitle = (payloadFilm: Pick<PayloadFilm, 'title'>): Pick<Film, 'title' | 'rating' | 'runtimeMinutes'> => {
  const input = payloadFilm.title;
  const match = input.replace(/\n/g, ' ').replace(/\s+/g, ' ').match(titleExpr);
  if (!match) throw new Error(`Could not parse film title from value "${input}"`);
  const [, title, rating, runtimeMinutes] = match;
  return {
    title,
    rating,
    runtimeMinutes: Number(runtimeMinutes) || null,
  };
};

export const parseSessionTime = ({ time: input }: Pick<PayloadSession, 'time'>): Pick<Session, 'time'> => {
  const match = input.match(timeExpr);
  if (!match) throw new Error(`Could not parse session time from value "${input}"`);
  const [, hh, mm, ampm] = match;
  let time: Session['time'];
  if (hh === '12' && ampm === 'am') {
    // 12:xxam === 00xx
    time = Number(mm);
  } else {
    time = (
      // hh00
      Number(hh) * 100 +
      // 1200 for PM
      (ampm === 'pm' ? 1200 : 0) +
      // 00mm
      Number(mm)
    );
  }
  return { time };
};

export const parseFilmUrl = ({ url: input }: Pick<PayloadFilm, 'url'>): Pick<Film, 'id'> => {
  const match = input.match(filmIdExpr);
  if (!match) throw new Error(`Could not parse film ID from value "${input}"`);
  const [, id] = match;
  return { id };
};

export const parseSessionUrl = ({ url: input }: Pick<PayloadSession, 'url'>): Pick<Film, 'id'> => {
  const match = input.match(sessionIdExpr);
  if (!match) throw new Error(`Could not parse session ID from value "${input}"`);
  const [, id] = match;
  return { id };
};

export const parseSessionConditions = ({ conditions: input }: Pick<PayloadSession, 'conditions'>): Pick<Session, 'isAllocatedSeating' | 'isNoFreeTickets' | 'isPreviewScreening' | 'isSpecialEvent' | 'isBabyFriendly'> => ({
  isAllocatedSeating: input.includes(CONDITION_ALLOCATED_SEATING),
  isNoFreeTickets: input.includes(CONDITION_NO_FREE_TICKETS),
  isPreviewScreening: input.includes(CONDITION_PREVIEW_SCREENING),
  isSpecialEvent: input.includes(CONDITION_SPECIAL_EVENT),
  isBabyFriendly: input.includes(CONDITION_BABY_FRIENDLY),
});

export const parseSessionCapacity = ({ capacity: input }: Pick<PayloadSession, 'capacity'>): Pick<Session, 'isSellingFast' | 'isSoldOut'> => ({
  isSellingFast: input.includes(CAPACITY_SELLING_FAST),
  isSoldOut: input.includes(CAPACITY_SOLD_OUT),
});

export const parseFilm = (payloadFilm: PayloadFilm) => ({
  ...parseFilmTitle(payloadFilm),
  ...parseFilmUrl(payloadFilm),
});

export const parseSession = (payloadSession: PayloadSession) => ({
  ...parseSessionUrl(payloadSession),
  ...parseSessionTime(payloadSession),
  ...parseSessionConditions(payloadSession),
  ...parseSessionCapacity(payloadSession),
});

export interface NormalizedSessionData {
  result: string[],
  entities: {
    sessions: {
      [sessionId: string]: Session;
    };
    films: {
      [filmId: string]: Film;
    };
  };
}

export const parseSessionData = (payload: Payload): NormalizedSessionData => {
  const sessions = {};
  const films = {};
  const entities = { sessions, films };
  const result = [];
  for (const payloadDay of payload) {
    for (const payloadFilm of payloadDay.films) {
      const film: Film = parseFilm(payloadFilm);
      for (const payloadSession of payloadFilm.sessions) {
        const session: Session = {
          ...parseSession(payloadSession),
          filmId: film.id,
          date: payloadDay.day,
        };
        result.push(session.id);
        sessions[session.id] = session;
      }
      films[film.id] = film;
    }
  }
  result.sort();
  return { result, entities };
}
