import { parseSessionData } from './parse';
import { scrapeSessionData } from './scrape';

export * from './parse';
export * from './scrape';

export const scrapeAndParse = (...args: Parameters<typeof scrapeSessionData>): ReturnType<typeof parseSessionData> => (
  parseSessionData(scrapeSessionData(...args))
);
