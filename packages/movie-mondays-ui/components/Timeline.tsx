import classNames from 'classnames';
import { addTime, subtractTime, formatStringAsTime } from '../utils';

type Props = {
  now?: number;
  doorsMinutes?: number;
  trailersMinutes?: number;
  runtimeMinutes: number;
  timeTrailers: number;
};

export const DOORS_MINUTES = 10;
export const TRAILERS_MINUTES = 15;

const Timeline: React.FC<Props> = ({
  now = -Infinity,
  doorsMinutes = DOORS_MINUTES,
  trailersMinutes = TRAILERS_MINUTES,
  runtimeMinutes,
  timeTrailers,
}) => {
  const timeDoors = subtractTime(timeTrailers, doorsMinutes);
  const timeStart = addTime(timeTrailers, trailersMinutes);
  const timeFinish = addTime(timeStart, runtimeMinutes);

  return (
    <ul className="w-full grid grid-cols-4">
      <li className={classNames(now > timeDoors && 'opacity-50', 'text-center')}>
        <span className="text-lg">
          {formatStringAsTime(timeDoors)}
        </span><br />
        <span className="text-sm">Doors open<br />(Grab snacks)</span>
      </li>
      <li className={classNames(now > timeTrailers && 'opacity-50', 'text-center')}>
        <span className="text-lg">
          {formatStringAsTime(timeTrailers)}
        </span><br />
        <span className="text-sm">Trailers start<br />({doorsMinutes} min. later)</span>
      </li>
      <li className={classNames(now > timeStart && 'opacity-50', 'text-center')}>
        <span className="text-lg">
          {formatStringAsTime(timeStart)}
        </span><br />
        <span className="text-sm">Movie starts<br />({trailersMinutes} min. later)</span>
      </li>
      <li className={classNames(now > timeFinish && 'opacity-50', 'text-center')}>
        <span className="text-lg">
          {formatStringAsTime(timeFinish)}
        </span><br />
        <span className="text-sm">Movie ends<br />({runtimeMinutes} min. later)</span>
      </li>
    </ul>
  );
};

export default Timeline;
