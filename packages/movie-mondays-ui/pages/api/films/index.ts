import { NextApiRequest, NextApiResponse } from 'next';
import { getAllFilms } from 'movie-mondays-data';
import getDatabase from '../../../db';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = getDatabase();
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
