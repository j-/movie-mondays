import * as React from 'react';
import { Film } from 'movie-mondays-data';

type Props = {
  item: Film;
}

const ListDetail: React.FC<Props> = ({ item: film }) => (
  <div>
    <h1>Detail for {film.title}</h1>
    <p>ID: {film.id}</p>
  </div>
);

export default ListDetail;
