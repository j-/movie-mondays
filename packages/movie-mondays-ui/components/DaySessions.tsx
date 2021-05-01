import { Film, Session } from 'movie-mondays-types';
import { getSessionsForFilm } from '../utils';
import FilmTitle from './FilmTitle';
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
          <FilmTitle film={film} />
          <SessionList sessions={getSessionsForFilm(sessions, film.id)} />
        </div>
      ))}
    </div>
  );
};

export default DaySessions;
