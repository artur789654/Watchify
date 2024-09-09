import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPopularMovies } from "../../store/actions/popularMoviesActions";
// import { AppDispatch, RootState } from "../../store/index";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderBtn from "./SliderBtn";
import { Link } from "react-router-dom";

interface MovieListProps {
  title: string;
  movies: any[];
}

const MovieSlider: React.FC<MovieListProps> = ({ title, movies }) => {
  const swiperRef = useRef<any>(null);

  const [SwiperComponent, setSwiperComponent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { Swiper, SwiperSlide } = await import("swiper/react");
      const { Navigation, Pagination, A11y } = await import("swiper/modules");
      setSwiperComponent({ Swiper, SwiperSlide, Navigation, Pagination, A11y });
    })();
  }, []);

  if (!SwiperComponent) return <p>Loading Swiper...</p>;

  const { Swiper, SwiperSlide, Navigation, Pagination, A11y } = SwiperComponent;

  return (
    <div className="container mx-auto p-6 bg-light-secondary dark:bg-dark-secondary rounded-md my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{title}</h2>
          <SliderBtn swiperRef={swiperRef} />
        </div>
        <div>
          <Link
            to="/"
            className="block font-semibold text-light-link-main  hover:text-light-link-hover active:text-light-link-active dark:text-dark-link-main dark:hover:text-dark-link-hover dark:active:text-dark-link-active hover:underline transform-translate duration-300 hover:scale-105 ">
            View All...
          </Link>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={10}
        onSwiper={(swiper: object) => (swiperRef.current = swiper)}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          640: {
            slidesPerView: 3,
          },
          420: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        className="relative">
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id} className="p-3">
            <Link
              to={`/movie/${movie.id}`}
              className="relative group bg-light-primary dark:bg-dark-primary rounded-md h-max grid 2xl:grid-rows-[5fr_1fr] xl:grid-rows-[4fr_1fr] grid-rows-[3fr_1fr] items-center transition-transform duration-300 hover:scale-105 pb-2 shadow-md">
              <div className="rounded-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-auto rounded-t-md"
                />
              </div>
              <h3 className="px-2 text-center text-sm font-semibold mt-2 group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary transition-colors duration-300">
                {movie.title || movie.name}
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Rating: {movie.vote_average.toFixed(2)}/10
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
