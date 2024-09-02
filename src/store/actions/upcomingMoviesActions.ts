import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_UPCOMING_MOVIES_FAILURE,
  FETCH_UPCOMING_MOVIES_REQUEST,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  UpcomingMoviesActionsTypes,
} from "./actionTypes";
import {
  setToLocalStorage,
} from "../../helpers/storageUtils";
import axios from "axios";
import {
  API_TIMEOUT,
  UPCOMING_MOVIES_ENDPOINT,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";
import { getCachedData } from "../../helpers/getCachedData";
import { Movie } from "../../types/media";

const CACHE_KEY = "upcomigMovies";
const CACHE_TIME_KEY = "upcomingMoviesTimestap";

export const fetchUpcomigMovies =
  (
    page: number = 1
  ): ThunkAction<void, RootState, unknown, UpcomingMoviesActionsTypes> =>
    async (dispatch) => {
      const cachedData = getCachedData<Movie>(CACHE_KEY, CACHE_TIME_KEY);
  
      if (cachedData) {
        dispatch({
          type: FETCH_UPCOMING_MOVIES_SUCCESS,
          payload: cachedData,
        });
        return;
      }
    dispatch({ type: FETCH_UPCOMING_MOVIES_REQUEST });
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}${UPCOMING_MOVIES_ENDPOINT}`,
        {
          params: { api_key: TMDB_API_KEY, page },
          timeout: API_TIMEOUT,
        }
      );

      const movies = response.data.results;
      setToLocalStorage(CACHE_KEY, JSON.stringify(movies));
      setToLocalStorage(CACHE_TIME_KEY, Date.now().toString());

      dispatch({
        type: FETCH_UPCOMING_MOVIES_SUCCESS,
        payload: movies,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_UPCOMING_MOVIES_FAILURE,
        payload: error.message,
      });
    }
  };
