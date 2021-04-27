import { Film, Session } from 'movie-mondays-types';
import { getSessionsForFilm } from '../utils';
import Rating from './Rating';
import SessionList from './SessionList';
import styles from './DaySessions.module.css';

type Props = {
  day: string;
  sessions: Session[];
  films: Film[];
}

const DaySessions: React.FC<Props> = ({ day, films, sessions }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sessions for {day}</h2>
      {films.map((film) => (
        <div key={film.id}>
          <h3 className={styles.filmTitle}>{film.title} <Rating rating={film.rating} /></h3>
          <SessionList sessions={getSessionsForFilm(sessions, film.id)} />
        </div>
      ))}
    </div>
  );
};

export default DaySessions;
