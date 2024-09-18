import { TVShow } from "../../types/media";
import {
  FETCH_POPULAR_TV_SHOW_FAILURE,
  FETCH_POPULAR_TV_SHOW_REQUEST,
  FETCH_POPULAR_TV_SHOW_SUCCESS,
  PopularTvShowActionTypes,
} from "../actions/actionTypes";

interface PopularTvShowState {
  loading: boolean;
  movies: TVShow[] | null;
  totalPages: number;
  error: string | null;
}

const initialState: PopularTvShowState = {
  loading: false,
  movies: null,
  totalPages: 0,
  error: null,
};

const popularTvShowReducer = (
  state = initialState,
  actions: PopularTvShowActionTypes
): PopularTvShowState => {
  switch (actions.type) {
    case FETCH_POPULAR_TV_SHOW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POPULAR_TV_SHOW_SUCCESS:
      return {
        ...state,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        loading: false,
        error: null,
      };
    case FETCH_POPULAR_TV_SHOW_FAILURE:
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

export default popularTvShowReducer;
