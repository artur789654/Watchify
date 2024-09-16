import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
  FETCH_GENRES_MOVIES_REQUEST,
  FETCH_GENRES_MOVIES_SUCCESS,
  FETCH_GENRES_MOVIES_FAILURE,
  GenreMoviesActionTypes,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { GENRE_MOVIE_LIST, TMDB_API_KEY, TMDB_BASE_URL } from '../../helpers/apiConstants';

export const fetchMovieGenres = (): ThunkAction<void, RootState, unknown, GenreMoviesActionTypes> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_GENRES_MOVIES_REQUEST });

    try {
      const response = await axios.get(`${TMDB_BASE_URL}${GENRE_MOVIE_LIST}`, {
        params: {
          api_key: TMDB_API_KEY,
        },
      });

      dispatch({
        type: FETCH_GENRES_MOVIES_SUCCESS,
        payload: response.data.genres,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_GENRES_MOVIES_FAILURE,
        payload: error.message || 'Failed to fetch genres',
      });
    }
  };
};
