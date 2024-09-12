import { Movie } from "../../types/media";
import {
  FETCH_MOVIE_FAILURE,
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  MovieActionTypes,
} from "../actions/actionTypes";

interface MovieState {
  loading: boolean;
  movies: Movie[];
  totalPages: number;
  error: string | null;
}

const initialState: MovieState = {
  loading: false,
  movies: [],
  totalPages: 0,
  error: null,
};

const movieReducer = (
  state = initialState,
  actions: MovieActionTypes
): MovieState => {
  switch (actions.type) {
    case FETCH_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        error: null,
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        loading: false,
        movies: [],
        totalPages: 0,
        error: actions.payload.error,
      };
    default:
      return state;
  }
};

export default movieReducer;