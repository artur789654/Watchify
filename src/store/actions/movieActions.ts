import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_MOVIE_FAILURE,
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  MovieActionTypes,
} from "./actionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  API_TIMEOUT,
  MOVIES_ENDPOINT,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";

export const fetchMovies =
  (
    page: number = 1,
    sortBy: string = "popularity.desc",
    startDate?: string,
    endDate?: string,
    genreId?: number[],
    minUserRating?: number,
    minVotes?: number
  ): ThunkAction<void, RootState, unknown, MovieActionTypes> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_MOVIE_REQUEST });
    try {
      const response = await axios.get(`${TMDB_BASE_URL}${MOVIES_ENDPOINT}`, {
        params: {
          api_key: TMDB_API_KEY,
          page,
          sort_by: sortBy,
          "primary_release_date.gte": startDate || undefined,
          "primary_release_date.lte": endDate || undefined,
          with_genres: genreId || undefined,
          "vote_average.gte": minUserRating || undefined,
          "vote_count.gte": minVotes || undefined,
          include_adult: false,
          include_video: false,
        },
        timeout: API_TIMEOUT,
      });

      const movies = response.data.results;
      const totalPages = response.data.total_pages;
      dispatch({
        type: FETCH_MOVIE_SUCCESS,
        payload: { media: movies, totalPages },
      });
    } catch (error: any) {
      dispatch({ type: FETCH_MOVIE_FAILURE, payload: error.message });
    }
  };
