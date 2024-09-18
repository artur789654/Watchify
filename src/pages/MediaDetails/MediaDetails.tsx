import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from "react";
import { fetchMovieDetails } from "../../store/actions/movieDetailsActions";
import { fetchTvDetails } from "../../store/actions/tvDetailsActions";
import { Movie, TVShow } from "../../types/media";
import { FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderBtn from "../../components/MovieSlider/SliderBtn";
import Card from "../../components/Card/Card";
import {
  addToWatchList,
  removeFromWatchList,
} from "../../store/actions/watchListActions";
import { addReview, fetchReviews } from "../../store/actions/reviewActions";

const MediaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const mediaType: "movie" | "tv" = location.pathname.includes("movie")
    ? "movie"
    : "tv";

  const {
    movie: movieDetails,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state: RootState) => state.movieDetails);
  const {
    movie: tvDetails,
    loading: tvLoading,
    error: tvError,
  } = useSelector((state: RootState) => state.tvDetails);

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useSelector((state: RootState) => state.review);
  const [newReview, setNewReview] = useState("");
  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newReview && user) {
      dispatch(
        addReview(String(movie?.id), user.uid, user.displayName, newReview)
      );
      setNewReview("");
    }
  };

  const movie = mediaType === "movie" ? movieDetails : tvDetails;
  const loading = mediaType === "movie" ? movieLoading : tvLoading;
  const error = mediaType === "movie" ? movieError : tvError;

  const user = useSelector((state: RootState) => state.auth.user);
  const watchList = useSelector((state: RootState) => state.watchList.items);
  const isInWatchList = watchList.some((item: any) => item.id === movie?.id);

  const handleToggleWatchList = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      if (isInWatchList) {
        dispatch(removeFromWatchList(user.uid, movie));
      } else {
        dispatch(addToWatchList(user.uid, movie));
      }
    }
  };
  useEffect(() => {
    if (mediaType === "movie") {
      if (id) {
        dispatch(fetchMovieDetails(parseInt(id)));
        dispatch(fetchReviews(id));
      }
    } else {
      if (id) {
        dispatch(fetchTvDetails(parseInt(id)));
        dispatch(fetchReviews(id));
      }
    }
  }, [dispatch, mediaType, id]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No media details available.</div>;
  }
  return (
    <div className="container mx-auto my-4 rounded-md shadow-md overflow-hidden p-6 bg-light-secondary dark:bg-dark-secondary space-y-6">
      {movie && (
        <div>
          <div
            className="flex lg:flex-row flex-col p-4 gap-4 relative bg-cover bg-center min-h-max text-dark-text-main rounded-md overflow-hidden shadow-md"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}>
            <div
              className={`absolute z-20 top-7 right-6 text-xl cursor-pointer ${
                isInWatchList
                  ? "text-yellow-500"
                  : "text-slate-500 hover:text-yellow-500"
              }`}
              onClick={handleToggleWatchList}
              aria-label={
                isInWatchList ? "Remove from watchlist" : "Add to watchlist"
              }>
              <FaStar />
            </div>
            <div className="absolute top-4 right-14 text-lg z-20 bg-light-text-secondary opacity-70 h-fit p-2 rounded">
              {movie.vote_average.toFixed(2)}/10
            </div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-10 w-full flex lg:justify-start justify-center items-start">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={"title" in movie ? movie.title : movie.name}
                className="h-full w-max object-cover"
              />
            </div>
            <div className="z-10 space-y-6 text-lg">
              <h1 className="text-4xl font-bold text-start mt-4">
                {"title" in movie ? movie.title : movie.name}
              </h1>
              {mediaType === "movie" ? (
                <>
                  <div className="flex gap-4">
                    <h3 className="font-semibold">Release Date:</h3>
                    <p>{(movie as Movie).release_date}</p>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-semibold">Runtime:</h3>
                    <p>{(movie as Movie).runtime} minutes</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <h3 className="font-semibold">First Air Date:</h3>
                    <p>{(movie as TVShow).first_air_date}</p>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-semibold">Episode Runtime:</h3>
                    <p>
                      {(movie as TVShow).episode_run_time.join(", ")} minutes
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-semibold">Seasons:</h3>
                    <ul>
                      {(movie as TVShow).seasons.map((season: any) => (
                        <li key={season.season_number}>
                          Season {season.season_number} - {season.episode_count}{" "}
                          episodes
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <div className="flex gap-4">
                <h3 className="font-semibold">Genres:</h3>
                <ul className="flex gap-2">
                  {movie.genres.map((genre: any) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-start font-medium">{movie.overview}</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <h3 className="text-2xl font-semibold text-start">Cast:</h3>
            <SliderBtn swiperRef={swiperRef} />
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
              640: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            className="relative">
            {movie.credits.cast.map((cast: any) => (
              <SwiperSlide
                key={cast.id}
                className="p-3 sm:!block !flex justify-center items-center">
                <div className="shadow-md p-4 grid md:grid-rows-[250px_70px] grid-rows-[300px_70px] bg-light-primary dark:bg-dark-primary rounded-md transition-transform duration-300 hover:scale-105">
                  <div className="overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      loading="lazy"
                      className="w-full h-auto rounded-md mb-2"
                    />
                  </div>
                  <div>
                    <h4 className="text-light-text-main dark:text-dark-text-main font-bold text-lg">
                      {cast.name}
                    </h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      as {cast.character}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-start">Trailer:</h3>
            <div className="flex items-center justify-center">
              {movie.videos.results.length > 0 ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                  loading="lazy"
                />
              ) : (
                <p>No available trailer</p>
              )}
            </div>
          </div>
          {movie.recommendations.results.length > 0 ? (
            <div className="container mx-auto py-6 px-4 bg-light-secondary dark:bg-dark-secondary rounded-md my-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <h3 className="text-2xl font-semibold text-start">
                    Recommendations:
                  </h3>
                  <SliderBtn swiperRef={swiperRef} />
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
                  640: {
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
                {movie.recommendations.results.map((movie) => (
                  <SwiperSlide
                    key={movie.id}
                    className="p-3 sm:!block !flex justify-center items-center">
                    <Card media={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <p>No recommendations available</p>
          )}
          <div className="space-y-6">
            <h3 className="text-2xl text-start font-semibold">Reviews:</h3>
            {movie.reviews.results.length > 0 ? (
              movie.reviews.results.map((review: any) => (
                <div
                  key={review.id}
                  className="p-4 text-start bg-light-primary dark:bg-dark-primary rounded-md shadow-md">
                  <strong>{review.author}:</strong>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
          <div className="mt-8">
            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : reviewsError ? (
              <p>Error loading reviews: {reviewsError}</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review: any) => (
                  <div
                    key={`${review.id}${review.uid}`}
                    className="p-4 text-start bg-light-primary dark:bg-dark-primary rounded-md shadow-md">
                    <strong>{review.displayName}:</strong>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {user && (
            <form onSubmit={handleReviewSubmit} className="mt-8 space-y-4">
              <h3 className="text-2xl font-semibold">Add a Review:</h3>
              <textarea
                value={newReview}
                onChange={handleReviewChange}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
                placeholder="Write your review here..."
                rows={4}
              />
              <button
                type="submit"
                className="p-2 rounded text-dark-text-main bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover">
                Submit Review
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
export default MediaDetails;
