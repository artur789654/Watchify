import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_TOP_RATED_MOVIES_FAILURE,
  FETCH_TOP_RATED_MOVIES_REQUEST,
  FETCH_TOP_RATED_MOVIES_SUCCESS,
  TopRatedMoviesActionsTypes,
} from "./actionTypes";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/storageUtils";
import axios from "axios";
import {
  API_TIMEOUT,
  TOP_RATED_MOVIES_ENDPOINT,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";

const CACHE_KEY = "topRatedMovies";
const CACHE_TIME_KEY = "topRatedMoviesTimestap";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

export const fetchTopRatedMovies =
  (
    page: number = 1
  ): ThunkAction<void, RootState, unknown, TopRatedMoviesActionsTypes> =>
  async (dispatch, getState) => {
    const cachedMovies = getFromLocalStorage(CACHE_KEY);
    const cahedTime = getFromLocalStorage(CACHE_TIME_KEY);
    if (cachedMovies && cahedTime) {
      const timeDiff = Date.now() - parseInt(cahedTime, 10);
      if (timeDiff < CACHE_DURATION) {
        dispatch({
          type: FETCH_TOP_RATED_MOVIES_SUCCESS,
          payload: JSON.parse(cachedMovies),
        });
        return;
      }
    }
    dispatch({ type: FETCH_TOP_RATED_MOVIES_REQUEST });
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}${TOP_RATED_MOVIES_ENDPOINT}`,
        {
          params: { api_key: TMDB_API_KEY, page },
          timeout: API_TIMEOUT,
        }
      );

      const movies = response.data.results;
      setToLocalStorage(CACHE_KEY, JSON.stringify(movies));
      setToLocalStorage(CACHE_TIME_KEY, Date.now().toString());

      dispatch({
        type: FETCH_TOP_RATED_MOVIES_SUCCESS,
        payload: movies,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TOP_RATED_MOVIES_FAILURE,
        payload: error.message,
      });
    }
  };
