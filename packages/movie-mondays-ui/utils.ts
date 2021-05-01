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

export const formatDateAsTime = (date: Date) => {
  return date.getHours() * 100 + date.getMinutes();
};

export const formatNow = () => formatDateAsTime(new Date());

export const formatStringAsTime = (time: number) => {
  const hh = Math.floor(time / 100) % 12 || 12;
  const mm = String(time % 100).padStart(2, '0');
  const ampm = time < 1200 ? 'am' : 'pm';
  return `${hh}:${mm}${ampm}`;
};

export const addTime = (time: number, byMinutes: number) => {
  const beforeHH = Math.floor(time / 100);
  const beforeMM = time % 100;
  let afterMM = beforeMM + byMinutes;
  let afterHH = beforeHH + Math.floor(afterMM / 60);
  afterMM %= 60;
  afterHH %= 24;
  return afterHH * 100 + afterMM;
};

export const subtractTime = (time: number, byMinutes: number) => {
  const beforeHH = Math.floor(time / 100);
  const beforeMM = time % 100;
  let afterMM = (((beforeMM - byMinutes) % 60) + 60) % 60;
  const afterHH = (beforeHH - Math.abs(Math.floor((beforeMM - byMinutes) / 60)) + 24) % 24;
  afterMM %= 60;
  return afterHH * 100 + afterMM;
};
