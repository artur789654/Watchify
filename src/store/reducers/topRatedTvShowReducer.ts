import {
  FETCH_TOP_RATED_TV_SHOW_FAILURE,
  FETCH_TOP_RATED_TV_SHOW_REQUEST,
  FETCH_TOP_RATED_TV_SHOW_SUCCESS,
  TopRatedTvShowActionTypes,
} from "../actions/actionTypes";

interface TopRatedTvShowState {
  loading: boolean;
  movies: any[] | null;
  error: string | null;
}

const initialState: TopRatedTvShowState = {
  loading: false,
  movies: null,
  error: null,
};

const topRatedTvShowReducer = (
  state = initialState,
  actions: TopRatedTvShowActionTypes
): TopRatedTvShowState => {
  switch (actions.type) {
    case FETCH_TOP_RATED_TV_SHOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOP_RATED_TV_SHOW_SUCCESS:
      return {
        ...state,
        movies: actions.payload,
        loading: false,
        error: null,
      };
    case FETCH_TOP_RATED_TV_SHOW_FAILURE:
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

export default topRatedTvShowReducer;