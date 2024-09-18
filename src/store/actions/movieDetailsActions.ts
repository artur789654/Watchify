import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_MOVIE_DETAILS_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  MovieDetailsActionTypes,
} from "./actionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../helpers/apiConstants";

export const fetchMovieDetails =
  (
    mediaId: number
  ): ThunkAction<void, RootState, unknown, MovieDetailsActionTypes> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${mediaId}`, {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: "credits,videos,reviews,recommendations",
        },
      });
      const movieDetails = response.data;
      dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: movieDetails,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MOVIE_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
