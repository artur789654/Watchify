import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_TOP_RATED_MOVIES_FAILURE,
  FETCH_TOP_RATED_MOVIES_REQUEST,
  FETCH_TOP_RATED_MOVIES_SUCCESS,
  TopRatedMoviesActionsTypes,
} from "./actionTypes";
import {
  setToLocalStorage,
} from "../../helpers/storageUtils";
import axios from "axios";
import {
  API_TIMEOUT,
  TOP_RATED_MOVIES_ENDPOINT,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";
import { Movie } from "../../types/media";
import { getCachedData } from "../../helpers/getCachedData";

const CACHE_KEY = "topRatedMovies";
const CACHE_TIME_KEY = "topRatedMoviesTimestap";

export const fetchTopRatedMovies =
  (
    page: number = 1
  ): ThunkAction<void, RootState, unknown, TopRatedMoviesActionsTypes> =>
    async (dispatch) => {
      const cachedData = getCachedData<Movie>(CACHE_KEY, CACHE_TIME_KEY);
  
      if (cachedData) {
        dispatch({
          type: FETCH_TOP_RATED_MOVIES_SUCCESS,
          payload: cachedData,
        });
        return;
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
