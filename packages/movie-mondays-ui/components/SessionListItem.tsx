import { Session } from 'movie-mondays-types';
import { useNow } from '../use-now';
import { useToday } from '../use-today';
import { formatStringAsTime } from '../utils';
import styles from './SessionListItem.module.css';

type Props = {
  session: Session;
}

const SessionListItem: React.FC<Props> = ({ session }) => {
  const now = useNow();
  const today = useToday();
  const { date, time, isSellingFast, isSoldOut } = session;
  const classNames = [styles.session, 'tabular-nums'];
  if (today >= date && now > time) classNames.push(styles.session_past);
  if (isSellingFast) classNames.push(styles.session_isSellingFast);
  if (isSoldOut) classNames.push(styles.session_isSoldOut);
  return <div className={classNames.join(' ')}>{formatStringAsTime(session.time)}</div>;
};

export default SessionListItem;
