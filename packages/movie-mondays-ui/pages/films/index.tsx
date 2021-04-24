import { GetStaticProps } from 'next';
import Link from 'next/link';
import Database from 'better-sqlite3';
import { Film, getAllFilms} from 'movie-mondays-data';
import Layout from '../../components/Layout';

type Props = {
  items: Film[]
}

const titleSort = ({ title: titleA }: Film, { title: titleB }: Film) => {
  if (titleA > titleB) {
    return 1;
  } else if (titleA < titleB) {
    return -1;
  } else {
    return 0;
  }
};

const WithStaticProps: React.FC<Props> = ({ items }) => (
  <Layout title="Films List | Next.js + TypeScript Example">
    <h1>Films List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /films</p>
    <ul>
      {items.sort(titleSort).map((item) => (
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
