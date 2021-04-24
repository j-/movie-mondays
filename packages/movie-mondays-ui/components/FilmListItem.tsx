import React from 'react';
import Link from 'next/link';
import { Film } from 'movie-mondays-types';

type Props = {
  data: Film;
}

const FilmListItem: React.FC<Props> = ({ data }) => (
  <Link href="/films/[id]" as={`/films/${data.id}`}>
    <a>
      {data.title}
    </a>
  </Link>
);

export default FilmListItem;
