import { GetStaticProps } from 'next';
import Link from 'next/link';
import Database from 'better-sqlite3';
import { Film, getAllFilms} from 'movie-mondays-data';
import Layout from '../../components/Layout';

type Props = {
  items: Film[]
}

const WithStaticProps: React.FC<Props> = ({ items }) => (
  <Layout title="Films List | Next.js + TypeScript Example">
    <h1>Films List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /films</p>
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const db = new Database('../../database.sqlite');
  const items: Film[] = await getAllFilms(db);
  return { props: { items } };
};

export default WithStaticProps;
