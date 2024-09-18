import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_TOP_RATED_TV_SHOW_FAILURE,
  FETCH_TOP_RATED_TV_SHOW_REQUEST,
  FETCH_TOP_RATED_TV_SHOW_SUCCESS,
  TopRatedTvShowActionTypes,
} from "./actionTypes";
import { setToLocalStorage } from "../../helpers/storageUtils";
import axios from "axios";
import {
  API_TIMEOUT,
  TOP_RATED_TV_ENDPOINT,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";
import { getCachedData } from "../../helpers/getCachedData";
import { TVShow } from "../../types/media";

const CACHE_KEY = "topRatedTvShow";
const CACHE_TIME_KEY = "topRatedTvShowTimestap";

export const fetchTopRatedTvShow =
  (
    page: number = 1,
    sortBy: string = "vote_average.desc",
    genreId?: number
  ): ThunkAction<void, RootState, unknown, TopRatedTvShowActionTypes> =>
  async (dispatch) => {
    if (page === 1 && sortBy === "vote_average.desc") {
      const cachedData = getCachedData<TVShow>(CACHE_KEY, CACHE_TIME_KEY);

      if (cachedData) {
        dispatch({
          type: FETCH_TOP_RATED_TV_SHOW_SUCCESS,
          payload: {
            media: cachedData.movies,
            totalPages: cachedData.totalPages,
          },
        });
        return;
      }
    }

    dispatch({ type: FETCH_TOP_RATED_TV_SHOW_REQUEST });
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}${TOP_RATED_TV_ENDPOINT}`,
        {
          params: {
            api_key: TMDB_API_KEY,
            page,
            sort_by: sortBy,
            with_genres: genreId || undefined,
          },
          timeout: API_TIMEOUT,
        }
      );

      const movies = response.data.results;
      const totalPages = response.data.total_pages;

      if (page === 1) {
        const cachedData = { movies, totalPages };
        setToLocalStorage(CACHE_KEY, JSON.stringify(cachedData));
        setToLocalStorage(CACHE_TIME_KEY, Date.now().toString());
      }

      dispatch({
        type: FETCH_TOP_RATED_TV_SHOW_SUCCESS,
        payload: {
          media: movies,
          totalPages,
        },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TOP_RATED_TV_SHOW_FAILURE,
        payload: error.message,
      });
    }
  };
