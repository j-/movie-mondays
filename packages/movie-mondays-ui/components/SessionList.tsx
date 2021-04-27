import { Session } from 'movie-mondays-types';
import SessionListItem from './SessionListItem';

type Props = {
  sessions: Session[];
}

const SessionList: React.FC<Props> = ({ sessions }) => {
  return (
    <ol>
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionListItem session={session} />
        </li>
      ))}
    </ol>
  );
};

export default SessionList;
