import { DOMWindow as Window } from 'jsdom';

const getTextContent = <T extends Element>(el: T) => el.textContent?.trim() || '';

export interface PayloadSession {
  url: string;
  time: string;
  conditions: string[];
  capacity: string;
}

export interface PayloadFilm {
  title: string;
  url: string;
  sessions: PayloadSession[];
}

export interface PayloadDay {
  day: string;
  films: PayloadFilm[];
}

export type Payload = Array<PayloadDay>;

const getSessionFromElement = (sessionElement: HTMLAnchorElement): PayloadSession => {
  const url = sessionElement.href;
  const time = getTextContent(sessionElement.querySelector('.session-time-card-time') as HTMLElement);
  const conditions = Array.from(sessionElement.querySelectorAll('.tooltip div'), getTextContent);
  const capacity = getTextContent(sessionElement.querySelector('.session-time-card-capacity') as HTMLElement);
  return { url, time, conditions, capacity };
};

const getFilmFromElement = (filmElement: Element): PayloadFilm => {
  const anchor = filmElement.querySelector<HTMLAnchorElement>('b a') as HTMLAnchorElement;
  const title = getTextContent(anchor);
  const url = anchor.href;
  const sessions = Array.from(filmElement.querySelectorAll<HTMLAnchorElement>('.session-time-card'), getSessionFromElement);
  return { title, url, sessions };
};

const getDayFromElement = (dayElement: HTMLElement): PayloadDay => {
  const { day } = dayElement.dataset as { day: string };
  const films = Array.from(dayElement.querySelectorAll('.quick-sessions-film'), getFilmFromElement);
  return { day, films };
};

export const scrapeSessionData = ({ document }: Pick<Window, 'document'>): Payload => (
  Array.from(document.querySelectorAll<HTMLElement>('.quick-sessions-day'), getDayFromElement)
);
