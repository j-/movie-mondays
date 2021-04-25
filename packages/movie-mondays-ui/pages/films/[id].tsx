import { GetStaticProps, GetStaticPaths } from 'next';
import { Film, Session } from 'movie-mondays-types';
import { getAllFilms, getFilm, getSessionsForFilm } from 'movie-mondays-db';

import getDatabase from '../../db';
import Layout from '../../components/Layout';
import FilmDetails from '../../components/FilmDetails';

type Props = {
  film?: Film;
  sessions?: Session[];
  errors?: string;
}

const StaticPropsDetail: React.FC<Props> = ({ film, sessions, errors }) => {
  if (errors || !film || !sessions) {
    return (
      <Layout title="Error | Movie Mondays">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${film.title} | Movie Mondays`}>
      {film && <FilmDetails film={film} sessions={sessions} />}
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
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const db = getDatabase();
    const id = String(params?.id);
    const [film, sessions] = await Promise.all([
      getFilm(db, id),
      getSessionsForFilm(db, id),
    ]);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { film, sessions } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
