import fetch from 'node-fetch';

const URL = 'https://www.palacecinemas.com.au/cinemas/the-kino/';

(async () => {
  const res = await fetch(URL);
  res.body.pipe(process.stdout);
})();
