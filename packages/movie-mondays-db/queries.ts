export const CREATE_TABLE_FILM = `
  CREATE TABLE IF NOT EXISTS \`film\` (
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

export const QUERY_FILM = `
  ${QUERY_FILMS}
  WHERE id = $filmId
`;

export const QUERY_FILMS_AFTER_DATE = `
  SELECT DISTINCT
    film.id,
    film.title,
    film.rating,
    film.runtimeMinutes
  FROM film
  JOIN session ON film.id = session.filmId
  WHERE session.date >= $sessionDate
`;

export const CREATE_TABLE_SESSION = `
  CREATE TABLE IF NOT EXISTS \`session\` (
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

export const QUERY_FILM_SESSIONS = `
  ${QUERY_SESSIONS}
  WHERE filmId = $filmId
`;
