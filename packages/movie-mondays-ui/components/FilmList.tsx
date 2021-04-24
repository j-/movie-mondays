import * as React from 'react';
import { useRouter } from 'next/router';
import { Film } from 'movie-mondays-data';
import FuzzySearch from 'fuzzy-search';
import { sortFilm } from '../sort';
import FilmListItem from './FilmListItem';

type Props = {
  films: Film[];
}

export const QUERY_FIELD = 'q';

const FilmList: React.FC<Props> = ({ films }) => {
  const router = useRouter();
  const params = new URLSearchParams(router.asPath.replace(/^.*?(\?|$)/, ''));
  const searchParam = params.get(QUERY_FIELD);
  const [search, setSearch] = React.useState(searchParam ?? '');
  const handleChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.currentTarget.value;
    setSearch(search);
    const url = router.pathname;
    const options = {
      query: {
        [QUERY_FIELD]: search,
      },
    };
    if (searchParam) {
      router.replace(url, options);
    } else {
      router.push(url, options);
    }
  };
  const searcher = React.useMemo(() => new FuzzySearch(films, ['title']), [films]);
  const result = React.useMemo(() => searcher.search(search), [searcher, search]);
  React.useEffect(() => {
    if (searchParam !== search) {
      setSearch(searchParam ?? '');
    }
  }, [searchParam]);
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
