import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../store/actions/movieActions";
import { fetchTv } from "../../store/actions/tvActions";
import { AppDispatch } from "../../store";

const Filter: React.FC = () => {
  const [mediaType, setMediaType] = useState<"movies" | "tv">("movies");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [genreId, setGenreId] = useState<number | undefined>(undefined);

  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = () => {
    const newParams = new URLSearchParams();
    newParams.set("sort_by", sortBy);
    if (startDate) newParams.set("start_date", startDate);
    if (endDate) newParams.set("end_date", endDate);
    if (genreId) newParams.set("genre_id", genreId.toString());
    searchParams.set("media_type", mediaType);
    setSearchParams(newParams);

    if (mediaType === "movies") {
      dispatch(fetchMovies(1, sortBy, startDate, endDate, genreId));
    } else {
      dispatch(fetchTv(1, sortBy, startDate, endDate, genreId));
    }
    
  };

  const handleResetFilters = () => {
    setSortBy("popularity.desc");
    setStartDate(undefined);
    setEndDate(undefined);
    setGenreId(undefined);
    handleFilterChange();
  };

  return (
    <div>
      <h2>Filter Media</h2>
      <label>
        Media Type:
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as "movies" | "tv")}
        >
          <option value="movies">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      </label>
      <label>
        Sort By:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        Genre:
        <input
          type="number"
          value={genreId || ""}
          onChange={(e) => setGenreId(Number(e.target.value))}
        />
      </label>
      <button onClick={handleFilterChange}>Apply Filters</button>
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
};

export default Filter;
