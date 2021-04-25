import Link from 'next/link';
import { Film } from 'movie-mondays-types';
import Rating from './Rating';
import styles from './FilmListItem.module.css';

type Props = {
  data: Film;
}

const FilmListItem: React.FC<Props> = ({ data }) => (
  <Link href="/films/[id]" as={`/films/${data.id}`}>
    <a className={styles.filmListItem}>
      {data.title} <Rating rating={data.rating} />
    </a>
  </Link>
);

export default FilmListItem;
