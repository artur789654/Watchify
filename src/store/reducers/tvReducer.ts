import { TVShow } from "../../types/media";
import {
  FETCH_TV_FAILURE,
  FETCH_TV_REQUEST,
  FETCH_TV_SUCCESS,
  TvActionTypes,
} from "../actions/actionTypes";

interface TvState {
  loading: boolean;
  movies: TVShow[];
  totalPages: number;
  error: string | null;
}

const initialState: TvState = {
  loading: false,
  movies: [],
  totalPages: 0,
  error: null,
};

const tvReducer = (
  state = initialState,
  actions: TvActionTypes
): TvState => {
  switch (actions.type) {
    case FETCH_TV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TV_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: actions.payload.media,
        totalPages: actions.payload.totalPages,
        error: null,
      };
    case FETCH_TV_FAILURE:
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

export default tvReducer;