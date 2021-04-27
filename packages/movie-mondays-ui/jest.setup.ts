import { loadEnvConfig } from '@next/env';
import getDatabase from './db';

loadEnvConfig(__dirname, undefined, {
  info: () => undefined,
  error: console.error,
});

getDatabase();
