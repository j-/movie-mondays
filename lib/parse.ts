import { JSDOM } from 'jsdom';
import { scrapeSessionData } from '../src/scrape';
import { parseSessionData } from '../src/parse';

let text: string;

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
    const result = parseSessionData(scrapeSessionData(dom.window));
    const string = JSON.stringify(result, null, 2);
    process.stdout.write(string);
  } catch (err) {
    console.error(`Error parsing file: "${err.message}"`);
    process.exit(1);
  }
});
