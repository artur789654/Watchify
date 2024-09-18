import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchMovieGenres } from "../../store/actions/genresMoviesActions";
import { fetchTvGenres } from "../../store/actions/genresTvActions";
import { Genre } from "../../types/media";

const Filter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const mediaType: "movies" | "tv" = location.pathname.includes("movies")
    ? "movies"
    : "tv";
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [minUserRating, setMinUserRating] = useState<number | undefined>(
    undefined
  );
  const [minVotes, setMinVotes] = useState<number | undefined>(undefined);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [, setSearchParams] = useSearchParams();

  const {
    genres: movieGenres,
    loading: movieGenresLoading,
    error: movieGenresError,
  } = useSelector((state: RootState) => state.genresMovies);
  const {
    genres: tvGenres,
    loading: tvGenresLoading,
    error: tvGenresError,
  } = useSelector((state: RootState) => state.genresTv);

  useEffect(() => {
    if (mediaType === "movies") {
      dispatch(fetchMovieGenres());
    } else {
      dispatch(fetchTvGenres());
    }
  }, [dispatch, mediaType]);

  const handleFilterChange = () => {
    const newParams = new URLSearchParams();
    newParams.set("sort_by", sortBy);
    if (startDate) newParams.set("start_date", startDate);
    if (endDate) newParams.set("end_date", endDate);
    if (selectedGenres.length > 0)
      newParams.set("genre_id", selectedGenres.join(","));
    if (minUserRating)
      newParams.set("min_user_rating", minUserRating.toString());
    if (minVotes) newParams.set("min_votes", minVotes.toString());
    newParams.set("media_type", mediaType);
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSortBy("popularity.desc");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedGenres([]);
    setMinUserRating(undefined);
    setMinVotes(undefined);
    handleFilterChange();
  };
  const handleGenreChange = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  if (movieGenresLoading || tvGenresLoading) return <p>Loading genres...</p>;
  if (movieGenresError || tvGenresError)
    return <p>Error loading genres: {movieGenresError || tvGenresError}</p>;

  const genres = mediaType === "movies" ? movieGenres : tvGenres;

  return (
    <div className="min-w-[240px] my-4 lg:p-4 p-2 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Filter</h2>
      <div>
        <label className="block text-sm font-medium mb-1">
          Sort By:
          <select
            className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </select>
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="block text-sm font-medium mb-1">Filter by Genres:</h2>
        {genres &&
          genres.map((genre: Genre) => (
            <label
              key={genre.id}
              className={`text-light-text-main dark:text-dark-text-main block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-gray-600 w-full cursor-pointer transition-colors duration-300  ${
                selectedGenres.includes(genre.id)
                  ? "bg-dark-text-secondary text-light-text-main dark:bg-dark-text-secondary"
                  : "bg-light-primary border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              }`}>
              <input
                type="checkbox"
                className="hidden"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreChange(genre.id)}
              />
              {genre.name}
            </label>
          ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Start Date:
          <input
            type="date"
            value={startDate || ""}
            className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          End Date:
          <input
            type="date"
            value={endDate || ""}
            className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium mb-1">
          Min User Rating: {minUserRating}
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={minUserRating || 0}
            onChange={(e) => setMinUserRating(Number(e.target.value))}
            className="w-full h-1 cursor-pointer"
          />
        </label>
        <div className="absolute w-full grid grid-cols-11 -bottom-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 text-start">
            0
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-2">
            1
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-1">
            2
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-1">
            3
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-1">
            4
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center ">
            5
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            6
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center translate-x-1">
            7
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center translate-x-1">
            8
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center translate-x-1">
            9
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-end">
            10
          </span>
        </div>
      </div>
      <div className="relative mt-6">
        <label className="block text-sm font-medium mb-1">
          Min Votes: {minVotes}
          <input
            type="range"
            min="0"
            max="500"
            step="50"
            value={minVotes || 0}
            onChange={(e) => setMinVotes(Number(e.target.value))}
            className="w-full h-1 cursor-pointer"
          />
        </label>
        <div className="absolute w-full grid grid-cols-6 -bottom-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 text-start">
            0
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-3">
            100
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center -translate-x-1">
            200
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center translate-x-1">
            300
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center translate-x-3">
            400
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-end">
            500
          </span>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleFilterChange}
          className="w-full transition-bg duration-300 bg-light-button-main hover:bg-light-button-hover px-4 py-2 rounded-md text-dark-text-main mt-6">
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full transition-bg duration-300 bg-dark-button-main hover:bg-dark-button-hover  px-4 py-2 rounded-md text-dark-text-main mt-6">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
