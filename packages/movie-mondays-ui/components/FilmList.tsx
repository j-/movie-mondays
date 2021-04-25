import React from 'react';
import { useRouter } from 'next/router';
import { Film } from 'movie-mondays-types';
import FuzzySearch from 'fuzzy-search';
import { sortFilm } from '../sort';
import FilmListItem from './FilmListItem';
import { IconSearch } from './Icon';
import styles from './FilmList.module.css';

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
  const hasFilms = films.length > 0;
  const hasFilteredItems = result.length > 0;
  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <input className={styles.filterInput} type="text" value={search} onChange={handleChangeSearch} placeholder="Filter titles" />
        <div className={styles.searchIcon}>
          <IconSearch />
        </div>
      </div>
      <ul className={styles.filmList}>
        {hasFilms ? (
          hasFilteredItems ?
            result.sort(sortFilm).map((film) => (
              <li key={film.id} className={styles.filmListItem}>
                <FilmListItem data={film} />
              </li>
            )) : <em>There are no films that match</em>
        ) : <em>There are no films to show</em>}
      </ul>
    </div>
  );
};

export default FilmList;
