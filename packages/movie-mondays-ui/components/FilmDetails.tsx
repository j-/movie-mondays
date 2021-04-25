import { Film, Session } from 'movie-mondays-types';

type Props = {
  film: Film;
  sessions: Session[];
}

const FilmDetails: React.FC<Props> = ({ film, sessions }) => (
  <div>
    <h1>Detail for {film.title}</h1>
    <p>ID: {film.id}</p>
    <ol>
      {sessions.map((session) => (
        <li key={session.id}>
          {session.date} {session.time}
        </li>
      ))}
    </ol>
  </div>
);

export default FilmDetails;
