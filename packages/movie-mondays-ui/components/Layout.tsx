import Head from 'next/head';
import Header from './Header';
import styles from './Layout.module.css';

type Props = {
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
      <Header />
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  </>
);

export default Layout;
