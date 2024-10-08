import { Movie } from "../../types/media";
import {
  FETCH_POPULAR_MOVIES_FAILURE,
  FETCH_POPULAR_MOVIES_REQUEST,
  FETCH_POPULAR_MOVIES_SUCCESS,
  PopularMoviesActionTypes,
} from "../actions/actionTypes";

interface PopularMoviesState {
  loading: boolean;
  movies: Movie[] | null;
  totalPages: number;
  error: string | null;
}

const initialState: PopularMoviesState = {
  loading: false,
  movies: null,
  totalPages:0,
  error: null,
};

const popularMoviesReducer = (
  state = initialState,
  actions: PopularMoviesActionTypes
): PopularMoviesState => {
  switch (actions.type) {
    case FETCH_POPULAR_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        loading: false,
        error: null,
      };
    case FETCH_POPULAR_MOVIES_FAILURE:
      return {
        ...state,
        movies: null,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export default popularMoviesReducer;
