import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
  FETCH_GENRES_TV_REQUEST,
  FETCH_GENRES_TV_SUCCESS,
  FETCH_GENRES_TV_FAILURE,
  GenreTvActionTypes,
} from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { GENRE_TV_LIST, TMDB_API_KEY, TMDB_BASE_URL } from '../../helpers/apiConstants';

export const fetchTvGenres = (): ThunkAction<void, RootState, unknown, GenreTvActionTypes> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_GENRES_TV_REQUEST });

    try {
      const response = await axios.get(`${TMDB_BASE_URL}${GENRE_TV_LIST}`, {
        params: {
          api_key: TMDB_API_KEY,
        },
      });

      dispatch({
        type: FETCH_GENRES_TV_SUCCESS,
        payload: response.data.genres,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_GENRES_TV_FAILURE,
        payload: error.message || 'Failed to fetch genres',
      });
    }
  };
};
