import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Film, Session } from 'movie-mondays-types';
import { getAllFilms, getAllSessions } from 'movie-mondays-db';
import getDatabase from '../db';
import Layout from '../components/Layout';
import typography from '../components/typography.module.css';

type Props = {
  films: Film[];
  sessions: Session[];
}

const SessionsPage: React.FC<Props> = () => (
  <Layout title="Films | Movie Mondays">
    <h1 className={typography.title}>Sessions</h1>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const db = getDatabase();
  const [films, sessions] = await Promise.all([getAllFilms(db), getAllSessions(db)]);
  return { props: { films, sessions } };
};

export default SessionsPage;
