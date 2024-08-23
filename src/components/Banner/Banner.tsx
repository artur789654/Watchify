import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { fetchBannerMovie } from "../../store/actions/bannerActions";
import { AppDispatch } from "../../store/index";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, movie, error } = useSelector(
    (state: RootState) => state.banner
  );

  useEffect(() => {
    dispatch(fetchBannerMovie());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative w-full h-[400px] lg:h-[600px] bg-light-primary dark:bg-dark-primary text-light-primary">
      {movie ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col md:justify-end md:items-end items-center justify-end  bg-black bg-opacity-50 p-4">
            <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
            <Link
              to={`/movie/${movie.id}`}
              aria-label="Banner link"
              className="bg-light-button-main text-light-primary py-2 px-4 rounded-lg hover:bg-light-button-hover ">
              Learn More
            </Link>
          </div>
        </>
      ) : (
        <div>No movie data available</div>
      )}
    </section>
  );
};

export default Banner;
