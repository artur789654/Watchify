import { useDispatch } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../store/actions/popularMoviesActions";
import { fetchTopRatedMovies } from "../../store/actions/topRatedMoviesActions";
import { fetchUpcomigMovies } from "../../store/actions/upcomingMoviesActions";
import { fetchPopularTvShow } from "../../store/actions/popularTvShowActions";
import { fetchTopRatedTvShow } from "../../store/actions/topRatedTvShowActions";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

interface MediaState {
  movies: any[];
}

const MediaList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page } = useParams<{ page: string }>();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByParam = searchParams.get("sort_by") || "popularity.desc";
  const [sortBy, setSortBy] = useState(sortByParam);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setSearchParams({ sort_by: e.target.value });
  };

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

  useEffect(() => {
    const currentPage = page ? parseInt(page, 10) : 1;
    console.log(currentPage);
    switch (true) {
      case location.pathname.includes("/movies/popular"):
        dispatch(fetchPopularMovies(currentPage, sortBy));
        break;
      case location.pathname.includes("/movies/top-rated"):
        dispatch(fetchTopRatedMovies(currentPage, sortBy));
        break;
      case location.pathname.includes("/movies/upcoming"):
        dispatch(fetchUpcomigMovies(currentPage));
        break;
      case location.pathname.includes("/tv/popular"):
        dispatch(fetchPopularTvShow(currentPage, sortBy));
        break;
      case location.pathname.includes("/tv/top-rated"):
        dispatch(fetchTopRatedTvShow(currentPage, sortBy));
        break;
    }
  }, [dispatch, location.pathname, page, sortBy]);
  const getData = () => {
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
        return { movies: [] };
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

  const category = getCategory();
  const mediaList = getData();
  console.log(mediaList);
  return (
    <>
      <div className="container mx-auto p-6 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
        <h1 className="text-3xl text-start">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.movies && mediaList.movies.length > 0 ? (
            mediaList.movies.map((item: any) => (
              <Card key={item.id} media={item} />
            ))
          ) : (
            <p>No media available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaList;
