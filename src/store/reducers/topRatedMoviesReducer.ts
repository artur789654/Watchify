import { Movie } from "../../types/media";
import {
  FETCH_TOP_RATED_MOVIES_REQUEST,
  FETCH_TOP_RATED_MOVIES_SUCCESS,
  FETCH_TOP_RATED_MOVIES_FAILURE,
  TopRatedMoviesActionsTypes,
} from "../actions/actionTypes";

interface TopRatedMoviesState {
  loading: boolean;
  movies: Movie[] | null;
  totalPages: number;
  error: string | null;
}

const initialState: TopRatedMoviesState = {
  loading: false,
  movies: null,
  totalPages: 0,
  error: null,
};

const topRatedMoviesReducer = (
  state = initialState,
  actions: TopRatedMoviesActionsTypes
): TopRatedMoviesState => {
  switch (actions.type) {
    case FETCH_TOP_RATED_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOP_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        loading: false,
        error: null,
      };
    case FETCH_TOP_RATED_MOVIES_FAILURE:
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

export default topRatedMoviesReducer;
