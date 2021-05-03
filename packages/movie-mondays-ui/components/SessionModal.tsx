import Link from 'next/link';
import { Film, Session } from 'movie-mondays-types';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { formatStringAsTime } from '../utils';
import FilmTitle from './FilmTitle';
import { IconClose } from './Icon';
import Timeline from './Timeline';
import styles from './SessionModal.module.css';

type Props = {
  isOpen: boolean;
  film: Film;
  session: Session;
  onClose: ReactModalProps['onRequestClose'];
};

// https://tailwindcomponents.com/component/a-minimal-simple-modal-that-still-looks-good
const SessionModal: React.FC<Props> = ({ isOpen, film, session, onClose }) => (
  <ReactModal
    isOpen={isOpen}
    className={styles.modal}
    overlayClassName={styles.overlay}
    onRequestClose={onClose}
  >
    <div className={styles.header}>
      <FilmTitle film={film} />
      <span className="ml-2 text-sm text-gray-700">
        {formatStringAsTime(session.time)}
      </span>
      <button className={styles.close} type="button" onClick={onClose}>
        <IconClose className={styles.closeIcon} />
      </button>
    </div>
    <div className={styles.body}>
      {film.runtimeMinutes && <Timeline runtimeMinutes={film.runtimeMinutes} timeTrailers={session.time} />}
    </div>
    <div className={styles.footer}>
      <Link href={`https://ticketing.palacecinemas.com.au/Ticketing/visSelectTickets.aspx?cinemacode=300&txtSessionId=${session.id}`}>
        <a className={styles.buy}>
          Buy tickets
        </a>
      </Link>
    </div>
  </ReactModal>
);

export default SessionModal;
