import { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';
import { getAllFilms } from 'movie-mondays-data';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = new Database('../../database.sqlite');
    const films = await getAllFilms(db);

    if (!Array.isArray(films)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
