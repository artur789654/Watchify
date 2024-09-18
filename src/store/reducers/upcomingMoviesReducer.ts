import { Movie } from "../../types/media";
import {
  FETCH_UPCOMING_MOVIES_FAILURE,
  FETCH_UPCOMING_MOVIES_REQUEST,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  UpcomingMoviesActionsTypes,
} from "../actions/actionTypes";

interface UpcomingMoviesState {
  loading: boolean;
  movies: Movie[] | null;
  totalPages: number;
  error: string | null;
}

const initialState: UpcomingMoviesState = {
  loading: false,
  movies: null,
  totalPages: 0,
  error: null,
};

const upcomingMoviesReducer = (
  state = initialState,
  actions: UpcomingMoviesActionsTypes
): UpcomingMoviesState => {
  switch (actions.type) {
    case FETCH_UPCOMING_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        loading: false,
        error: null,
      };
    case FETCH_UPCOMING_MOVIES_FAILURE:
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

export default upcomingMoviesReducer;
