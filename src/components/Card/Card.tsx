import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  addToWatchList,
} from "../../store/actions/watchListActions";
import { removeFromWatchList } from "../../store/actions/watchListActions";
interface Media {
  media: any;
}

const Card: React.FC<Media> = ({ media }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const watchList = useSelector((state: RootState) => state.watchList.items);
  const isInWatchList = watchList.some((item: any) => item.id === media.id);


  const handleToggleWatchList = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      if (isInWatchList) {
        dispatch(removeFromWatchList(user.uid, media));
      } else {
        dispatch(addToWatchList(user.uid, media));
      }
    }
  };

  const handleMouseEnter = () => setShowDetails(true);
  const handleMouseLeave = () => setShowDetails(false);

  return (
    <div>
      <Link
        to={`/movie/${media.id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`More details about ${media.title || media.name}`}
        className="relative group bg-light-primary dark:bg-dark-primary rounded-md h-max grid grid-rows-[256px_40px] gap-2 transition-transform duration-300 hover:scale-105 pb-2 shadow-md">
        <div className="rounded-md w-full h-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={media.title || media.name}
            className="w-full object-cover rounded-md h-64"
            loading="lazy"
          />
        </div>
        <h3 className="px-2 text-center text-sm font-semibold group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary transition-colors duration-300">
          {media.title || media.name}
        </h3>
        {showDetails && (
          <>
            <div className="absolute top-4 left-4 bg-light-text-secondary p-1 rounded-full opacity-90 text-dark-text-main">
              {media.vote_average.toFixed(2)}/10
            </div>
            <div
              className={`absolute top-5 right-4 text-lg cursor-pointer ${
                isInWatchList
                  ? "text-yellow-500"
                  : "text-slate-500 hover:text-yellow-500"
              }`}
              onClick={handleToggleWatchList}
               aria-label={isInWatchList ? "Remove from watchlist" : "Add to watchlist"}>
              <FaStar />
            </div>
          </>
        )}
      </Link>
    </div>
  );
};

export default Card;
