import * as React from 'react';
import { Film } from 'movie-mondays-data';
import ListItem from './ListItem';

type Props = {
  items: Film[];
}

const titleSort = ({ title: titleA }: Film, { title: titleB }: Film) => {
  if (titleA > titleB) {
    return 1;
  } else if (titleA < titleB) {
    return -1;
  } else {
    return 0;
  }
};

const List: React.FC<Props> = ({ items }) => (
  <ul>
    {items.sort(titleSort).map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
