import { JSDOM } from 'jsdom';
import { scrapeAndParse } from 'movie-mondays-data';

let text = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  text += chunk;
});

process.stdin.on('end', () => {
  try {
    const dom = new JSDOM(text, {
      url: 'https://www.palacecinemas.com.au/cinemas/the-kino/',
    });
    const result = scrapeAndParse(dom.window);
    const string = JSON.stringify(result, null, 2);
    process.stdout.write(string);
  } catch (err) {
    console.error(`Error parsing file: "${err.message}"`);
    process.exit(1);
  }
});
