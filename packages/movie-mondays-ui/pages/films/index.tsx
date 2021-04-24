import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Film } from 'movie-mondays-types';
import { getAllFilms} from 'movie-mondays-data';
import getDatabase from '../../db';
import Layout from '../../components/Layout';
import FilmList from '../../components/FilmList';

type Props = {
  items: Film[]
}

const FilmPage: React.FC<Props> = ({ items }) => (
  <Layout title="Films | Movie Mondays">
    <h1>Films List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /films</p>
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
  const items: Film[] = await getAllFilms(db);
  return { props: { items } };
};

export default FilmPage;
