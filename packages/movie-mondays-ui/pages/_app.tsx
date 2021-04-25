import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

type Props = AppProps;

const MyApp: React.FC<Props> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
