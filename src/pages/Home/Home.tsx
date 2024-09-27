import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import Faqs from "../Faqs/Faqs";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchPopularMovies } from "../../store/actions/popularMoviesActions";
import { fetchTopRatedMovies } from "../../store/actions/topRatedMoviesActions";
import { fetchUpcomigMovies } from "../../store/actions/upcomingMoviesActions";
import { fetchPopularTvShow } from "../../store/actions/popularTvShowActions";
import { fetchTopRatedTvShow } from "../../store/actions/topRatedTvShowActions";
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const popularMovies = useSelector(
    (state: RootState) => state.popularMovies.movies
  );
  const topRatedMovies = useSelector(
    (state: RootState) => state.topRatedMovies.movies
  );

  const upcomingMovies = useSelector(
    (state: RootState) => state.upcomingMovies.movies
  );
  const popularTvShow = useSelector(
    (state: RootState) => state.popularTvShow.movies
  );
  const topRatedTvShow = useSelector(
    (state: RootState) => state.topRatedTvShow.movies
  );
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomigMovies());
    dispatch(fetchPopularTvShow());
    dispatch(fetchTopRatedTvShow());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div className="container mx-auto p-6">
        <MovieSlider
          title="Popular Movies"
          movies={popularMovies || []}
          link="/movies/popular/1"
        />
        <MovieSlider
          title="Top Rated Movies"
          movies={topRatedMovies || []}
          link="/movies/top-rated/1"
        />
        <MovieSlider
          title="Upcoming Movies"
          movies={upcomingMovies || []}
          link="/movies/upcoming/1"
        />
        <MovieSlider
          title="Popular TV Show"
          movies={popularTvShow || []}
          link="/tv/popular/1"
        />
        <MovieSlider
          title="Top Rated TV Show"
          movies={topRatedTvShow || []}
          link="/tv/top-rated/1"
        />
        <Faqs />
      </div>
    </>
  );
};

export default Home;
