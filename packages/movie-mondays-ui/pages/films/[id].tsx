import { GetStaticProps, GetStaticPaths } from 'next';
import { Film, getAllFilms } from 'movie-mondays-data';

import getDatabase from '../../db';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';

type Props = {
  item?: Film;
  errors?: string;
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.title : 'Film detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const db = getDatabase();
  // Get the paths we want to pre-render based on films
  const paths = (await getAllFilms(db)).map((film) => ({
    params: { id: film.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const db = getDatabase();
    const id = params?.id;
    const item = (await getAllFilms(db)).find((data) => data.id === id);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
