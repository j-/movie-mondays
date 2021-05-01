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

export type Condition =
  | 'isAllocatedSeating'
  | 'isNoFreeTickets'
  | 'isPreviewScreening'
  | 'isSpecialEvent'
  | 'isBabyFriendly'
  | 'isSellingFast'
  | 'isSoldOut';

export interface Film {
  id: string;
  title: string;
  rating: string;
  runtimeMinutes: number | null;
}

/** @see https://www.classification.gov.au/classification-ratings/what-do-ratings-mean */
export enum Rating {
  G,
  PG,
  M,
  MA15,
  R18,
  X18,
  CTC,
  UNKNOWN
}

export const getRating = (ratingString: string): Rating => {
  switch (ratingString) {
    case 'G':
      return Rating.G;
    case 'PG':
      return Rating.PG;
    case 'M': case 'M15': case '15':
      return Rating.M;
    case 'MA15+': case 'MA15': case 'MA': case '15+':
      return Rating.MA15;
    case 'R18+': case '18+': case '18':
      return Rating.R18;
    case 'CTC':
      return Rating.CTC;
    default:
      return Rating.UNKNOWN;
  }
};

export interface NormalizedSessionData {
  result: string[];
  entities: {
    sessions: {
      [sessionId: string]: Session;
    };
    films: {
      [filmId: string]: Film;
    };
  };
}

export interface EntityMap<T> {
  [id: string]: T;
}

export interface HasID<T = any> {
  id: T;
}
