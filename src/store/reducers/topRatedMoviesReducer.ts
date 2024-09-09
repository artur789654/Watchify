import {
  FETCH_TOP_RATED_MOVIES_REQUEST,
  FETCH_TOP_RATED_MOVIES_SUCCESS,
  FETCH_TOP_RATED_MOVIES_FAILURE,
  TopRatedMoviesActionsTypes,
} from "../actions/actionTypes";

interface TopRatedMoviesState {
  loading: boolean;
  movies: any[] | null;
  error: string | null;
}

const initialState: TopRatedMoviesState = {
  loading: false,
  movies: null,
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
        movies: actions.payload,
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