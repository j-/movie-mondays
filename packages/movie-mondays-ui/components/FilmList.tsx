import * as React from 'react';
import { Film } from 'movie-mondays-data';
import FuzzySearch from 'fuzzy-search';
import { sortFilm } from '../sort';
import FilmListItem from './FilmListItem';

type Props = {
  films: Film[];
}

const FilmList: React.FC<Props> = ({ films }) => {
  const [search, setSearch] = React.useState('');
  const handleChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
  };
  const searcher = React.useMemo(() => new FuzzySearch(films, ['title']), [films]);
  const result = React.useMemo(() => searcher.search(search), [searcher, search]);
  return (
    <div>
      <input type="text" value={search} onChange={handleChangeSearch} />
      <ul>
        {result.sort(sortFilm).map((film) => (
          <li key={film.id}>
            <FilmListItem data={film} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;
