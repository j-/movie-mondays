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
