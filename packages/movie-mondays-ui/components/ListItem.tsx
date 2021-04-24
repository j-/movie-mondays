import React from 'react';
import Link from 'next/link';
import { Film } from 'movie-mondays-data';

type Props = {
  data: Film;
}

const ListItem: React.FC<Props> = ({ data }) => (
  <Link href="/films/[id]" as={`/films/${data.id}`}>
    <a>
      {data.title}
    </a>
  </Link>
);

export default ListItem;
