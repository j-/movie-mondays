import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title = 'Movie Mondays' }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={styles.layout}>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/films">
            <a>Films List</a>
          </Link>{' '}
          | <a href="/api/films">Films API</a>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  </>
);

export default Layout;
