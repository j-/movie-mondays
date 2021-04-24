import * as fs from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import { scrapeSessionData } from '../scrape';
import { parseSessionData } from '../parse';

test.each([
  ['2019-09-11_00-00', 48, 343],
  ['2019-09-13_00-00', 49, 281],
  ['2019-09-16_00-00', 48, 174],
  ['2019-09-19_00-00', 49, 332],
  ['2020-11-10_17-18', 34, 263],
  ['2020-11-11_09-01', 34, 263],
  ['2020-11-12_14-33', 36, 252],
  ['2020-11-13_09-14', 35, 234],
  ['2020-11-27_11-33', 58, 235],
  ['2021-04-08_18-59', 45, 291],
])('%p: %p films, %p sessions', async (basename, films, sessions) => {
  const path = resolve(__dirname, './res', basename + '.html');
  const html = await fs.promises.readFile(path, 'utf-8');
  const dom = new JSDOM(html, {
    url: 'https://www.palacecinemas.com.au/cinemas/the-kino/',
  });
  const data = parseSessionData(scrapeSessionData(dom.window));
  expect(Object.keys(data.entities.films).length).toBe(films);
  expect(Object.keys(data.entities.sessions).length).toBe(sessions);
  expect(data.result).toHaveLength(sessions);
});
