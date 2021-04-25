import { Film, Session } from 'movie-mondays-types';
import { sortSession, sortFilm } from './sort';

export const getSessionsForDate = (sessions: Session[], date: string): Session[] => (
  sessions
    .filter((session) => session.date === date)
    .sort(sortSession)
);

export const getFilmsForSessions = (sessions: Session[], films: Film[]): Film[] => (
  films
    .filter((film) => sessions.find((session) => session.filmId === film.id))
    .sort(sortFilm)
);

export const getSessionsForFilm = (sessions: Session[], filmId: string): Session[] => (
  sessions
    .filter((session) => session.filmId === filmId)
);

export const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const formatToday = () => formatDate(new Date());
