import Link from 'next/link';
import classNames from 'classnames';
import { Film, getRating, Rating } from 'movie-mondays-types';
import styles from './FilmTitle.module.css';

type Props = {
  film: Film;
};

const getClassName = (film: Film) => {
  const rating = getRating(film.rating);
  return classNames(styles.filmTitle, {
    [styles.rating_G]: rating === Rating.G,
    [styles.rating_PG]: rating === Rating.PG,
    [styles.rating_M]: rating === Rating.M,
    [styles.rating_MA15]: rating === Rating.MA15,
    [styles.rating_R18]: rating === Rating.R18,
    [styles.rating_X18]: rating === Rating.X18,
    [styles.rating_CTC]: rating === Rating.CTC,
  });
};

const getRatingTitle = (film: Film) => {
  const rating = getRating(film.rating);
  switch (rating) {
    case Rating.G: return 'General';
    case Rating.PG: return 'Parental Guidance';
    case Rating.M: return 'Mature';
    case Rating.MA15: return 'Mature Accompanied';
    case Rating.R18: return 'Restricted';
    case Rating.CTC: return 'Check the Classification';
    default: return undefined;
  }
};

const FilmTitle: React.FC<Props> = ({ film }) => (
  <Link href={`/films/${film.id}`}>
    <a className={getClassName(film)}>
      <span className={styles.filmTitleRating} title={getRatingTitle(film)}>
        {film.rating}
      </span>
      <span className={styles.filmTitleText}>
        {film.title}
      </span>
    </a>
  </Link>
);

export default FilmTitle;
