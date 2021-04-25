import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Film } from 'movie-mondays-types';
import { getFilmsAfterDate } from 'movie-mondays-db';
import getDatabase from '../../db';
import Layout from '../../components/Layout';
import FilmList from '../../components/FilmList';
import typography from '../../components/typography.module.css';

type Props = {
  items: Film[]
}

const FilmPage: React.FC<Props> = ({ items }) => (
  <Layout title="Films | Movie Mondays">
    <h1 className={typography.title}>Films List</h1>
    <FilmList films={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const db = getDatabase();
  const today = new Date().toISOString().substring(0, 10);
  const items: Film[] = await getFilmsAfterDate(db, today);
  return { props: { items } };
};

export default FilmPage;
