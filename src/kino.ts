import fetch from 'node-fetch';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { scrapeSessionData } from './scrape';
import { parseSessionData } from './parse';

const IS_DEBUG = process.env.NODE_ENV !== 'production';

export const URL = 'https://www.palacecinemas.com.au/cinemas/the-kino/';

export const getData = async () => {
  let text: string;

  if (IS_DEBUG) {
    text = await fs.promises.readFile(__dirname + '/../test/res/2019-09-16.html', 'utf-8');
  } else {
    const res = await fetch(URL);
    text = await res.text();
  }

  const dom = new JSDOM(text, {
    url: URL,
  });

  return parseSessionData(scrapeSessionData(dom.window));
};
