import { Film, Session } from 'movie-mondays-types';
import { formatStringAsTime } from '../utils';

type Props = {
  film: Film;
  session: Session;
};

// https://tailwindcomponents.com/component/a-minimal-simple-modal-that-still-looks-good
const SessionModal: React.FC<Props> = ({ film, session }) => (
  <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-gray-800">
    <div className="w-1/2 bg-white rounded-lg">
      <div className="flex flex-col items-start p-4">
        <div className="flex items-center w-full">
          <div className="text-lg font-medium">
            <span className="mr-2 text-gray-900">
              {film.title}
            </span>
            <span className="text-gray-700">
              {formatStringAsTime(session.time)}
            </span>
          </div>
          <svg className="w-6 h-6 ml-auto text-gray-700 cursor-pointer fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
        <hr />
        <div className="my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <hr />
        <div className="ml-auto">
          <button className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Agree
          </button>
          <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent">
          Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SessionModal;
