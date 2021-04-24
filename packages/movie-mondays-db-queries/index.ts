export const CREATE_TABLE_FILM = `
  CREATE TABLE \`film\` (
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

export const CREATE_TABLE_SESSION = `
  CREATE TABLE \`session\` (
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