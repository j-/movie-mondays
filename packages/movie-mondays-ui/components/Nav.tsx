import Link from 'next/link';

const Nav: React.FC = () => (
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
);

export default Nav;
