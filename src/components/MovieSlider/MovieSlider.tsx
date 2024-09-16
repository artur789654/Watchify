import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPopularMovies } from "../../store/actions/popularMoviesActions";
// import { AppDispatch, RootState } from "../../store/index";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderBtn from "./SliderBtn";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { Movie, TVShow } from "../../types/media";

interface MovieListProps {
  title: string;
  movies: Array<Movie | TVShow>;
  link: string;
}

const MovieSlider: React.FC<MovieListProps> = ({ title, movies, link }) => {
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
    <div className="container mx-auto py-6 px-4 bg-light-secondary dark:bg-dark-secondary rounded-md my-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{title}</h2>
          <SliderBtn swiperRef={swiperRef} />
        </div>
        <div>
          <Link
            to={link}
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
          1400: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          640:{
            slidesPerView: 3,
          },
          400: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        className="relative">
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id} className="p-3 sm:!block !flex justify-center items-center">
            <Card media={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
