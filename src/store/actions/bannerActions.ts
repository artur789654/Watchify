import axios from "axios";
import {
  TMDB_BASE_URL,
  POPULAR_MOVIES_ENDPOINT,
  API_TIMEOUT,
  TMDB_API_KEY,
} from "../../helpers/apiConstants";
import {
  FETCH_BANNER_MOVIE_REQUEST,
  FETCH_BANNER_MOVIE_SUCCESS,
  FETCH_BANNER_MOVIE_FAILURE,
  bannerActionsTypes,
} from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/storageUtils";

const CACHE_KEY = "bannerMovie";
const CACHE_TIME_KEY = "bannerMovieTimestap";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const fetchBannerMovie =
  (): ThunkAction<void, RootState, unknown, bannerActionsTypes> =>
  async (dispatch) => {
    const cahedMovie = getFromLocalStorage(CACHE_KEY);
    const cahedTime = getFromLocalStorage(CACHE_TIME_KEY);

    if (cahedMovie && cahedTime) {
      const timeDiff = Date.now() - parseInt(cahedTime, 10);
      if (timeDiff < CACHE_DURATION) {
        dispatch({
          type: FETCH_BANNER_MOVIE_SUCCESS,
          payload: JSON.parse(cahedMovie),
        });
        return;
      }
    }

    dispatch({ type: FETCH_BANNER_MOVIE_REQUEST });
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}${POPULAR_MOVIES_ENDPOINT}`,
        {
          params: { api_key: TMDB_API_KEY },
          timeout: API_TIMEOUT,
        }
      );
      const movie = response.data.results[0];
      setToLocalStorage(CACHE_KEY, JSON.stringify(movie));
      setToLocalStorage(CACHE_TIME_KEY, Date.now().toString());
      dispatch({ type: FETCH_BANNER_MOVIE_SUCCESS, payload: movie });
    } catch (error: any) {
      dispatch({ type: FETCH_BANNER_MOVIE_FAILURE, payload: error.message });
    }
  };
