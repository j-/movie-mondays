import styles from './Rating.module.css';

export interface Props {
  rating: string;
}

const getRatingTitle = (rating: string) => {
  switch (rating) {
    case 'G': return 'General';
    case 'PG': return 'Parental Guidance';
    case 'M': case 'M15': case '15': return 'Mature';
    case 'MA15+': case '15+': return 'Mature Accompanied';
    case 'R18+': case '18+': return 'Restricted';
    case 'CTC': return 'Check the Classification';
    default: return undefined;
  }
};

const getRatingClassName = (rating: string) => {
  switch (rating) {
    case 'G': return styles.rating_g;
    case 'PG': return styles.rating_pg;
    case 'M': case 'M15': case '15': return styles.rating_m;
    case 'MA15+': case '15+': return styles.rating_ma;
    case 'R18+': case '18+': return styles.rating_r;
    case 'CTC': return styles.rating_ctc;
    default: return '';
  }
};

const Rating: React.FC<Props> = ({ rating }) => {
  const className = styles.rating + ' ' + getRatingClassName(rating);
  const title = getRatingTitle(rating);
  return <span className={className} title={title}>{rating}</span>;
};

export default Rating;
