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
      <li className={now > timeDoors ? 'opacity-50' : ''}>
        <span>
          {formatStringAsTime(timeDoors)}
        </span><br />
        <span>Doors open<br />(Grab snacks)</span>
      </li>
      <li className={now > timeTrailers ? 'opacity-50' : ''}>
        <span>
          {formatStringAsTime(timeTrailers)}
        </span><br />
        <span>Trailers start<br />({doorsMinutes} min. later)</span>
      </li>
      <li className={now > timeStart ? 'opacity-50' : ''}>
        <span>
          {formatStringAsTime(timeStart)}
        </span><br />
        <span>Movie starts<br />({trailersMinutes} min. later)</span>
      </li>
      <li className={now > timeFinish ? 'opacity-50' : ''}>
        <span>
          {formatStringAsTime(timeFinish)}
        </span><br />
        <span>Movie ends<br />({runtimeMinutes} min. later)</span>
      </li>
    </ul>
  );
};

export default Timeline;
