import { useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchPopularMovies } from "../../store/actions/popularMoviesActions";
import { fetchTopRatedMovies } from "../../store/actions/topRatedMoviesActions";
import { fetchUpcomigMovies } from "../../store/actions/upcomingMoviesActions";
import { fetchPopularTvShow } from "../../store/actions/popularTvShowActions";
import { fetchTopRatedTvShow } from "../../store/actions/topRatedTvShowActions";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { fetchMovies } from "../../store/actions/movieActions";
import { fetchTv } from "../../store/actions/tvActions";
import Pagination from "../Pagination/Pagination";
import { Movie, TVShow } from "../../types/media";

interface MediaState {
  movies: Array<Movie | TVShow>;
  totalPages: number;
}

const MediaList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { page } = useParams<{ page: string }>();

  const popularMovies = useSelector(
    (state: RootState) => state.popularMovies
  ) as MediaState;
  const topRatedMovies = useSelector(
    (state: RootState) => state.topRatedMovies
  ) as MediaState;
  const upcomingMovies = useSelector(
    (state: RootState) => state.upcomingMovies
  ) as MediaState;
  const popularTvShows = useSelector(
    (state: RootState) => state.popularTvShow
  ) as MediaState;
  const topRatedTvShows = useSelector(
    (state: RootState) => state.topRatedTvShow
  ) as MediaState;
  const filteredMovies = useSelector(
    (state: RootState) => state.movie
  ) as MediaState;
  const filteredTv = useSelector((state: RootState) => state.tv) as MediaState;

  useEffect(() => {
    const currentPage = page ? parseInt(page, 10) : 1;
    const sortBy = searchParams.get("sort_by") || undefined;
    const startDate = searchParams.get("start_date") || undefined;
    const endDate = searchParams.get("end_date") || undefined;
    const genreIds = searchParams.get("genre_id")
      ? searchParams
          .get("genre_id")!
          .split(",")
          .map((id) => parseInt(id))
      : [];
    const minUserRating = searchParams.get("min_user_rating")
      ? parseInt(searchParams.get("min_user_rating")!)
      : undefined;
    const minVotes = searchParams.get("min_votes")
      ? parseInt(searchParams.get("min_votes")!)
      : undefined;

    const hasFilters =
      sortBy ||
      startDate ||
      endDate ||
      genreIds.length ||
      minUserRating ||
      minVotes;

    if (hasFilters) {
      switch (true) {
        case location.pathname.includes("/movies/popular"):
        case location.pathname.includes("/movies/top-rated"):
        case location.pathname.includes("/movies/upcoming"):
          dispatch(
            fetchMovies(
              currentPage,
              sortBy,
              startDate,
              endDate,
              genreIds,
              minUserRating,
              minVotes
            )
          );
          break;
        case location.pathname.includes("/tv/popular"):
        case location.pathname.includes("/tv/top-rated"):
          dispatch(
            fetchTv(
              currentPage,
              sortBy,
              startDate,
              endDate,
              genreIds,
              minUserRating,
              minVotes
            )
          );
          break;
      }
    } else {
      switch (true) {
        case location.pathname.includes("/movies/popular"):
          dispatch(fetchPopularMovies(currentPage));
          break;
        case location.pathname.includes("/movies/top-rated"):
          dispatch(fetchTopRatedMovies(currentPage));
          break;
        case location.pathname.includes("/movies/upcoming"):
          dispatch(fetchUpcomigMovies(currentPage));
          break;
        case location.pathname.includes("/tv/popular"):
          dispatch(fetchPopularTvShow(currentPage));
          break;
        case location.pathname.includes("/tv/top-rated"):
          dispatch(fetchTopRatedTvShow(currentPage));
          break;
      }
    }
  }, [dispatch, location.pathname, page, searchParams]);

  const getData = () => {
    const sortBy = searchParams.get("sort_by") || undefined;
    const startDate = searchParams.get("start_date") || undefined;
    const endDate = searchParams.get("end_date") || undefined;
    const genreIds = searchParams.get("genre_id")
      ? searchParams
          .get("genre_id")!
          .split(",")
          .map((id) => parseInt(id))
      : [];

    const hasFilters = sortBy || startDate || endDate || genreIds.length;

    if (hasFilters) {
      switch (true) {
        case location.pathname.includes("/movies/popular"):
        case location.pathname.includes("/movies/top-rated"):
        case location.pathname.includes("/movies/upcoming"):
          return filteredMovies;
        case location.pathname.includes("/tv/popular"):
        case location.pathname.includes("/tv/top-rated"):
          return filteredTv;
      }
    } else {
      switch (true) {
        case location.pathname.includes("/movies/popular/"):
          return popularMovies;
        case location.pathname.includes("/movies/top-rated/"):
          return topRatedMovies;
        case location.pathname.includes("/movies/upcoming"):
          return upcomingMovies;
        case location.pathname.includes("/tv/popular/"):
          return popularTvShows;
        case location.pathname.includes("/tv/top-rated/"):
          return topRatedTvShows;
        default:
          return { movies: [], totalPages: 0 };
      }
    }
  };

  const getCategory = () => {
    if (location.pathname.includes("/movies/popular")) return "Popular Movies";
    if (location.pathname.includes("/movies/top-rated"))
      return "Top Rated Movies";
    if (location.pathname.includes("/movies/upcoming"))
      return "Upcoming Movies";
    if (location.pathname.includes("/tv/popular")) return "Popular TV Shows";
    if (location.pathname.includes("/tv/top-rated"))
      return "Top Rated TV Shows";
    return "Media";
  };

  const handlePageChange = (newPage: number) => {
    const currentPathname = location.pathname;
    const currentSearchParams = new URLSearchParams(location.search);
    const newUrl = `${currentPathname
      .split("/")
      .slice(0, -1)
      .join("/")}/${newPage}?${currentSearchParams.toString()}`;
    navigate(newUrl);
  };

  const category = getCategory();
  const mediaList = getData();

  return (
    <div className="container mx-auto py-6 md:px-6 px-2 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
      <h1 className="text-3xl text-start">{category}</h1>
      <div className="mx-auto flex flex-wrap gap-6 justify-center">
        {mediaList?.movies && mediaList?.movies.length > 0 ? (
          mediaList.movies.map((item: any) => (
            <Card key={item.id} media={item} />
          ))
        ) : (
          <p>No media available</p>
        )}
      </div>
      <Pagination
        currentPage={Number(page)}
        totalPages={Number(mediaList?.totalPages)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MediaList;
