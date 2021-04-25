import Link from 'next/link';
import styles from './Nav.module.css';

const Nav: React.FC = () => (
  <nav className={styles.nav}>
    <Link href="/">
      <a className={styles.navItem}>Home</a>
    </Link>
    <Link href="/about">
      <a className={styles.navItem}>About</a>
    </Link>
    <Link href="/films">
      <a className={styles.navItem}>Films List</a>
    </Link>
  </nav>
);

export default Nav;
